import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom'
import Main from './Components/Main'

class App extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <div className="App-area-logo">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Entendre</h1>
        </div>
        <div className="App-area-search-mini">
          <input type="text"></input>
        </div>
        <div className="App-area-signin">
          <Link to='/login'>Sign In</Link>
          {/* <Login /> */}
        </div>
      </header>
      <Main/>
      <footer className="App-footer"></footer>
    </div>);
  }
}

export default App;
