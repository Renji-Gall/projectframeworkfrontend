import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

const TaskList = () => {
  
    const [tasks, setTasks ] = useState([]);
  
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
  
  return (
    <div>
        <h1>Task List</h1>

        <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span>
                  {task.title}
                </span>
              </li>
            ))}
        </ul>

    </div>
  )
}

export default TaskList