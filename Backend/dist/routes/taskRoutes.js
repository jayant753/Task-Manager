import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controller/taskController.js';
const router = Router();
// Create a new task
router.post('/', createTask);
// Get all tasks
router.get('/', getTasks);
// Get a specific task
router.get('/:id', getTask);
// Update a task
router.put('/:id', updateTask);
// Delete a task
router.delete('/:id', deleteTask);
export default router;
//# sourceMappingURL=taskRoutes.js.map