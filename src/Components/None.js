import React, {Component} from 'react';
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
