import React, { Component } from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';

class LoginForm extends Component {
    state={
        image:localStorage.getItem('image')
    }

    responseGoogle = response => {
        localStorage.setItem('image',response.profileObj.imageUrl)
        localStorage.setItem('isLogged', true)
        this.setState({image:localStorage.getItem('image')})       
    }

    logout=()=>{
        localStorage.setItem('image','')
        localStorage.setItem('isLogged', false)
        this.setState({image:''})
    }

    checkIsLogged=()=>{
        alert(this.state.login)
    }
    render(){
        return (
            <div>
                <img src={this.state.image}/>
                <h1>Log in with Google</h1>
                <GoogleLogin
                    clientId="397144125802-ou47qad7gi153o9qk0jqm5opnr5ml5pg.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                />
                <GoogleLogout
                    clientId="397144125802-ou47qad7gi153o9qk0jqm5opnr5ml5pg.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
                <br/>
                <a href="/login" style={{margin:"20px"}}>Log in as user</a>
                    |
                <a href="/manager" style={{margin:"20px"}}>Manage objects</a>
            </div>
        )
    }
}
export default LoginForm