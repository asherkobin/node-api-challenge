import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [allProjects, setAllProjects] = useState();
  const getProjects = async () => {
    const res = await axios.get("http://localhost:5050/api/projects");
    setAllProjects(res.data);
  }

  useEffect(() => {
    getProjects();
  }, []);
  
  return (
    <div>
      <div>Projects:</div>
      <ul>{allProjects ? allProjects.map(i => <li key={i.id}>{i.name}</li>) : <li>Loading...</li>}</ul>
    </div>
  );
}

export default App;
