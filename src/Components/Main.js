import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Main.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Artists from './Artists';
import Albums from './Albums';
import Detail from './Detail';
import Lyrics from './Lyrics';
import Songs from './Songs';
// import './App.css';
// import Login from './Login'
import {Link} from 'react-router-dom';

const query = gql`{
  allUsers{
    id
    username
    pic
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

class Main extends Component {
  render() {
    let {data} = this.props;
    if(data.loading) {
      return <div className="main-load">
        <img src="https://thumbs.gfycat.com/ImpressiveRigidHind-max-1mb.gif"/>
        <h3>Loading</h3>
      </div>
    }
    return (<div className="Main">
      {/* {data.allUsers.map(x => (
        <h1 key={x.id}>{x.username}</h1>
      ))} */}
      <div className="Main-left">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/artists' component={Artists}/>
          <Route exact path='/albums' component={Albums}/>
          <Route exact path='/songs' component={Songs}/>
          <Route exact path='/lyrics' component={Lyrics}/>
        </Switch>
      </div>
      <div className="Main-right">
        <Switch>
          <Route exact path='/' component={About}/>
          <Route exact path='/artists' component={About}/>
          <Route exact path='/albums' component={Detail}/>
          <Route exact path='/songs' component={Detail}/>
          <Route exact path='/lyrics' component={Detail}/>
        </Switch>
      </div>
    </div>);
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {
      // username: ownProps.state.user.username,
      // token: ownProps.state.user.token,
      // pic: 'http://profile.actionsprout.com/default.jpeg',
    }
  })
}

Main = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Main);

export default Main;
