
import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import ShowDashboard from './components/ShowDashboard';
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([])
  // console.log("Tasks is:", tasks)

  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response) => {
      // console.log(response.data)
      setTasks(response.data)
    })
  }, [tasks])

  // Fetch Tasks
  // const fetchTasks = async () => {
  //   const res = await fetch('http://localhost:3001/api/get')
  //   const data = await res.json()
  //   // console.log("Fetched task is:", data)

  //   return data
  // }

  // Add Task
  const addTask = (task) => {
    // console.log("Task is: ", task)
    //---- Post Data using Axios start----//
    axios.post("http://localhost:3001/api/insert", task)
      // console.log("task is end")
      // .then(response => response.json())
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error is:', error);
      });

    // setTasks([...tasks, data])

  }

  return (
    <div className="App">
      <Dashboard onAdd={addTask} />
      <ShowDashboard tasks={tasks} />
    </div>
  );
}

export default App;
