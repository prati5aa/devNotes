import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
     const user =jwt.verify(token,process.env.JWT_SECRET);
     console.log("Decoded JWT Token:", user);
     req.user=user;
     req.userId = user.userId;
    next();
}

export default authMiddleware;