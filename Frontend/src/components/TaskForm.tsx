import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/Authcontext';
import axios from '../services/api';

interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  editingTask: Task | null;
  cancelEditing: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onEditTask, editingTask, cancelEditing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setDueDate('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { title, description, status, dueDate };

    try {
      const token = localStorage.getItem('token');

      if (editingTask) {
        // Edit existing task
        const response = await axios.put(`/tasks/${editingTask.id}`, taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onEditTask(response.data);
      } else {
        // Add new task
        const response = await axios.post('/tasks', taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onAddTask(response.data);
      }

      resetForm();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-bold mb-2">{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;

