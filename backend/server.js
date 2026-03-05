const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/hire_db";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Basic route
app.get('/', (req, res) => {
    res.send('Backend Server is running');
});

// Routes
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const candidatesRouter = require('./routes/candidates');
const jobsRouter = require('./routes/jobs');
const applicationsRouter = require('./routes/applications');
const interviewsRouter = require('./routes/interviews');
const messagesRouter = require('./routes/messages');
const notificationsRouter = require('./routes/notifications');
const activitylogsRouter = require('./routes/activitylogs');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/candidates', candidatesRouter);
app.use('/jobs', jobsRouter);
app.use('/applications', applicationsRouter);
app.use('/interviews', interviewsRouter);
app.use('/messages', messagesRouter);
app.use('/notifications', notificationsRouter);
app.use('/activitylogs', activitylogsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
