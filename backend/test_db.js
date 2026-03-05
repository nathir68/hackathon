const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout
}).then(() => {
    console.log("Successfully connected to MongoDB");
    process.exit(0);
}).catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
});
