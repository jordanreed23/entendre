import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
// import './Home.css';
// import { Switch, Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

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

class Home extends Component {

  render() {

    return (
      <div className="Home">

      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Home = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Home);

export default Home;
