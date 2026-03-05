const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/seeker', require('./routes/seeker'));
app.use('/api/recruiter', require('./routes/recruiter'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/notifications', require('./routes/notifications'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

const connectWithRetry = async (retries = 5) => {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`⏳ Attempting MongoDB connection (attempt ${i}/${retries})...`);
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 30000,
                connectTimeoutMS: 30000,
            });
            console.log('✅ MongoDB connected');
            app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
            return;
        } catch (err) {
            console.error(`❌ Attempt ${i} failed: ${err.message}`);
            if (i < retries) {
                console.log(`⏳ Retrying in 5 seconds...`);
                await new Promise(r => setTimeout(r, 5000));
            } else {
                console.error('❌ All connection attempts failed. Check your MongoDB Atlas cluster status.');
                process.exit(1);
            }
        }
    }
};

connectWithRetry();
