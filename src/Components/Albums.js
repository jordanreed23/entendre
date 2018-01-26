import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Albums.css';
// import { Switch, Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
import Selection from './Selection'

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

class Albums extends Component {

  render() {

    return (
      <div className="Albums">
        <div>
          {/* <img src={this.props.} */}
        <h1 className="name-heading">{this.props.state.selectedArtist}</h1>
        </div>
        <h1 className="list-heading">Available Albums</h1>
          {this.props.state.albumList.map((x, i) => {
            return <Link  className="selection-links" to={'/albums'}><Selection music={x} rank={i + 1}/></Link>
          })}
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Albums = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Albums);

export default Albums;
