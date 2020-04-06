import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Route path="/login" component={LoginForm}></Route>
      <Route path="/profile" component={Profile}></Route>
    </Router>
  );
}

export default App;