import { Router } from 'express';
import { signup, login } from '../controller/userController.js';
const router = Router();
// Signup route
router.post('/signup', signup);
// Login route
router.post('/login', login);
export default router;
//# sourceMappingURL=userRoutes.js.map