const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'No token, access denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ error: 'User not found' });
        if (user.isBlocked) return res.status(403).json({ error: 'Account is blocked' });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is invalid' });
    }
};

// Role-based access
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied for this role' });
        }
        next();
    };
};

module.exports = { auth, authorize };
