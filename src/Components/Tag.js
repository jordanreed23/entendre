import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Tag.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom';
import fun from '../services/dataFunctions';

// const query = gql`
//   query getSong($artist_id: Int!, $name: String!, $album_id: Int!){
//     getSong(artist_id: $artist_id, name: $name, album_id: $album_id){
//       id
//       name
//       unique_words
//       lyrics
//       tags {
//         id
//       	index
//       	lyric
//       	device
//         votes
//       }
//     }
//   }
// `;

const mutation1 = gql `
  mutation addTag($user_id: Int!, $song_id: Int!, $index: Int!, $lyric: String!, $device: String!){
  	addTag(user_id: $user_id, song_id: $song_id, index: $index, lyric: $lyric, device: $device){
      id
      index
      lyric
      device
    }
  }
`;

class Tag extends Component {

  async componentDidMount(){
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

  render() {
    // let {data} = this.props;
    // if (data.loading) {
    //   return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
    // }

    return (
      <div className="Tag">
        <h1> {this.props.lyric}</h1>
        {/* <div className="heading-lyrics">
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

// const queryOptions = {
//   options: ownProps => ({
//     variables: {
//       artist_id: ownProps.state.selectedArtistId,
//       album_id: ownProps.state.selectedAlbumId,
//       name: ownProps.match.params.id,
//     }
//   })
// }

// Tag = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}))(Tag);
Tag = compose(graphql(mutation1, {name: 'mutation1'}))(Tag);

export default Tag;
