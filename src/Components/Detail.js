import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Detail.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'
import AlbumDetail from './AlbumDetail'
import SongDetail from './SongDetail'

const query = gql`
  query getArtist($name: String!){
  getArtist(name: $name){
    id
    name
    art
    vocab
    tags
    bio
    albums {
      name
      id
      year
      songs{
        id
        name
        unique_words
        lyrics
      }
    }
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

class Detail extends Component {

  checkLocation(){
    if(this.props.album){
      return (<h1 className="detail-heading">BREAKDOWN</h1>)
    }
    else{
      return (<div className="detail-heading">
                <h1>BREAKDOWN<br/><br/>{this.props.state.selectedArtist}</h1>
                <img src={this.props.state.selectedArtistImg}/>
              </div>)
    }
  }

  checkIfDetailed(){
    if(!this.props.data.getArtist){
      return (<div></div>)
    }
    if(!this.props.data.getArtist.vocab){
      return (<div className="detail-details">
          <div className="detail-subheading">
            <h1>VOCABULARY: Not Calculated</h1>
          </div>
        </div>)
    }
    else {
    return (<div className="detail-details">
        <div className="detail-subheading">
          <h1 >VOCABULARY: {this.props.data.getArtist.vocab}</h1>
        </div>
        <AlbumDetail artist_id={this.props.data.getArtist.id}/>
        <SongDetail artist_id={this.props.data.getArtist.id}/>
      </div>)
    }
  }

  render() {
    let {data} = this.props;
    if (data.loading) {
      return <div></div>
    }

    if(!this.props.state.selectedArtist){
      return <Redirect to="/"/>;
    }

    if(!this.props.data.getArtist){
      console.log("in");
      this.props.data.refetch({
        variables: {
          name: this.props.state.selectedArtist,
        }
      }).then(data => {
        console.log("refetched", data);
      })
    }
    return (
      <div className="Detail">
        {this.checkLocation()}
        {this.checkIfDetailed()}
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {
      name: ownProps.state.selectedArtist
    }
  })
}

Detail = compose(graphql(query, queryOptions), graphql(mutation, {name: 'mutation'}))(Detail);

export default Detail;
