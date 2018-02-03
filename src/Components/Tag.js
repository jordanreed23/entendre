import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Tag.css';

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
  constructor(props) {
    super(props);
    this.state = {
      vote: 0,
    }
  }


  runMutation (device){
    this.props.mutation1({
      variables: {
        user_id: this.props.state.user.id,
        song_id: this.props.songId,
        index: this.props.index,
        device: device,
        lyric: this.props.lyric,
      }
    }).then(res => {
      this.props.upFetch()
    })
  }

  voteUp = (e) => {
    e.preventDefault();
    this.setState({
      vote: this.state.vote + 1
    })
  }

  voteDown = (e) => {
    e.preventDefault();
    this.setState({
      vote: this.state.vote - 1
    })
  }

  addTag = (e) => {
    e.preventDefault();
    if(this.props.state.user.id){
      this.runMutation(e.target.device.value);
    }else{
      window.alert("Sign in to use tags")
    }
  }


  populateDevices(){
    if(this.props.tags){
      return this.props.tags.map(x => {
        if(x.index === this.props.index){
          return (
          <div className="content">
            <div className="device">
              <h1 className="device-label">{x.device}</h1>
              <div className="device-selections">
                <h2 className="votes">{this.state.vote}</h2>
                <i className="fa fa-thumbs-o-up" onClick={this.voteUp} aria-hidden="true"></i>
                {/* <h2 className="votes">{x.votes}</h2> */}
                <i className="fa fa-thumbs-o-down" onClick={this.voteDown} aria-hidden="true"></i>
              </div>
            </div>
          </div>)
        }
      })
    }else {
      return (<div className="content"></div>)
    }
  }

  render() {

    return (
      <div className="Tag">
        <i class="fa fa-times" aria-hidden="true" onClick={this.props.hidePopup}></i>
        <div className="tag-body">
          <h1> {this.props.lyric}</h1>
          {this.populateDevices()}
          <div className="device-form-box">
            <form className="device-form" onSubmit={this.addTag}>
              <select name="device" className="select-box">
                <option value="double entendre">double entendre</option>
                <option value="pun">pun</option>
                <option value="metaphor">metaphor</option>
                <option value="allusion">allusion</option>
                <option value="homophone">homophone</option>
                <option value="alliteration">alliteration</option>
              </select>
              <button className="device-button" type="submit" onClick={this.props.hidePopup}> Add New Tag</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Tag = compose(graphql(mutation1, {name: 'mutation1'}))(Tag);

export default Tag;
