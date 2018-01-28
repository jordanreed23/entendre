import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Selection.css';
// import { Switch, Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

const query = gql`
query getAlbum($name: String!){
  getAlbum(name: $name){
    id
    name
    art
    vocab
    tags
    albums {
      id
    }
  }
}
`;

const mutation1 = gql `
mutation addAlbum($name: String!, $art: String!){
  addArtist(name: $name, art: $art){
    id
    name
    art
    vocab
    tags
  }
}
`;

class Selection extends Component {
  checkIfWords(){
    if(this.props.music.vocab !== undefined){
      return `${this.props.music.vocab}`
    } else if(this.props.music.unique_words !== undefined){
      return `${this.props.music.unique_words}`
    }
  }

  checkIfRank(){
    if(this.props.rank){
      return <h1 className="selection-rank">{this.props.rank}</h1>
    }
  }

  checkIfArt(){
    if(!this.props.music.art){
      return "https://thumbs.dreamstime.com/t/vintage-microphone-black-background-over-64061389.jpg"
    } else{
      return this.props.music.art;
    }
  }

  // if()

  render() {
    // let {data} = this.props;
    // console.log(this.props );
    // if (data.loading && this.props.album) {
    //
    //   return <div><img src="https://karuchan90.files.wordpress.com/2017/06/audio3.gif?w=240"/></div>
    // }

    return (
      <div className="Selection">
        {this.checkIfRank()}
        <img className="selection-art" src={this.checkIfArt()}/>
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

Selection = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}))(Selection);

export default Selection;
