import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Search.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'
import Selection from './Selection'

const query = gql`

query getAlbum($artist_id: Int!, $name: String!){
  getAlbum(artist_id: $artist_id, name: $name){
    id
    name
    art
    unique_words
    songs {
      id
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
      console.log(tracklist);
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
      console.log("add album response", res);
      console.log("name", this.props.state.albumList[i].name);
      console.log("art id", this.props.state.selectedArtistId);
      this.props.data.refetch({
        variables: {
          name: res.data.addAlbum.name,
          artist_id: res.data.addAlbum.id,
        }
      // this.props.data.refetch({
      //   variables: {
      //     name: this.props.state.albumList[i].name,
      //     artist_id: this.props.state.selectedArtistId,
      //   }
      }).then(data => {
        console.log("refetched", data);
      })
    })
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

    if(!this.props.data.getAlbum){
      this.runMutation();
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
    }

    if(this.props.data.getAlbum.id !==   this.props.state.selectedAlbumId){
      this.props.setAlbumId(this.props.data.getAlbum.id);
    }

    return (
      <div className="search-heading">
        <div className="heading">
          <img src={this.props.data.getAlbum.art} className="img-heading"/>
          <h1 className="name-heading">{this.props.data.getAlbum.name}</h1>
        </div>
        <h1 className="list-heading">TRACKLIST</h1>
        <div className="list">
          {/* replace albumList with track list */}
          {this.props.state.tracklist.map((x, i) => {
            return <Link  className="selection-links" to={`/lyrics/${x.name}`}><Selection music={x} rank={i+1} tracks={true}/></Link>
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

Songs = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}))(Songs);

export default Songs;
