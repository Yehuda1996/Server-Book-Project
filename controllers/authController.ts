import {Request, Response, NextFunction} from 'express';
import { registerUser, authenticateUser } from '../services/userService.js';
import {User, userNamePassword} from '../models/types.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from 'console';

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }

        const user: User = await registerUser(userName, password);
        res.status(201).json({ id: user.id, userName: user.userName });  // Return 201 for successful creation
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, password }: userNamePassword = req.body;
        if (!userName || !password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }

        const user = await authenticateUser(userName, password);
        if (user) {
            const token = jwt.sign({ id: user.id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        next(error);
    }
};