import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./Components/navbar.component.js";
import ExercisesList from "./Components/exercise-list.component.js";
import EditExercise from "./Components/edit-exercise.component.js";
import CreateExercise from "./Components/create-exercise.component.js";
import CreateUser from "./Components/create-user.component.js";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path='/' exact component={ExercisesList}/>
      <Route path='/edit/:id' exact component={EditExercise}/>
      <Route path='/create' exact component={CreateExercise}/>
      <Route path='/user' exact component={CreateUser}/>
      </div>
    </Router>
  
  );
}

export default App;
