import React from 'react';
import axios from '../services/api';
import { useAuth } from '../contexts/Authcontext';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId: number) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new task!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.dueDate}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
