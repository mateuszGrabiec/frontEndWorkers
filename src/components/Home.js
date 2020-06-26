import React, { Component } from 'react'
import { Button  } from 'reactstrap';

class Home extends Component {

    render(){
        return(
            <div className="home">
                <Button href="/login">Log in by website</Button>
                <Button href="/login-google">Log in by google</Button>
                <Button href="/register">Register</Button>
                <Button href="/manager">Manage</Button>
                <Button href="/places">Places</Button>
            </div>
        )
    }
}
export default Home