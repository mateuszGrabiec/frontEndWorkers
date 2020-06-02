import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input}
    from 'reactstrap';

class ResetPassword extends Component {

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
            email: '',
        };
    }


    handleForm = e => {
        e.preventDefault()
        const data = { email: this.state.email, passsword: this.state.passsword }
        axios('http://mockbin.com/request?foo=bar&foo=baz',data)
        .then(res => console.log(res))//TODO remove after tests 
        .catch(e => console.log(e)) 
        //this.props.history.push('/profile')
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
                <input className="btn btn-success" type="submit" />
                <div className="text-center">
                    <a href="/login">Log in</a>
                    <span className="p-2">|</span>
                    <a href="/register">Sign up</a>
                </div>
            </Form>
        );
    }
}
export default ResetPassword