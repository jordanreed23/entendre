import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import {Link} from 'react-router-dom'
import Main from './Components/Main'
import Login from './Components/Login'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        username: '',
        token: '',
        pic: '',
        entendres: 0
      },
      dropdown: false
    }
  }

  async componentDidMount() {

    // let proxy = "https://galvanize-cors-proxy.herokuapp.com/";
    // let baseURL = 'http://localhost:8082/';
    let baseURL = 'https://entendre.herokuapp.com/';

    const response = await fetch(baseURL)
    const json = await response.json()
    console.log(json);
  }

  updateUserState = (data) => {
    this.setState({
      loggedIn: true,
      user: {
        username: data.username,
        token: data.token,
        pic: data.pic,
        entendres: data.entendres
      },
      dropdown: false
    });
  }

  activateDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  hideDropdown = () => {
    this.setState({dropdown: false})
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      user: {
        username: '',
        token: '',
        pic: '',
        entendres: 0
      },
      dropdown: false
    })
  }

  async testLogin() {
    let postData = {
      username: 'Jordan Reed',
      token: '12634',
      pic: 'http://profile.actionsprout.com/default.jpeg'
    }

    let baseURL = 'http://localhost:8082/';
    // let baseURL = 'https://entendre.herokuapp.com/';

    const response = await fetch((baseURL + 'signup'), {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const json = await response.json()
    console.log(json);
    this.updateUserState(json[0]);
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <div className="App-area-logo" onClick={this.hideDropdown}>
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">App Name</h1>
        </div>
        <div className="box" onClick={this.hideDropdown}>
          <div className="container-1">
            <span className="icon">
              <i className="fa fa-search"></i>
            </span>
            <input type="search" id="search" placeholder="Search..."/>
          </div>
        </div>
        <div className="App-area-signin">
          {/* <Link to='/login'>Sign In</Link> */}
          <Login state={this.state}
            // loggedIn={this.state.loggedIn} user={this.state.user} dropdown={this.state.dropdown}
            updateUserState={this.updateUserState} activateDropdown={this.activateDropdown} hideDropdown={this.hideDropdown} logout={this.logout} testLogin={this.testLogin}/>
        </div>
      </header>
      <div onClick={this.hideDropdown}>
        <Main/>
      </div>

      <footer className="App-footer" onClick={this.hideDropdown}></footer>
    </div>);
  }
}

export default App;
