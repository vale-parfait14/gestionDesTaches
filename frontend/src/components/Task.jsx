// frontend/src/components/Task.js
import React, { useState } from 'react';
import { GrDocumentUpdate } from "react-icons/gr";
import "./task.css";

const Task = ({ task, fetchTasks }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
/*
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };*/

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  };
  

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, completed: task.completed }),
    });
    setEditing(false);
    fetchTasks();
  };

  return (
    <li className='li-task'>
      {editing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='ipt-tasks'
        />
        
      ) : (
        <span className="span-tasks">{task.title}</span>
      )}
      <button className="btn1-tasks" onClick={handleDelete}>Delete</button>
      {editing ? (
        <button className="btn2-tasks" onClick={handleUpdate}>Update</button>
      ) : (
        <button className="btn3-tasks" onClick={() => setEditing(true)}>to modify</button>
      )}
    </li>
  );
};

export default Task;
