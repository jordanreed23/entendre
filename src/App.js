import React, {Component} from 'react';
import logo from './entendre.png';
import './App.css';
import {Link, Redirect} from 'react-router-dom';
import Main from './Components/Main'
import Login from './Components/Login'
// import Form from 'react-router-form'

const searchAPI = "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=";
const searchFiller = "&page=1";
const apiKey = "&apikey=7f3562e79563e3cca7c348708ebeb4ad";

const apiKey2 = "195003";
const artistAlbums = "https://stormy-chamber-42667.herokuapp.com/http://www.theaudiodb.com/api/v1/json/" + apiKey2 + "/searchalbum.php?s=";
// const artistAlbums = "https://api.musixmatch.com/ws/1.1/artist.albums.get?format=jsonp&callback=callback&artist_id=";
// const albumsFiller = "&s_release_date=desc&page_size=99";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        username: '',
        token: '',
        pic: '',
        contributions: 0,
        id: 1,
      },
      isSearched: false,
      isArtists: false,
      dropdown: false,
      artistList: [],
      selectedArtist: null,
      selectArtistId: null,
      selectedArtistImg: '',
      selectedArtistBio: '',
      albumList: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",],
      selectedAlbumId: null,
      // selectedAlbumImg: null,
      tracklist: [],
      lyrics: null,
      // selectedSong: null,
      noResults: false,
      // topArtists: [],
    }
  }

  updateUserState = (data) => {
    this.setState({
      loggedIn: true,
      user: {
        username: data.username,
        token: data.token,
        pic: data.pic,
        contributions: data.contributions,
        id: 1
      },
      dropdown: false
    });
  }

  setSelectedArtist = (name) => {
    this.setState({
      selectedArtistId: name
    })
  }

  setArtistId = (id) => {
    this.setState({
      selectedArtistId: id
    })
  }

  setAlbumId = (id) => {
    this.setState({
      selectedAlbumId: id
    })
  }

  setTracklist = (tracks) => {
    this.setState({
      tracklist: tracks
    })
  }

  setLyrics = (lyrics) => {
    this.setState({
      lyrics: lyrics
    })
  }

  activateDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  hideDropdown = () => {
    this.setState({dropdown: false})
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      user: {
        username: '',
        token: '',
        pic: '',
        contributions: null,
        id: null,
      },
      dropdown: false
    })
  }

  apiCall(artist) {
    let newArtist = artist.replace(' ', '%20');
    fetch(searchAPI + newArtist + searchFiller + apiKey).then(res => {
      return res.text()
    }).then(data => {
      let newJson = JSON.parse(data.slice(9, data.length - 2))
      let justArtists = newJson.message.body.artist_list;
      let cleanArtists = [];
      if (justArtists.length > 0) {
        if (justArtists[0].artist.artist_name == artist) {
          cleanArtists.push(justArtists[0].artist.artist_name)
        } else {
          for (var i = 0; i < justArtists.length; i++) {
            if (justArtists[i].artist.artist_name.search(/feat/i) === -1 && justArtists[i].artist.artist_name.search(/ & /i) === -1 && justArtists[i].artist.artist_name.search(/ft./i) === -1) {
              cleanArtists.push(justArtists[i].artist.artist_name);
            }
          }
        }
      }
      this.setState({artistList: cleanArtists})
      if (cleanArtists.length === 1) {
        this.setState({selectedArtist: cleanArtists[0]})
        this.singleArtist(cleanArtists[0]);
      } else if (cleanArtists.length < 1) {
        fetch(artistAlbums + artist).then(res => {
          res.json().then(data => {
            if (data.album) {
              if (data.album.length > 0) {
                this.setState({selectedArtist: artist})
                this.singleArtist(artist);
              }
            }
          });
        });
      } else{
        console.log("mutiple artist results", this.state.artistList);
        this.setState({isArtists: true, isSearched: true});
      }
    })
  }

  singleArtist(artist) {
    console.log("before");
    fetch("https://stormy-chamber-42667.herokuapp.com/http://www.theaudiodb.com/api/v1/json/195003/search.php?s=" + artist).then(response => {
      console.log("after");
      response.json()
      .then(info => {
        if(!info.artists){
          this.setState({noResults: true})
        }
        else{
        this.setState({selectedArtistImg: info.artists[0].strArtistThumb, selectedArtistBio: info.artists[0].strBiographyEN, noResults: false});
        fetch(artistAlbums + artist).then(res => {
          res.json().then(data => {
            let cleanAlbums = [];
            if (data.album !== null) {
              for (var i = 0; i < data.album.length; i++) {
                if (data.album[i].strReleaseFormat === 'Album') {
                  cleanAlbums.push({name: data.album[i].strAlbum, art: data.album[i].strAlbumThumb, idAlbum: data.album[i].idAlbum, year: data.album[i].intYearReleased, description: data.album[i].strDescriptionEN})
                }
              }
              this.setState({albumList: cleanAlbums, isSearched: true});
            } else {
              console.log("No albums found for " + artist);
            }
          })
        })
      }
      })
    })
    .catch(err => {
      console.log(err);
        // this.setState({albumList: cleanAlbums, isSearched: true});
    })
  }

  searchArtists = (e) => {
    console.log("in",e.target);
    //Currently not working but intended to use params for when user directly inputs name into url
    if(this.props.match){
      if(this.props.match.params.path === "/albums/:id"){
        this.apiCall(this.props.match.params.id);
      }
    }
    else{
    e.preventDefault();
    this.apiCall(e.target.artist.value);
    }
  }

  resetSearched = (e) => {
    this.setState({isSearched: false});
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <div className="App-area-logo" onClick={this.hideDropdown}>
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title"><Link className="App-title" to='/'>Entendre</Link></h1>
        </div>
        <form className="form-search" onSubmit={this.searchArtists}>
          <div className="box" onClick={this.hideDropdown}>
            <div className="container-1">
              <span className="icon">
                <i className="fa fa-search"></i>
              </span>
              <input type="search" id="search" name="artist" placeholder="Search Artists..."/>
            </div>
          </div>
            <input hidden="hidden" type="submit" value="Send" className="submit-search"/>
        </form>
        <div className="App-area-signin">
          <Login state={this.state}
            updateUserState={this.updateUserState} activateDropdown={this.activateDropdown} hideDropdown={this.hideDropdown} logout={this.logout} testLogin={this.testLogin}/>
        </div>
      </header>
      <div onClick={this.hideDropdown}>
        <Main state={this.state}
          searchArtists={this.searchArtists}
          resetSearched={this.resetSearched}
          setArtistId={this.setArtistId}
          setAlbumId={this.setAlbumId}
          setTracklist={this.setTracklist}
          setLyrics={this.setLyrics}
          setSelectedArtist={this.setSelectedArtist}
        />
      </div>

      <footer className="App-footer" onClick={this.hideDropdown}></footer>
    </div>);
  }
}

export default App;
