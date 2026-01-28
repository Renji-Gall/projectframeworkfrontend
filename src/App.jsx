import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import './App.css'
import axios from 'axios';

function App() {

  return (
    <div className='App'>
        <TaskList />
    </div>
  )
}

export default App
