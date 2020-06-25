import React, { Component } from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';

class LoginForm extends Component {
    state={
        image:''
    }

    responseGoogle = response => {
        localStorage.setItem('image',response.profileObj.imageUrl)
        localStorage.setItem('isLogged', response.profileObj)
        this.setState({image:localStorage.getItem('image')})       
    }

    logout=()=>{
        localStorage.removeItem('image')
        localStorage.removeItem('isLogged')
        this.setState({image:''})
    }
    render(){
        return (
            <div>
                <img src={localStorage.getItem('image')} alt=''/>
                <h1>Log in with Google</h1>
                <GoogleLogin
                    clientId="784572361533-ongul1hh1kpseg30va1q4sp828gd4bs9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                />
                <GoogleLogout
                    clientId="784572361533-ongul1hh1kpseg30va1q4sp828gd4bs9.apps.googleusercontent.com"
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