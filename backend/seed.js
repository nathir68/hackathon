const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Candidate = require('./models/Candidate');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Interview = require('./models/Interview');
const Message = require('./models/Message');
const Notification = require('./models/Notification');
const ActivityLog = require('./models/ActivityLog');

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/hire_db";
mongoose.connect(uri);

const seedData = async () => {
    try {
        // Clear all collections
        await User.deleteMany({});
        await Candidate.deleteMany({});
        await Job.deleteMany({});
        await Application.deleteMany({});
        await Interview.deleteMany({});
        await Message.deleteMany({});
        await Notification.deleteMany({});
        await ActivityLog.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const pw = await bcrypt.hash('password123', salt);

        // ── Users ──
        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@hire.com', password: pw, role: 'admin', type: 'Admin', status: 'Active' },
            { name: 'John Doe', email: 'john@email.com', password: pw, role: 'seeker', type: 'Job Seeker', status: 'Active' },
            { name: 'Sarah Chen', email: 'sarah@techcorp.com', password: pw, role: 'recruiter', type: 'Recruiter', status: 'Active' },
            { name: 'Alice Johnson', email: 'alice@email.com', password: pw, role: 'seeker', type: 'Job Seeker', status: 'Active' },
            { name: 'Bob Williams', email: 'bob@email.com', password: pw, role: 'seeker', type: 'Job Seeker', status: 'Active' },
            { name: 'Emily Davis', email: 'emily@designhub.com', password: pw, role: 'recruiter', type: 'Recruiter', status: 'Active' },
            { name: 'Michael Brooks', email: 'michael@dataflow.com', password: pw, role: 'recruiter', type: 'Recruiter', status: 'Active' },
            { name: 'Carol Smith', email: 'carol@email.com', password: pw, role: 'seeker', type: 'Job Seeker', reason: 'Spam reports', status: 'Suspended', since: 'Mar 1, 2026' },
            { name: 'Frank Miller', email: 'frank@email.com', password: pw, role: 'seeker', type: 'Job Seeker', reason: 'Fake profile', status: 'Blocked', since: 'Feb 25, 2026' },
            { name: 'ScamCorp', email: 'info@scamcorp.com', password: pw, role: 'recruiter', type: 'Recruiter', reason: 'Fraudulent activity', status: 'Blocked', since: 'Feb 10, 2026' },
        ]);

        // ── Candidates (for AI Screening) ──
        await Candidate.insertMany([
            { name: 'Alice Johnson', ats: 95, skills: 92, exp: 90, overall: 93, flag: 'None' },
            { name: 'Bob Williams', ats: 88, skills: 85, exp: 82, overall: 85, flag: 'None' },
            { name: 'Carol Smith', ats: 78, skills: 92, exp: 75, overall: 82, flag: 'None' },
            { name: 'David Brown', ats: 70, skills: 65, exp: 60, overall: 65, flag: 'Low Experience' },
            { name: 'Emma Davis', ats: 45, skills: 40, exp: 30, overall: 38, flag: 'Duplicate Resume' },
        ]);

        // ── Jobs ──
        const jobs = await Job.insertMany([
            { title: 'Senior React Developer', company: 'TechCorp', location: 'San Francisco', salary: '$120k-$160k', type: 'Full-time', posted: '2d ago', skills: ['React', 'TypeScript', 'Node.js'], description: 'Build scalable web applications using React and TypeScript.', applicants: 24, logo: 'TC', status: 'Active' },
            { title: 'Product Designer', company: 'DesignHub', location: 'Remote', salary: '$90k-$130k', type: 'Remote', posted: '1d ago', skills: ['Figma', 'UI/UX'], description: 'Design beautiful user interfaces for our SaaS products.', applicants: 18, logo: 'DH', status: 'Active' },
            { title: 'Data Scientist', company: 'DataFlow', location: 'New York', salary: '$110k-$150k', type: 'Full-time', posted: '3d ago', skills: ['Python', 'ML', 'SQL'], description: 'Analyze data and build ML models to drive business decisions.', applicants: 31, logo: 'DF', status: 'Active' },
            { title: 'DevOps Engineer', company: 'CloudBase', location: 'Austin', salary: '$100k-$140k', type: 'Full-time', posted: '5d ago', skills: ['AWS', 'Docker', 'Kubernetes'], description: 'Manage cloud infrastructure and CI/CD pipelines.', applicants: 12, logo: 'CB', status: 'Active' },
            { title: 'Full Stack Developer', company: 'WebScale', location: 'Seattle', salary: '$105k-$145k', type: 'Full-time', posted: '4d ago', skills: ['React', 'Node.js', 'MongoDB'], description: 'Build end-to-end web applications.', applicants: 20, logo: 'WS', status: 'Active' },
            { title: 'Mobile Developer', company: 'AppNova', location: 'Remote', salary: '$95k-$135k', type: 'Remote', posted: '2d ago', skills: ['React Native', 'Swift'], description: 'Build cross-platform mobile applications.', applicants: 15, logo: 'AN', status: 'Active' },
            { title: 'Marketing Manager', company: 'GrowthCo', location: 'Remote', salary: '$80k-$110k', type: 'Remote', posted: '1d ago', skills: ['SEO', 'Analytics', 'Content'], description: 'Lead marketing campaigns and growth strategies.', applicants: 9, logo: 'GC', status: 'Active' },
            { title: 'Backend Engineer', company: 'PayFlow', location: 'Chicago', salary: '$115k-$155k', type: 'Full-time', posted: '3d ago', skills: ['Java', 'Spring Boot', 'PostgreSQL'], description: 'Build reliable payment processing systems.', applicants: 27, logo: 'PF', status: 'Active' },
        ]);

        // ── Applications ──
        await Application.insertMany([
            { jobTitle: 'Senior React Developer', company: 'TechCorp', status: 'Interview', appliedDate: 'Feb 28, 2026', applicantName: 'John Doe', applicantEmail: 'john@email.com', score: 92 },
            { jobTitle: 'Product Designer', company: 'DesignHub', status: 'Applied', appliedDate: 'Mar 1, 2026', applicantName: 'John Doe', applicantEmail: 'john@email.com', score: 85 },
            { jobTitle: 'Data Scientist', company: 'DataFlow', status: 'Reviewed', appliedDate: 'Feb 25, 2026', applicantName: 'Alice Johnson', applicantEmail: 'alice@email.com', score: 78 },
            { jobTitle: 'DevOps Engineer', company: 'CloudBase', status: 'Rejected', appliedDate: 'Feb 20, 2026', applicantName: 'Bob Williams', applicantEmail: 'bob@email.com', score: 45 },
            { jobTitle: 'Full Stack Developer', company: 'WebScale', status: 'Offered', appliedDate: 'Feb 22, 2026', applicantName: 'Alice Johnson', applicantEmail: 'alice@email.com', score: 95 },
            { jobTitle: 'Senior React Developer', company: 'TechCorp', status: 'Applied', appliedDate: 'Mar 2, 2026', applicantName: 'Carol Smith', applicantEmail: 'carol@email.com', score: 72 },
            { jobTitle: 'Mobile Developer', company: 'AppNova', status: 'Interview', appliedDate: 'Mar 1, 2026', applicantName: 'Bob Williams', applicantEmail: 'bob@email.com', score: 88 },
        ]);

        // ── Interviews ──
        await Interview.insertMany([
            { candidateName: 'John Doe', position: 'Senior React Developer', date: 'Mar 10, 2026', time: '10:00 AM', type: 'Video', status: 'Scheduled', interviewer: 'Sarah Chen' },
            { candidateName: 'Alice Johnson', position: 'Full Stack Developer', date: 'Mar 12, 2026', time: '2:00 PM', type: 'In-Person', status: 'Scheduled', interviewer: 'Michael Brooks' },
            { candidateName: 'Bob Williams', position: 'Mobile Developer', date: 'Mar 8, 2026', time: '11:00 AM', type: 'Phone', status: 'Completed', interviewer: 'Emily Davis', rating: 4 },
            { candidateName: 'Carol Smith', position: 'Data Scientist', date: 'Mar 6, 2026', time: '3:00 PM', type: 'Video', status: 'Completed', interviewer: 'Sarah Chen', rating: 3 },
        ]);

        // ── Messages ──
        await Message.insertMany([
            { from: 'Sarah Chen', to: 'John Doe', text: 'Hi John! We reviewed your application and would like to schedule an interview.', time: '10:30 AM', role: 'HR', avatar: 'SC' },
            { from: 'John Doe', to: 'Sarah Chen', text: 'Thank you, Sarah! I am available any day this week.', time: '10:45 AM', role: 'candidate', avatar: 'JD' },
            { from: 'Sarah Chen', to: 'John Doe', text: 'Great! How about March 10th at 10 AM? It will be a video call.', time: '11:00 AM', role: 'HR', avatar: 'SC' },
            { from: 'Emily Davis', to: 'Alice Johnson', text: 'Congratulations Alice! We would like to extend an offer for the Full Stack Developer position.', time: '2:00 PM', role: 'HR', avatar: 'ED' },
            { from: 'Alice Johnson', to: 'Emily Davis', text: 'That is wonderful news! I would love to discuss the details.', time: '2:15 PM', role: 'candidate', avatar: 'AJ' },
        ]);

        // ── Notifications ──
        await Notification.insertMany([
            { title: 'New Application Received', message: 'John Doe applied for Senior React Developer', type: 'info', time: '2 hours ago' },
            { title: 'Interview Scheduled', message: 'Interview with Alice Johnson on Mar 12', type: 'success', time: '5 hours ago' },
            { title: 'Job Post Expiring', message: 'DevOps Engineer posting expires in 3 days', type: 'warning', time: '1 day ago' },
            { title: 'Account Suspended', message: 'User Carol Smith suspended for spam', type: 'error', time: '2 days ago' },
            { title: 'New Job Posted', message: 'Backend Engineer position posted by PayFlow', type: 'info', time: '3 hours ago' },
        ]);

        // ── Activity Logs ──
        await ActivityLog.insertMany([
            { user: 'Admin User', action: 'Suspended user', details: 'Suspended Carol Smith for spam reports', time: '2 hours ago', ip: '192.168.1.1', type: 'update' },
            { user: 'Sarah Chen', action: 'Posted new job', details: 'Senior React Developer at TechCorp', time: '1 day ago', ip: '192.168.1.5', type: 'create' },
            { user: 'John Doe', action: 'Applied for job', details: 'Applied to Senior React Developer', time: '3 hours ago', ip: '192.168.1.10', type: 'create' },
            { user: 'Admin User', action: 'Blocked user', details: 'Blocked ScamCorp for fraudulent activity', time: '5 days ago', ip: '192.168.1.1', type: 'update' },
            { user: 'Emily Davis', action: 'Scheduled interview', details: 'Interview with Bob Williams', time: '1 day ago', ip: '192.168.1.8', type: 'create' },
            { user: 'Admin User', action: 'System backup', details: 'Full database backup completed', time: '12 hours ago', ip: '192.168.1.1', type: 'login' },
        ]);

        console.log("✅ Database seeded successfully!");
        console.log("");
        console.log("Test accounts (password: password123):");
        console.log("  Admin:     admin@hire.com");
        console.log("  Seeker:    john@email.com");
        console.log("  Recruiter: sarah@techcorp.com");
        console.log("");
        console.log("Seeded: " + users.length + " users, " + jobs.length + " jobs, 7 applications, 4 interviews, 5 messages, 5 notifications, 6 activity logs");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
