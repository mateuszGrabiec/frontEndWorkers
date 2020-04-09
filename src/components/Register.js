import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input}
    from 'reactstrap';

export default class Register extends Component {

    instance = axios.create({
        method: 'post',
        mode: 'cors',
        headers: {
            common: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        },
    });

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            email: '',
            password: '',
            passwordConfirm:'',
            role:''
        };
    }

    handleForm = e => {
        e.preventDefault()
        const data = {
            username:this.state.username, 
            email: this.state.email,
            password: this.state.password,
            passwordConfirm:this.state.passwordConfirm,
            role: this.state.role
        }
        axios('http://mockbin.com/request?foo=bar&foo=baz',data)
        .then(res => console.log(res))//TODO remove after tests 
        .catch(e => console.log(e)) 
        //this.props.history.push('/profile')
    }

    handleInput = (e) => {
        const key = e.target.id
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
                <Input type="email" id="email" placeholder="Email" onChange={this.handleInput}></Input>
            </FormGroup>
            <FormGroup>  
                <Label>
                    Username
    </Label>
                <Input id="username" placeholder="Username" onChange={this.handleInput}></Input>
            </FormGroup>
            <FormGroup>
                <Label>
                    Password
    </Label>
                <Input id="password" type="password" placeholder="Password" onChange={this.handleInput}></Input>
            </FormGroup>
            <FormGroup>
                <Label>
                    Confirm password
    </Label>
                <Input id="passwordConfirm" type="password" placeholder="Confirm password" onChange={this.handleInput}></Input>
            </FormGroup>
            <FormGroup>
                <Label>
                    Role
    </Label>
                <Input id="role" placeholder="Role" onChange={this.handleInput}></Input>
            </FormGroup>
            <input className="btn btn-success" type="submit" />
            <div className="text-center">
                <a href="/login">Log in</a>
                <span className="p-2">|</span>
                <a href="/remebr-passsword">Forgot Password</a>
            </div>
        </Form>
        )
    }
}
