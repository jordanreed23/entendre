import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
import {PostUser} from '../services/PostUser';
// import {Redirect} from 'react-router-dom';
import './Login.css';

const testing = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.signup = this.signup.bind(this)
  }

  async signup(res, type) {
    let postData;
    if (type === 'google' && res.w3.U3) {
      postData = {
        username: res.w3.ig,
        token: res.w3.Eea,
        pic: res.w3.Paa
      }
      let baseURL = 'https://entendre.herokuapp.com/';
      const response = await fetch(baseURL + 'signup', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const json = await response.json()
      this.props.updateUserState(json[0]);
    }
  }

  getName() {
    var str = this.props.state.user.username.split(' ');
    return str[0];
  }

  getDropdown() {
    return this.props.state.dropdown
      ? "profile-dropdown"
      : "profile-dropdown-hidden"
  }

  responseTest = () => {
    if (testing) {
      this.props.testLogin();
    }
  }

  render() {

    const responseGoogle = (response) => {
      if (!testing) {
        this.signup(response, 'google');
      }
    }

    if (!this.props.state.loggedIn) {
      return (<div className="login">
        <i className="fa fa-bars menu-icon" aria-hidden="true" onClick={this.props.activateDropdown}></i>
        <div className={this.getDropdown()}
          // FOR TESTING ONLY
          onClick={this.responseTest}>
          <GoogleLogin clientId="18874699212-f8vj123kpm4phnqinar7bg2tnp0r52bf.apps.googleusercontent.com" buttonText="Sign in with Google" onSuccess={responseGoogle} onFailure={responseGoogle}
          />
        </div>
      </div>);
    } else {
      return (<div>
        <div className="login">
          <h2 className="login-user">Hi, {this.getName()}</h2>
          <img className="profile-pic" src={this.props.state.user.pic} alt="profile" onClick={this.props.activateDropdown}/>
        </div>
        <div className={this.getDropdown()}>
          <div className="profile-button">
            {/* link to profile route */}
            <a className="view-profile">View Profile</a>
            <a onClick={this.props.logout}>Sign Out</a>
          </div>
          {/* <GoogleLogout buttonText="Logout" onLogoutSuccess={this.props.logout}></GoogleLogout> */}
        </div>
      </div>);
    }
  }
}

export default Login;
