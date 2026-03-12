import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/Users.js";


export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded){
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user; // attach user to request object for use in controllers
        next(); 
    }
    catch(error){
        console.error('Error in protectRoute middleware:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};