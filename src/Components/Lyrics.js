import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Lyrics.css';
import {Redirect} from 'react-router-dom';
import fun from '../services/dataFunctions';
import Tag from './Tag'

const query = gql`
  query getSong($artist_id: Int!, $name: String!, $album_id: Int!){
    getSong(artist_id: $artist_id, name: $name, album_id: $album_id){
      id
      name
      unique_words
      lyrics
      tags {
        id
      	index
      	lyric
      	device
        votes
      }
    }
  }
`;

const mutation1 = gql `
  mutation addSong($artist_id: Int!, $name: String!, $album_id: Int!, $unique_words: Int!, $lyrics: String!){
    addSong(artist_id: $artist_id, name: $name, album_id: $album_id, unique_words: $unique_words, lyrics: $lyrics){
      id
      name
      unique_words
      lyrics
    }
  }
`;

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      lyric: '',
      index: null,
    }
  }

  async componentDidMount(){
    if(this.props.state.selectedArtist){
      this.props.setLyrics(null)
      const response = await fetch("https://stormy-chamber-42667.herokuapp.com/https://api.lyrics.ovh/v1/" + this.props.state.selectedArtist + "/" + this.props.match.params.id);
      const json = await response.json();
      if(json.lyrics){
        this.props.setLyrics(json.lyrics.replace(/\n/g, "<br/>").split('<br/>'))
      }
    }
  }

  runMutation (unique){

    this.props.mutation1({
      variables: {
        name: this.props.match.params.id,
        artist_id: this.props.state.selectedArtistId,
        album_id: this.props.state.selectedAlbumId,
        unique_words: unique,
        lyrics: this.props.state.lyrics.join('\n'),
      }
    }).then(res => {
      this.props.data.refetch({
        variables: {
          artist_id: this.props.state.selectedArtistId,
          album_id: this.props.state.selectedAlbumId,
          name: this.props.match.params.id,
        }
      }).then(data => {
      })
    })
  }

  hidePopup = () => {
    this.setState({
      popup: false,
    })
  }

  calculateUnique() {
    const promise = new Promise((resolve, reject)=> {
      let cleanedUp = fun.cleaner(this.props.state.lyrics.join(' '))
      resolve(fun.countUnique(cleanedUp))
    })
    return promise;
  }

  checkVisible(){
    if(this.state.popup){
      return "visible-popup";
    }
    else {
      return "invisible-popup";
    }
  }

  popup = (e, i) => {
    this.setState({
      popup: true,
      lyric: e.target.innerText,
      index: i,
    });
  }

  isHighlighted(x) {
    for (var i = 0; i < this.props.data.getSong.tags.length; i++) {
      if(this.props.data.getSong.tags[i].index === x){
        return "highlight"
      }
    }
    return "no-highlight";
  }

  breakUpLyrics(){
    let lines = this.props.state.lyrics;
    if(lines){
      return lines.map((line, i) => {
          return (<div>
            <p onClick={(e) => {this.popup(e, i)}} className={this.isHighlighted(i)}>{line}<br/></p>
          </div>);
      });
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

    if(!this.props.state.lyrics){
      return <h1 className=".Lyrics">Calculating track data</h1>
    }

    if(!this.props.data.getSong){
      this.calculateUnique()
      .then(unique => {
        this.runMutation(unique);
      })

      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif" alt="Loading"/></div>
    }

    return (
      <div className="Lyrics">
        <div className="heading-lyrics" onClick={this.hidePopup}>
          <h1 className="name-lyrics">{this.props.match.params.id}</h1>
          <h1 className="artist-lyrics">By: {this.props.state.selectedArtist}</h1>
          <h2 className="count-lyrics">unique word count <br/> {this.props.data.getSong.unique_words}</h2>
        </div>
        <div className={this.checkVisible()}><Tag lyric={this.state.lyric} index={this.state.index} songId={this.props.data.getSong.id} tags={this.props.data.getSong.tags} state={this.props.state}
        hidePopup={this.hidePopup}/></div>
        <div className="the-lyrics">{this.breakUpLyrics()}</div>
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {
      artist_id: ownProps.state.selectedArtistId,
      album_id: ownProps.state.selectedAlbumId,
      name: ownProps.match.params.id,
    }
  })
}

Lyrics = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}))(Lyrics);

export default Lyrics;
