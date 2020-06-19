import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/login" component={LoginForm}></Route>
      <Route path="/profile" component={Profile}></Route> 
      <Route path="/register" component={Register}></Route>
      <Route path="/remeber-passsword" component={ResetPassword}></Route>
      <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;