import React, {Component} from 'react';
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

class Main extends Component {

  render() {
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

export default Main;
