import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Lyrics.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom';
import fun from '../services/dataFunctions';

const query = gql`
  query getSong($artist_id: Int!, $name: String!, $album_id: Int!){
    getSong(artist_id: $artist_id, name: $name, album_id: $album_id){
      id
      name
      unique_words
      lyrics
      tags {
        id
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
  async componentDidMount(){
    if(this.props.state.selectedArtist){
      const response = await fetch("https://stormy-chamber-42667.herokuapp.com/https://api.lyrics.ovh/v1/" + this.props.state.selectedArtist + "/" + this.props.match.params.id);
      const json = await response.json();
      // console.log(json.lyrics);
      // let newLyrics = json.lyrics.replace(/ *\([^)]*\) */g, "");
      // this.props.setLyrics(json.lyrics.replace("\n", "<br/>"))
      this.props.setLyrics(json.lyrics.replace(/\n/g, "<br/>").split('<br/>'))
      // this.props.setLyrics(json.lyrics.split('\n'))

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
        // console.log("refetched", data);
      })
    })
  }

  calculateUnique() {

    let cleanedUp = fun.cleaner(this.props.state.lyrics.join(' '))
    return fun.countUnique(cleanedUp);
  }

  popup = () => {

  }

  isHighlighted() {
    return "no-highlight";
  }

  breakUpLyrics(){
    let lines = this.props.state.lyrics;
    if(lines){
      return lines.map(line => {
        // console.log(line);
          return (<p onClick={this.popup} className={this.isHighlighted()}>{line}<br/></p>);
      });
    }
  }

  render() {
    let {data} = this.props;
    if (data.loading) {
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
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
      let unique = this.calculateUnique()
      console.log("unique",unique);
      this.runMutation(unique);
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
    }

    // console.log(this.props.data);
    return (
      <div className="Lyrics">
        <div className="heading-lyrics">
          <h1 className="name-lyrics">{this.props.match.params.id}</h1>
          <h1 className="artist-lyrics">By: {this.props.state.selectedArtist}</h1>
          <h2 className="count-lyrics">unique word count <br/> {this.props.data.getSong.unique_words}</h2>
        </div>
        <div className="the-lyrics">{this.breakUpLyrics()}</div>
        {/* <div>{this.props.state.lyrics}</div> */}
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
