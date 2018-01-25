import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';

// import {Redirect} from 'react-router-dom';
import './Login.css';

const testing = true;

const query = gql `
  query logUser($username: String, $token: String!){
  loginUser(username: $username, token: $token){
    username
    id
    token
    pic
    contributions
  }
}
`;

const mutation = gql `
  mutation newUser($username: String!, $token: String!, $pic: String){
    createUser(username: $username, token: $token, pic: $pic) {
      id
      username
      token
      pic
      contributions
    }
  }
  `;

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

      await this.props.updateUserState(postData)
      await this.props.data.refetch({
        variables: {
          username: this.props.state.user.username,
          token: this.props.state.user.token
        }
      }).then(data => {
        console.log("refetch");
      })

      if (this.props.data.loginUser == null) {
        this.props.mutation({
          variables: {
            username: this.props.state.user.username,
            token: this.props.state.user.token,
            pic: this.props.state.user.pic
          }
        }).then(res => {
          console.log("new user created");
        })
      } else {
        console.log("welcome back", this.props.state.user.username);
      }

    }
  }

    async testLoginQl() {
      let postData = {
        username: 'Jordoon Reed',
        token: '126399',
        pic: 'http://profile.actionsprout.com/default.jpeg',
        contributions: 0
      }

      await this.props.updateUserState(postData)
      await this.props.data.refetch({
        variables: {
          username: this.props.state.user.username,
          token: this.props.state.user.token
        }
      }).then(data => {
        console.log("refetch");
      })

      if (this.props.data.loginUser == null) {
        this.props.mutation({
          variables: {
            username: this.props.state.user.username,
            token: this.props.state.user.token,
            pic: this.props.state.user.pic
          }
        }).then(res => {
          console.log("new user created");
        })
      } else {
        console.log("welcome back", this.props.state.user.username);
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
        // this.props.testLogin();
        this.testLoginQl();
      }
    }

    render() {

      if (this.props.loading) {
        return <div>Loading...</div>
      }
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
            <GoogleLogin clientId="18874699212-f8vj123kpm4phnqinar7bg2tnp0r52bf.apps.googleusercontent.com" buttonText="Sign in with Google" onSuccess={responseGoogle} onFailure={responseGoogle}/>
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

  const queryOptions = {
    options: ownProps => ({
      variables: {
        username: ownProps.state.user.username,
        token: ownProps.state.user.token,
        // pic: 'http://profile.actionsprout.com/default.jpeg',
      }
    })
  }

  Login = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Login);

  export default Login;
