import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Search.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'
import Selection from './Selection'

const query = gql`
query getArtist($name: String!){
  getArtist(name: $name){
    id
    name
    art
    bio
    vocab
    tags
    albums {
      id
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

class Albums extends Component {
  componentDidMount(){
    // this.props.resetSearched();
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
  //
  // collectAlbums() {
  //   console.log('woooop');
  //
  // }

  render() {
    let {data} = this.props;
    if (data.loading) {

      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
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
      return <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-13-3.gif"/></div>
    }

    if(this.props.data.getArtist.id !==   this.props.state.selectedArtistId){
      this.props.setArtistId(this.props.data.getArtist.id);
    }
    // if(!this.props.data.getArtist.albums){
    //   this.collectAlbums();
    // }

    return (
      <div className="search-heading">
        <div className="heading">
          <img src={this.props.state.selectedArtistImg} className="img-heading"/>
          <h1 className="name-heading">{this.props.state.selectedArtist}</h1>
        </div>
        <h1 className="list-heading">AVAILABLE ALBUMS</h1>
        <div className="list">
          {this.props.state.albumList.map((x, i) => {
            return <Link  className="selection-links" to={`/songs/${i}`}><Selection music={x}/></Link>
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

Albums = compose(graphql(query, queryOptions), graphql(mutation1, {name: 'mutation1'}))(Albums);

export default Albums;
