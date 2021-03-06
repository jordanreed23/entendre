import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Search.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'
import Selection from './Selection'
import fun from '../services/dataFunctions';

const query = gql`

query getAlbum($artist_id: Int!, $name: String!){
  getAlbum(artist_id: $artist_id, name: $name){
    id
    name
    art
    unique_words
    songs {
      id
      name
      unique_words
      lyrics
    }
  }
}
`;

const mutation1 = gql `
mutation addAlbum($name: String!, $art: String, $year: String, $description: String, $artist_id: Int!){
  addAlbum(name: $name, art: $art, year: $year, description: $description, artist_id: $artist_id){
    id
    name
  }
}
`;

const mutation2 = gql `
mutation updateAlbumVocab($id: Int!, $unique_words: Int!){
  updateAlbumVocab(id: $id, unique_words: $unique_words){
    id
    unique_words
  }
}
`;

class Songs extends Component {
  async componentDidMount(){
    if(this.props.state.selectedArtist){
      const response = await fetch("https://stormy-chamber-42667.herokuapp.com/http://www.theaudiodb.com/api/v1/json/195003/track.php?m=" + this.props.state.albumList[this.props.match.params.id].idAlbum);
      const json = await response.json();
      let tracklist = [];
      for (var i = 0; i < json.track.length; i++) {
        tracklist.push({name: json.track[i].strTrack});
      }
      this.props.setTracklist(tracklist)
    }
  }

  runMutation (){
    let i = this.props.match.params.id
    this.props.mutation1({
      variables: {
        name: this.props.state.albumList[i].name,
        art: this.props.state.albumList[i].art,
        year: this.props.state.albumList[i].year,
        description: this.props.state.albumList[i].description,
        artist_id: this.props.state.selectedArtistId,
      }
    }).then(res => {
      this.props.data.refetch({
        variables: {
          name: res.data.addAlbum.name,
          artist_id: res.data.addAlbum.id,
        }
      }).then(data => {
      })
    })
  }

  calculate = () => {
    let allLyrics = fun.combineLyrics(this.props.data.getAlbum.songs);
    let cleanLyrics = fun.cleaner(allLyrics);
    let count = fun.countUnique(cleanLyrics);
    this.props.mutation2({
      variables: {
        id: this.props.data.getAlbum.id,
        unique_words: count,
      }
    }).then(res => {
      this.props.data.refetch({
        variables: {
          name: this.props.data.getAlbum.name,
          artist_id: this.props.state.selectedArtist,
        }
      }).then(data => {
      })
    })
  }

  checkIfUniqueWords(track){
    for (var i = 0; i < this.props.data.getAlbum.songs.length; i++) {
      if(this.props.data.getAlbum.songs[i].name === track.name){
        return this.props.data.getAlbum.songs[i].unique_words;
      }
    }
    return null;
  }

  checkTotalUnique(){
    if(this.props.data.getAlbum.unique_words){
      return (`${this.props.data.getAlbum.unique_words}`)
    }
    else{
      return (<button className="unique-button" onClick={this.calculate}>Calculate Unique</button>)
    }
  }

  render() {
    let {data} = this.props;
    if (data.loading) {
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif" alt="Loading"/></div>
    }

    if(!this.props.state.selectedArtist){
      return <Redirect to="/"/>;
    }

    if(this.props.state.isSearched){
      if(this.props.state.isArtists){
        return <Redirect to={`/artists/${this.props.state.selectedArtist}`}/>;
      }else{
        return <Redirect to={`/albums/${this.props.state.selectedArtist}`}/>;
      }
    }

    if(!this.props.data.getAlbum){
      this.runMutation();
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif" alt="Loading"/></div>
    }

    if(this.props.data.getAlbum.id !== this.props.state.selectedAlbumId){
      this.props.setAlbumId(this.props.data.getAlbum.id);
    }

    this.props.data.refetch({
      variables: {
        name: this.props.data.getAlbum.name,
        artist_id: this.props.state.selectedArtist,
      }
    }).then(data => {
    })

    return (
      <div className="search-heading">
        <div className="heading">
          <img src={this.props.data.getAlbum.art} alt="album art" className="img-heading"/>
          <h1 className="name-heading">{this.props.data.getAlbum.name}</h1>
          <h2 className="count-unique">unique word count <br/>
          {this.checkTotalUnique()}</h2>
        </div>
        <h1 className="list-heading">TRACKLIST</h1>
        <div className="list">
          {this.props.state.tracklist.map((x, i) => {
            return <Link  className="selection-links" to={`/lyrics/${x.name}`}><Selection music={x}  words={this.checkIfUniqueWords(x)} rank={i+1} tracks={true}/></Link>
          })}
        </div>
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {
      artist_id: ownProps.state.selectedArtistId,
      name: ownProps.state.albumList[ownProps.match.params.id].name,
    }
  })
}

Songs = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}),graphql(mutation2, {name: 'mutation2'}))(Songs);

export default Songs;
