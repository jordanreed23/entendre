import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import './Main.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Artists from './Artists';
import Albums from './Albums';
import Detail from './Detail';
import Lyrics from './Lyrics';
import Songs from './Songs';
import None from './None';
// import Login from './Login'
import {Link} from 'react-router-dom';

// const query = gql `{
//   allUsers{
//     id
//     username
//     pic
//   }
// }
// `;
//
// const mutation = gql `
//   mutation newUser($username: String!, $token: String!, $pic: String){
//     createUser(username: $username, token: $token, pic: $pic) {
//       id
//       username
//       token
//       pic
//       contributions
//     }
//   }
//   `;

class Main extends Component {

  render() {
    // let {data} = this.props;
    // if (data.loading) {
    //   return <div className="main-load">
    //     <img src="https://thumbs.gfycat.com/ImpressiveRigidHind-max-1mb.gif"/>
    //     <h3>Loading</h3>
    //   </div>
    // }
    return (<div className="Main">
      <div className="Main-left">
        <Switch>
          <Route exact path='/' render={(props) => (<Home {...props} searchArtists={this.props.searchArtists} state={this.props.state}
          setSelectedArtist={this.props.setSelectedArtist}/>)}/>
          <Route exact path='/artists' render={(props) => (<Artists {...props} searchArtists={this.props.searchArtists} state={this.props.state}/>)}/>
          <Route path='/albums/:id' render={(props) => (<Albums {...props} state={this.props.state} resetSearched={this.props.resetSearched}
          searchArtists={this.props.searchArtists} setArtistId={this.props.setArtistId}/>)}/>
          <Route path='/songs/:id' render={(props) => (<Songs {...props} state={this.props.state} resetSearched={this.props.resetSearched}
          searchArtists={this.props.searchArtists} setTracklist={this.props.setTracklist}
          setAlbumId={this.props.setAlbumId}/>)}/>
          <Route path='/lyrics/:id' render={(props) => (<Lyrics {...props} state={this.props.state} resetSearched={this.props.resetSearched}
          searchArtists={this.props.searchArtists} setLyrics={this.props.setLyrics}/>)}/>
          <Route exact path='/none' render={(props) => (<None {...props} state={this.props.state}/>)}/>

        </Switch>
      </div>
      <div className="Main-right">
        <Switch>
          <Route exact path='/' component={About}/>
          <Route path='/artists/' component={About}/>
          <Route path="/albums/" render={(props) => (<Detail {...props} state={this.props.state}
          album={true}/>)}/>
          <Route path="/songs/" render={(props) => (<Detail {...props} state={this.props.state}/>)}/>
          <Route path="/lyrics/" render={(props) => (<Detail {...props} state={this.props.state}/>)}/>
        </Switch>
      </div>
    </div>);
  }
}

// const queryOptions = {
//   options: ownProps => ({
//     variables: {
//       // username: ownProps.state.user.username,
//       // token: ownProps.state.user.token,
//       // pic: 'http://profile.actionsprout.com/default.jpeg',
//     }
//   })
// }
//
// Main = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Main);

export default Main;
