import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Selection.css';
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

class Selection extends Component {
  checkIfWords(){
    if(this.props.music.vocab !== undefined){
      return `Vocabulary: ${this.props.music.vocab}`
    } else if(this.props.music.unique_words !== undefined){
      return `Total Vocabulary: ${this.props.music.unique_words}`
    }
  }

  checkIfRank(){
    if(this.props.rank !== undefined){
      return <h1 className="selection-rank">{this.props.rank}</h1>
    }
  }

  render() {
    return (
      <div className="Selection">
        {this.checkIfRank()}
        <img className="selection-art" src={this.props.music.art}/>
        <div className="selection-info">
          <h1 className="selection-name">{this.props.music.name}</h1>
          <h2 className="selection-details">{this.checkIfWords()}</h2>
        </div>
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Selection = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Selection);

export default Selection;
