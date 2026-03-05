const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { auth } = require('../middleware/auth');

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role, phone, skills, experienceLevel, company } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'Email already registered' });

        const user = new User({ name, email, password, role: role || 'seeker', phone });

        if (role === 'seeker') {
            if (skills) user.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
            if (experienceLevel) user.experienceLevel = experienceLevel;
        }
        if (role === 'recruiter' && company) {
            user.company = company;
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

        await user.save();

        await ActivityLog.create({ user: user._id, action: 'signup', details: `New ${role} registration` });

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
            otp // In production, send via email instead
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });
        if (user.isBlocked) return res.status(403).json({ error: 'Account is blocked. Reason: ' + (user.blockReason || 'Contact admin') });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        await ActivityLog.create({ user: user._id, action: 'login', details: 'User logged in' });

        const token = generateToken(user._id);
        res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/verify-email
router.post('/verify-email', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
        if (user.otpExpiry && user.otpExpiry < new Date()) return res.status(400).json({ error: 'OTP expired' });

        user.isVerified = true;
        user.otp = '';
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
        if (user.otpExpiry && user.otpExpiry < new Date()) return res.status(400).json({ error: 'OTP expired' });

        user.otp = '';
        await user.save();

        const token = generateToken(user._id);
        res.json({ token, message: 'OTP verified' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        res.json({ message: 'OTP sent to email', otp }); // In production, send via email
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

        user.password = newPassword;
        user.otp = '';
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -otp -twoFactorSecret');
        user.profileCompletion = user.calcProfileCompletion();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
