import React, {Component} from 'react';
import gql from 'graphql-tag';
import image from '../entendre.png';
import { graphql, compose } from 'react-apollo';
import './About.css';
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

class About extends Component {

  render() {

    return (
      <div className="About">
        <img className="about-logo" src={image}/>
        <p className="about-text">Entendre is a platform which uses an algorithm to calculate the unique word count for artists, albums, and songs. <br/>Start by searching an artist or clicking one of the top ranked wordsmiths.
        </p>
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

About = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(About);

export default About;
