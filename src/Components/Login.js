import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import {FacebookLogin} from 'react-facebook-login';
import {PostUser} from '../services/PostUser';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    }
    this.signup = this.signup.bind(this)
  }

  signup(res,type){
    let postData;
    if(type === 'google' && res.w3.U3){
      postData = {name: res.w3.ig, provider: type, email: res.w3.U3, provider_id: res.El, token: res.Zi.access_token, provider_pic: res.w3.Paa}
    }
    else if(type ==='facebook' && res.email){
      postData = {name: res.name, provider: type, email: res.email, provider_id: res.id, token: res.accessToken, provider_pic: res.provider_pic}
    }

    this.setState({redirectToReferrer: true});

    // PostUser('sigup', postData).then(res => {
    //   let resJson = res;
    //   if(res.userData){
    //     sessionStorage.setItem('userData', JSON.stringify(resJson));
    //     this.setState({redirectToReferrer: true});
    //   }
    // })
  }

  render() {

    if(this.state.redirectToReferrer){
        return (<Redirect to={"/"}/>)
    }

    const responseFacebook = (response) => {
      console.log(response);
      this.signup(response, 'facebook');
    }

    const responseGoogle = (response) => {
      console.log(response);
      this.signup(response, 'google');
    }

    return (<div className="Login">
      <h1>This is the login page (left side)</h1>
      <GoogleLogin clientId="18874699212-f8vj123kpm4phnqinar7bg2tnp0r52bf.apps.googleusercontent.com" buttonText="Sign up with Google" onSuccess={responseGoogle} onFailure={responseGoogle}/>
      {/* <FacebookLogin appId="1508156479283064" autoLoad={true} fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}/> */}
    </div>);
  }
}

export default Login;
