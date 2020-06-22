import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import DataManager from './components/DataManager';
import LoginGoogle from './components/loginGoogle';
import PrivateRouter from './components/PrivateRouter'
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
      <Route path="/login-google" component={LoginGoogle}></Route>
      <Route path="/profile" component={Profile}></Route> 
      <Route path="/register" component={Register}></Route>
      <Route path="/remeber-passsword" component={ResetPassword}></Route>
      <PrivateRouter path="/manager" component={DataManager}></PrivateRouter>
      </Switch>
    </Router>
    
  );
}

export default App;