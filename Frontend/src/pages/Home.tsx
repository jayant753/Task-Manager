import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';
import axios from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleEditTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditingTask = (task: Task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleAddTaskClick = () => {
    if (!user) {
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      {user ? (
        <>
          <TaskForm onAddTask={handleAddTask} onEditTask={handleEditTask} editingTask={editingTask} cancelEditing={cancelEditing} />
          <TaskList tasks={tasks} onEdit={startEditingTask} onDelete={handleDeleteTask} />
        </>
      ) : (
        <p>Please <a href="/login" className="text-blue-500">log in</a> to manage tasks.</p>
      )}
    </div>
  );
};

export default Home;

