import { Router } from 'express';
import { signup, login } from '../controller/userController';

const router = Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router;
