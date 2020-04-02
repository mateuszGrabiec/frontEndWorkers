import React from 'react';
import './App.css';

import {Button,Form, FormGroup, Label, Input}
from 'reactstrap';

function App() {
  return (
    <Form className="login-form">
      <h1><span className="font-weight-bold">Worker-website</span>.com</h1>
      <h2 className="text-center">Welcome</h2>
      <FormGroup>
        <Label>
          Email
        </Label>
        <Input type="email" placeholder="Email"></Input>
      </FormGroup>
      <FormGroup>
        <Label>
          Password
        </Label>
        <Input type="password" placeholder="Password"></Input>
      </FormGroup>
      <Button className="btn btn-success">Log in</Button>
      <div className="text-center">
        <a href="/sign-up">Sign up</a>
        <span className="p-2">|</span>
        <a href="/remebr-passsword">Forgot Password</a>
      </div>
    </Form>
  );
}

export default App;