import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
// import './None.css';
// import { Switch, Route } from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class None extends Component {

  render() {
    if(!this.props.state.noResults){
      return <Redirect to={`/artists/${this.props.state.selectedArtist}`}/>;
    }
    return (
      <div className="None">
        <h1>No Results Found. Search Again.</h1>
      </div>
    )
  }
}

export default None;
