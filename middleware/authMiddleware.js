// Middleware to verify if the user is signed in
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        console.log(req, "re12");
        
         const token = req.headers.authorization?.split(' ')[1];
        // if (!token) {
        //     return res.status(401).json({ message: 'No token, authorization denied' });
        // }
        // Verify token
        // const token = localStorage.getItem('token');
        
        const decoded = jwt.verify(token, process.env.ZOOM_CLIENT_SECRET);
        console.log(decoded , "decode")
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};


// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const role = user.role;
        if (role !== 1) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized user'
            });
        }
        
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
