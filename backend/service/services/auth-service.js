// services/authService.js
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;


const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Use an environment variable

// Generate Token
export const generateToken = (payload, expiresIn = '1h') => {
    return sign(payload, secretKey, { expiresIn });
};

// Verify Token
export const verifyToken = (token) => {
    try {
        return verify(token, secretKey);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};


