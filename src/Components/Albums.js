import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Search.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'
import Selection from './Selection'
import fun from '../services/dataFunctions';

const query = gql`
query getArtist($name: String!){
getArtist(name: $name){
  id
  name
  art
  vocab
  tags
  bio
  albums {
    name
    id
    year
    unique_words
    songs{
      id
      name
      unique_words
      lyrics
    }
  }
}
}
`;

const mutation1 = gql `
mutation addArtist($name: String!, $art: String!, $bio: String!){
  addArtist(name: $name, art: $art, bio: $bio){
    id
    name
    art
    bio
  }
}
`;

const mutation2 = gql `
mutation updateArtistVocab($id: Int!, $vocab: Int!){
  updateArtistVocab(id: $id, vocab: $vocab){
    id
    vocab
  }
}
`;

class Albums extends Component {
  runMutation (){
    this.props.mutation1({
      variables: {
        name: this.props.state.selectedArtist,
        art: this.props.state.selectedArtistImg,
        bio: this.props.state.selectedArtistBio,
      }
    }).then(res => {
      this.props.data.refetch({
        variables: {
          name: this.props.match.params.id,
        }
      }).then(data => {
        console.log("refetched", data);
      })
    })
  }

  calculate = () => {
    let allLyrics = fun.combineAlbumLyrics(this.props.data.getArtist.albums)
    let cleanLyrics = fun.cleaner(allLyrics);
    console.log("clean", cleanLyrics);
    let count = fun.countUnique(cleanLyrics);
    console.log("count", count);
    this.props.mutation2({
      variables: {
        id: this.props.data.getArtist.id,
        vocab: count,
      }
    }).then(res => {
      console.log("res", res);
      this.props.data.refetch({
        variables: {
          name: this.props.data.getArtist.name,
        }
      }).then(data => {
        console.log("refetched", data);
      })
    })
    console.log("artist count", this.props.data.getArtist.vocab);
  }

  checkTotalUnique(){
    if(this.props.data.getArtist.vocab){
      return (`${this.props.data.getArtist.vocab}`)
    }
    else{
      return (<button className="unique-button" onClick={this.calculate}>Calculate Vocabulary</button>)
    }
  }


  render() {
    let {data} = this.props;
    if (data.loading) {

      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif" alt="Loading"/></div>
    }

    if(this.props.state.isSearched){
      this.props.resetSearched();
    }

    if(!this.props.state.selectedArtist){
      return <Redirect to="/"/>;
    }

    if(this.props.state.selectedArtist !== this.props.match.params.id){

    }

    if(this.props.state.isSearched){
      if(this.props.state.isArtists){
        return <Redirect to={`/artists/${this.props.state.selectedArtist}`}/>;
      }else{
        return <Redirect to={`/albums/${this.props.state.selectedArtist}`}/>;
      }
    }

    if(!this.props.data.getArtist){
      this.runMutation();
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif" alt="Loading"/></div>
    }

    if(this.props.data.getArtist.id !==   this.props.state.selectedArtistId){
      this.props.setArtistId(this.props.data.getArtist.id);
    }

    return (
      <div className="search-heading">
        <div className="heading">
          <img src={this.props.state.selectedArtistImg} alt="artist" className="img-heading"/>
          <h1 className="name-heading">{this.props.state.selectedArtist}</h1>
          <h2 className="count-unique">VOCABULARY <br/>
          {this.checkTotalUnique()}</h2>
          {/* <button className="unique-button" onClick={this.calculate}>Calculate Vocabulary</button> */}
        </div>
        <h1 className="list-heading">AVAILABLE ALBUMS</h1>
        <div className="list">
          {this.props.state.albumList.map((x, i) => {
            return <Link  className="selection-links" to={`/songs/${i}`}><Selection albums={this.props.data.getArtist.albums} music={x}/></Link>
          })}
        </div>
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {
      name: ownProps.match.params.id,
    }
  })
}

Albums = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}),graphql(mutation2, {name: 'mutation2'}))(Albums);

export default Albums;
