const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Make sure token exists
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Not authorized to access this route'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                });
            }

            next();
        } catch (err) {
            return res.status(401).json({
                status: 'error',
                message: 'Not authorized to access this route'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

// Check subscription level
exports.checkSubscription = (...allowedSubscriptions) => {
    return (req, res, next) => {
        if (!allowedSubscriptions.includes(req.user.subscription)) {
            return res.status(403).json({
                status: 'error',
                message: `This feature requires ${allowedSubscriptions.join(' or ')} subscription`
            });
        }
        next();
    };
};

// Check AI credits
exports.checkAICredits = (creditsRequired = 1) => {
    return (req, res, next) => {
        if (req.user.aiCredits < creditsRequired) {
            return res.status(403).json({
                status: 'error',
                message: 'Insufficient AI credits. Please upgrade your plan.'
            });
        }
        next();
    };
};
