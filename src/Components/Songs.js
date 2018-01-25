import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
// import './Songs.css';
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

class Songs extends Component {

  render() {

    return (
      <div className="Songs">

      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Songs = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Songs);

export default Songs;
