const router = require('express').Router();
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const ActivityLog = require('../models/ActivityLog');
const EmailTemplate = require('../models/EmailTemplate');
const SystemSetting = require('../models/SystemSetting');
const Notification = require('../models/Notification');
const { auth, authorize } = require('../middleware/auth');

const adminOnly = [auth, authorize('admin')];

router.get('/dashboard', ...adminOnly, async (req, res) => {
    try {
        const [totalUsers, totalSeekers, totalRecruiters, totalJobs, activeJobs, totalApps] = await Promise.all([
            User.countDocuments(), User.countDocuments({ role: 'seeker' }), User.countDocuments({ role: 'recruiter' }),
            Job.countDocuments(), Job.countDocuments({ status: 'active' }), Application.countDocuments()
        ]);
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt');
        res.json({ stats: { totalUsers, totalSeekers, totalRecruiters, totalJobs, activeJobs, totalApplications: totalApps }, recentUsers });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/users', ...adminOnly, async (req, res) => {
    try {
        const { role, search, blocked, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (role) filter.role = role;
        if (blocked === 'true') filter.isBlocked = true;
        if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
        const users = await User.find(filter).select('-password -otp').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
        const total = await User.countDocuments(filter);
        res.json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/users/:id/block', ...adminOnly, async (req, res) => {
    try {
        const { isBlocked, blockReason } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { isBlocked, blockReason: blockReason || '' }, { new: true }).select('-password');
        await ActivityLog.create({ user: req.user._id, action: isBlocked ? 'block_user' : 'unblock_user', details: `${user.email}`, resource: 'User', resourceId: user._id.toString() });
        res.json(user);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/users/:id', ...adminOnly, async (req, res) => {
    try { await User.findByIdAndDelete(req.params.id); res.json({ message: 'User deleted' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/jobs', ...adminOnly, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const filter = status ? { status } : {};
        const jobs = await Job.find(filter).populate('postedBy', 'name email company').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
        const total = await Job.countDocuments(filter);
        res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/jobs/:id', ...adminOnly, async (req, res) => {
    try { await Job.findByIdAndDelete(req.params.id); res.json({ message: 'Job deleted' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/activity-logs', ...adminOnly, async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const logs = await ActivityLog.find().populate('user', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
        const total = await ActivityLog.countDocuments();
        res.json({ logs, total });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/settings', ...adminOnly, async (req, res) => {
    try { res.json(await SystemSetting.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/settings', ...adminOnly, async (req, res) => {
    try {
        const { key, value, description, category } = req.body;
        const s = await SystemSetting.findOneAndUpdate({ key }, { value, description, category }, { upsert: true, new: true });
        res.json(s);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/email-templates', ...adminOnly, async (req, res) => {
    try { res.json(await EmailTemplate.find().sort({ createdAt: -1 })); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/email-templates', ...adminOnly, async (req, res) => {
    try { res.status(201).json(await EmailTemplate.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/email-templates/:id', ...adminOnly, async (req, res) => {
    try { res.json(await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/email-templates/:id', ...adminOnly, async (req, res) => {
    try { await EmailTemplate.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/reports', ...adminOnly, async (req, res) => {
    try {
        const [usersByRole, jobsByStatus, appsByStatus] = await Promise.all([
            User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
            Job.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
            Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
        ]);
        res.json({ usersByRole, jobsByStatus, appsByStatus });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/monitoring', ...adminOnly, async (req, res) => {
    try {
        const mem = process.memoryUsage();
        res.json({ uptime: Math.round(process.uptime()), memory: { rss: Math.round(mem.rss / 1024 / 1024), heap: Math.round(mem.heapUsed / 1024 / 1024) }, status: 'healthy' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/revenue', ...adminOnly, async (req, res) => {
    try {
        const recs = await User.countDocuments({ role: 'recruiter' });
        res.json({ totalRevenue: recs * 369, activeSubscriptions: recs, plans: { basic: Math.floor(recs * 0.5), pro: Math.floor(recs * 0.3), enterprise: Math.floor(recs * 0.2) } });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/notifications/broadcast', ...adminOnly, async (req, res) => {
    try {
        const { title, message, targetRole } = req.body;
        const users = await User.find(targetRole ? { role: targetRole } : {}).select('_id');
        await Notification.insertMany(users.map(u => ({ user: u._id, title, message, type: 'info' })));
        res.json({ message: `Sent to ${users.length} users` });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
