import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import {Link} from 'react-router-dom'
import Main from './Components/Main'
import Login from './Components/Login'

const searchAPI = "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=";
const searchFiller = "&page=1";
const apiKey = "&apikey=7f3562e79563e3cca7c348708ebeb4ad";

const apiKey2 = "195003";
const artistAlbums = "https://galvanize-cors-proxy.herokuapp.com/http://www.theaudiodb.com/api/v1/json/" + apiKey2 + "/searchalbum.php?s=";
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
        entendres: 0
      },
      dropdown: false,
      artistList: [],
      selectedArtist: null,
      albumList: [],
      selectedAlbum: null,
      songList: [],
      selectedSong: null
    }
  }

  async componentDidMount() {

    // let proxy = "https://galvanize-cors-proxy.herokuapp.com/";
    // let baseURL = 'http://localhost:8082/';
    // let baseURL = 'https://entendre.herokuapp.com/';
    //
    // const response = await fetch(baseURL)
    // const json = await response.json()
    // console.log(json);
  }

  updateUserState = (data) => {
    this.setState({
      loggedIn: true,
      user: {
        username: data.username,
        token: data.token,
        pic: data.pic,
        contributions: data.contributions
      },
      dropdown: false
    });
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
        entendres: 0
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
      console.log(newJson);
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

      console.log(cleanArtists);
      this.setState({artistList: cleanArtists})

      if (cleanArtists.length === 1) {
        this.setState({selectedArtist: cleanArtists[0]})
        this.singleArtist(cleanArtists[0]);
      } else if (cleanArtists.length < 1) {
        fetch(artistAlbums + artist).then(res => {
          res.json().then(data => {
            if (data.album) {
              if (data.album.length > 0) {
                this.singleArtist(artist);
              }
            }
          });
        });
      }
    })
  }

  searchArtists = (e) => {
    e.preventDefault();
    this.apiCall(e.target.artist.value);
  }

  singleArtist(artist) {
    // let newArtist = artist.replace(' ', '%20');
    fetch(artistAlbums + artist).then(res => {
      res.json().then(data => {

        let cleanAlbums = [];
        if (data.album !== null) {
          for (var i = 0; i < data.album.length; i++) {
            if (data.album[i].strReleaseFormat === 'Album') {
              cleanAlbums.push({name: data.album[i].strAlbum, art: data.album[i].strAlbumThumb, idAlbum: data.album[i].idAlbum})
            }
          }
          this.setState({albumList: cleanAlbums})
          console.log(this.state.albumList);
        } else {
          console.log("No albums found for " + artist);
        }

      })
    })
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <div className="App-area-logo" onClick={this.hideDropdown}>
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Entendre</h1>
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
        <Main state={this.state}/>
      </div>

      <footer className="App-footer" onClick={this.hideDropdown}></footer>
    </div>);
  }
}

export default App;
