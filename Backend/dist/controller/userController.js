var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// User signup
export const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }
        const newUser = yield User.create({ username, email, password });
        // Generate JWT token
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ message: 'User created successfully.', token });
    }
    catch (error) {
        next(error);
    }
});
// User login
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const isPasswordValid = yield user.checkPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ message: 'Logged in successfully.', token });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=userController.js.map