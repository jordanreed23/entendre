import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
// import './Lyrics.css';
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

class Lyrics extends Component {

  render() {

    return (
      <div className="Lyrics">

      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Lyrics = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Lyrics);

export default Lyrics;
