require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin/email-templates', require('./routes/emailTemplateRoutes'));
app.use('/api/admin/settings', require('./routes/systemSettingRoutes'));
app.use('/api/admin/monitoring', require('./routes/monitoringRoutes'));
app.use('/api/admin/backups', require('./routes/backupRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/activity-logs', require('./routes/activityLogRoutes'));
app.use('/api/seeker', require('./routes/seekerRoutes'));
app.use('/api/recruiter', require('./routes/recruiterRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Basic health check route
app.get('/', (req, res) => {
    res.send('AI Job Portal API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
