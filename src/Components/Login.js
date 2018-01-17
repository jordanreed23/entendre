import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
import {PostUser} from '../services/PostUser';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      loggedIn: false,
      user: {
        username: '',
        token: '',
        pic: '',
        entendres: 0
      }
    }
    this.signup = this.signup.bind(this)
  }

  componentDidMount() {
    console.log('mounted');
  }

  signup(res, type) {
    let postData;
    if (type === 'google' && res.w3.U3) {
      postData = {
        username: res.w3.ig,
        token: res.Zi.access_token,
        pic: res.w3.Paa,
        entendres: 0
      }
    }

    console.log(postData);
    this.setState({
      redirectToReferrer: true,
      loggedIn: true,
      user: {
        username: res.w3.ig,
        token: res.Zi.access_token,
        pic: res.w3.Paa,
        entendres: 0
      }
    });

    // PostUser('sigup', postData).then(res => {
    //   let resJson = res;
    //   if(res.userData){
    //     sessionStorage.setItem('userData', JSON.stringify(resJson));
    //     this.setState({redirectToReferrer: true});
    //   }
    // })
  }

  render() {

    // if (this.state.redirectToReferrer) {
    //   return (<Redirect to={"/"}/>)
    // }

    const responseGoogle = (response) => {
      if (!response) {
        return;
      }
      this.signup(response, 'google');
    }

    const logout = (response) => {
      this.setState({redirectToReferrer: false})
    }

    if (!this.state.loggedIn) {
      return (<div className="Login">
        <h1>New 2!</h1>
        <GoogleLogin clientId="18874699212-f8vj123kpm4phnqinar7bg2tnp0r52bf.apps.googleusercontent.com" buttonText="Sign in with Google" onSuccess={responseGoogle} onFailure={responseGoogle}/>
      </div>);
    } else {
      return (<div className="Login">
        <img className="profile-pic" src='' alt="profile picture"/> <GoogleLogout buttonText="Logout" onLogoutSuccess={logout}></GoogleLogout>
      </div>);
    }
  }
}

export default Login;
