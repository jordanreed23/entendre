import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import './Main.css';
// import { Switch, Route } from 'react-router-dom'
// import './App.css';
// import Login from './Login'
// import {Link} from 'react-router-dom'

const allUsersQuery = gql`{
  allUsers{
    id
    username
    pic
  }
}
`;

class Main extends Component {
  render() {
    let {data} = this.props;
    if(data.loading) {
      return <div>Loading...</div>
    }
    return (<div className="Main">
      {data.allUsers.map(x => (
        <h1 key={x.id}>{x.username}</h1>
      ))}
      {/* <div className="Main-left">
        <Switch>
          <Route exact="exact" path='/' component={Home}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </div>
      <div className="Main-right">
        <Switch>
          <Route exact="exact" path='/' component={Home}/>
        </Switch>
      </div> */}
    </div>);
  }
}

Main = graphql(allUsersQuery)(Main);
export default Main;
