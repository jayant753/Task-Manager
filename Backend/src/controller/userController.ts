import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// User signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const newUser = await User.create({ username, email, password });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created successfully.', token });
  } catch (error) {
    next(error);
  }
};

// User login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Logged in successfully.', token });
  } catch (error) {
    next(error);
  }
};
