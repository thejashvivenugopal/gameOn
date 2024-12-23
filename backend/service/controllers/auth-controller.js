// middleware/authMiddleware.js
import { verifyToken } from '../services/auth-service.js';

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Add user info to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};
