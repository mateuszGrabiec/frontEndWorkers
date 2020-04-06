import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input }
    from 'reactstrap';

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            passsword: '',
        };
    }


    handleForm = e => {
        e.preventDefault()
        const data = { email: this.state.email, passsword: this.state.passsword }
        fetch('http://localhost:8080/api/auth/login', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(res => res.json())
            .then(res => console.log(res))
        this.props.history.push('/profile')
    }

    handleInput = (e) => {
        const key = e.target.type
        const value = e.target.value
        this.setState({ [key]: value })
    }

    render() {
        return (
            <Form className="login-form" onSubmit={this.handleForm}>
                <h1><span className="font-weight-bold">Worker-website</span>.com</h1>
                <h2 className="text-center">Welcome</h2>
                <FormGroup>
                    <Label>
                        Email
        </Label>
                    <Input type="email" placeholder="Email" onChange={this.handleInput}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
        </Label>
                    <Input type="password" placeholder="Password" onChange={this.handleInput}></Input>
                </FormGroup>
                <input className="btn btn-success" type="submit" />
                <div className="text-center">
                    <a href="/sign-up">Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/remebr-passsword">Forgot Password</a>
                </div>
            </Form>
        );
    }
}

export default LoginForm;