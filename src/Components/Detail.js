import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Detail.css';
// import { Switch, Route } from 'react-router-dom'
import {Link, Redirect} from 'react-router-dom'

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
    console.log("data", this.props);
    if(!this.props.data.getArtist){
      return (<div></div>)
    }
    if(!this.props.data.getArtist.vocab){
      return (<div className="detail-details">
          <div className="detail-vocab-num">
            <h1>VOCABULARY: 3125</h1>
          </div>
          <div className="detail-subheading">
            <h1>TOP ALBUMS</h1>
            <h2>1. 7490</h2>
            <h2>2. 7490</h2>
            <h2>3. 7490</h2>
          </div>
          <div className="detail-subheading">
          <h1>TOP SONGS</h1>
          <h2>1. Daydrecml</h2>
          <h2>2. mckvjow</h2>
          <h2>3. vekop490</h2>
          <h2>4. comcpq7490</h2>
          <h2>5. vmklam kmwomcwmv7490</h2>
          <h2>6. mklqmc7490</h2>
          <h2>7. 7490</h2>
          <h2>8. mwkmckmkm7490</h2>
          <h2>9. mokcwemcok7490</h2>
          <h2>10. mwkoemovmw7490</h2>
          </div>
        </div>)
      // return (<button onClick={this.runCalculations}>Calculate Breakdown</button> )
    }
    else{
    return (<div className="detail-details">
        <div className="detail-subheading">
          <h1 >VOCABULARY: {this.props.data.getArtist.vocab}</h1>
        </div>
        <div className="detail-subheading">
          <h1>TOP ALBUMS</h1>
          <h2>1. 7490</h2>
          <h2>2. 7490</h2>
          <h2>3. 7490</h2>
        </div>
        <div className="detail-subheading">
        <h1>TOP SONGS</h1>
        <h2>1. Daydrecml</h2>
        <h2>2. mckvjow</h2>
        <h2>3. vekop490</h2>
        <h2>4. comcpq7490</h2>
        <h2>5. vmklam kmwomcwmv7490</h2>
        <h2>6. mklqmc7490</h2>
        <h2>7. 7490</h2>
        <h2>8. mwkmckmkm7490</h2>
        <h2>9. mokcwemcok7490</h2>
        <h2>10. mwkoemovmw7490</h2>
        </div>
      </div>)
    }
  }

  render() {
    let {data} = this.props;
    console.log("first step", data);
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
