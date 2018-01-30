import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Selection.css';
import {Link} from 'react-router-dom'

class Selection extends Component {
  checkIfWords(){
    console.log("check albums", this.props.albums);
    if(this.props.words){
      return `${this.props.words}`
    }
    if(this.props.music.vocab !== undefined){
      return `${this.props.music.vocab}`
    }
    else if(this.props.albums){
      console.log("beeeegin");
      for (var i = 0; i < this.props.albums.length; i++) {
        console.log("albums",this.props.albums[i]);
        console.log("music", this.props.music.name);
        
        if(this.props.albums[i].name === this.props.music.name && this.props.albums[i].unique_words){

          return `${this.props.albums[i].unique_words}`
        }
      }
    }
  }

  checkIfRank(){
    if(this.props.tracks){
      return <h1 className="selection-track-num">{this.props.rank}</h1>
    }
    if(this.props.rank){
      return <h1 className="selection-rank">{this.props.rank}</h1>
    }
  }

  checkIfArt(){
    if(!this.props.music.art){
      return "https://thumbs.dreamstime.com/t/vintage-microphone-black-background-over-64061389.jpg"
    } else{
      return this.props.music.art;
    }
  }

  checkIfTracks(){
    if(this.props.tracks){
      return
    }else{
      return <img className="selection-art" src={this.checkIfArt()}/>
    }
  }

  selectFont(){
    if(this.props.tracks){
      return "selection-name-track"
    }else{
      return "selection-name"
    }
  }

  searchIfRanked = (e) => {
    console.log("this", this);
    this.props.setSelectedArtist(this.props.music.name)
  }

  render() {

    return (
      <div className="Selection"
        // onClick={this.searchIfRanked}
        >
        {this.checkIfRank()}
        {this.checkIfTracks()}
        <div className="selection-info">
          <h1 className={this.selectFont()}>{this.props.music.name}</h1>
          <h2 className="selection-details">{this.checkIfWords()}</h2>
        </div>
      </div>
    )
  }
}

export default Selection;
