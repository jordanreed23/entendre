import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Home.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'
import Selection from './Selection';
import fun from '../services/dataFunctions'

const query = gql`
{
  allArtists{
    id
    name
    vocab
    art
  }
}
`;

const mutation = gql `
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

class Home extends Component {
  // componentDidMount() {
  //   const topArtists = fun.organizeVocab(this.props.data.allArtists)
  // }

  // displayArtists() {
  //   if(this.state.isArtists){
  //     return "/artists"
  //   } else{
  //     return "/albums"
  //   }
  // }

  render() {

    if (this.props.data.loading) {
      return <div>Calculating...</div>
    }
    console.log(this.props.state.noResuls);

    if(this.props.state.noResults){
      return <Redirect to="/none"/>;
    }

    if(this.props.state.isSearched){
      if(this.props.state.isArtists){
        return <Redirect to={`/artists/${this.props.state.selectedArtist}`}/>;
      }else{
        return <Redirect to={`/albums/${this.props.state.selectedArtist}`}/>;
      }
    }

    const topArtists = this.props.data.allArtists;

    return (
      <div className="Home">
        <h1 className="welcome-text">Entendre...</h1>
        <h1 className="subheading">highlighting lyricism in music</h1>
        <form className="home-form-search" onSubmit={this.props.searchArtists}>
          <div className="box">
            <div className="container-1 home-search">
              <input type="search" id="search" name="artist" placeholder="Search Artists..."/>
            </div>
          </div>
          <input hidden="hidden" type="submit" value="Send" className="submit-search"/>
        </form>
        <div className="top-ranked-header">
          <h1 className="wordsmiths">TOP WORDSMITHS</h1>
          <h1 className="wordsmiths vocabulary">VOCABULARY</h1>
        </div>
          {topArtists.map((x, i) => {
            return <Link  className="selection-links" to={`/albums/${x.name}`}><Selection music={x} rank={i + 1}/></Link>
          })}
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {}
  })
}

Home = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Home);

export default Home;
