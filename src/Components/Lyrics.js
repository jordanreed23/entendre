import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Lyrics.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'

const query = gql`{
  allUsers{
    id
    username
    pic
  }
}
`;

const mutation1 = gql `
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

class Lyrics extends Component {
  async componentDidMount(){
    if(this.props.state.selectedArtist){
      const response = await fetch("https://stormy-chamber-42667.herokuapp.com/https://api.lyrics.ovh/v1/" + this.props.state.selectedArtist + "/" + this.props.match.params.id);
      const json = await response.json();
      console.log(json.lyrics);
      // let newLyrics = json.lyrics.replace(/ *\([^)]*\) */g, "");
      // this.props.setLyrics(json.lyrics.replace("\n", "<br/>"))
      this.props.setLyrics(json.lyrics.replace(/\n/g, "<br/>").split('<br/>'))
      // this.props.setLyrics(json.lyrics.split('\n'))

    }
  }

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

  popup = () => {

  }

  isHighlighted() {

  }

  breakUpLyrics(){
    let lines = this.props.state.lyrics;
    if(lines){
      return lines.map(line => {
        console.log(line);
          return (<p onClick={this.popup} className={this.isHighlighted}>{line}<br/></p>);
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

    if(!this.props.data.getSong){
      this.runMutation();
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
    }

    return (
      <div className="Lyrics">
        <div className="heading-lyrics">
          <h1 className="name-lyrics">{this.props.match.params.id}</h1>
          <h1 className="artist-lyrics">By: {this.props.state.selectedArtist}</h1>
        </div>
        <div className="the-lyrics">{this.breakUpLyrics()}</div>
        {/* <div>{this.props.state.lyrics}</div> */}
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Lyrics = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}))(Lyrics);

export default Lyrics;
