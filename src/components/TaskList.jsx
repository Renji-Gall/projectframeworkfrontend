import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import styles from './TaskList.module.css';

const TaskList = () => {
  
    const [tasks, setTasks ] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/tasks/');
        setTasks(res.data);
      } catch(err){
        console.log('Error fetching tasks: ', err);
      }
    }
  

  const toggleComplete = async (task) => {

    try{
      const res = await axios.patch(`http://localhost:8000/api/tasks/${task.id}/`, {
        completed: !task.completed
      });

      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
    }
    catch(err){
      console.log('Error updating task: ', err);
    }
  } 
  

  const addTask = async () =>{

    if(!newTask) return;

    try {
      const res = await axios.post('http://localhost:8000/api/tasks/', {
        title: newTask,
        completed: false
      });

      setTasks([...tasks, res.data]);
      setNewTask('');
    }
    catch(err){
      console.log('Error creating task: ', err);
    }
  };

  const deleteTask = async (id) => {
    try{
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`);
      setTasks(tasks.filter((t) => t.id !== id));
    }
    catch(err){
      console.log('Error deleting task: ', err);

    }
  }

  return (
    <div className={styles.TaskList}>
        <h1>Task List</h1>

        <div>
          <input 
            name="newTask"
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder="My Task..."  
          />
          
          <button 
            className={styles.addButton}
            onClick={addTask}>
              Add Task
          </button>
        </div>

        <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span
                  style={{ 
                  textDecoration: task.completed ? 'line-through' :'none'
                }}

                  onClick={() => toggleComplete(task)}
                
                >
                
                
                  {task.title}
                </span>
                <button 
                  className={styles.deleteButton}
                  onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>

    </div>
  )
}

export default TaskList