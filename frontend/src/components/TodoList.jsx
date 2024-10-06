// frontend/src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task';
import "./task.css";
import { CiLogout } from "react-icons/ci";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      navigate('/login');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });

    if (response.ok) {
      fetchTasks();
      setNewTask('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div >
      <div className='div-todolist'>
      <CiLogout onClick={handleLogout} className='btn2-todolist' />
        <h2 className='titre01'>My ToDo List</h2>
      </div>
      <form onSubmit={handleAddTask} className='form1'>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className='ipt-todolist'
        />
        <button className='btn-todolist' type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
