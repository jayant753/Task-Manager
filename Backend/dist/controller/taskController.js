var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
// Create a new task
export const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, dueDate, userId } = req.body;
    try {
        const user = yield User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const task = yield Task.create({ title, description, status, dueDate, userId });
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
});
// Get all tasks
export const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.findAll();
        res.json(tasks);
    }
    catch (error) {
        next(error);
    }
});
// Get a specific task
export const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json(task);
    }
    catch (error) {
        next(error);
    }
});
// Update a task
export const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const task = yield Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;
        yield task.save();
        res.json(task);
    }
    catch (error) {
        next(error);
    }
});
// Delete a task
export const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        yield task.destroy();
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=taskController.js.map