import { Request, Response, NextFunction } from 'express';
import Task from '../models/taskModel';
import User from '../models/userModel';

// Create a new task
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, status, dueDate, userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const task = await Task.create({ title, description, status, dueDate, userId });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get a specific task
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
