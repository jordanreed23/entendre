import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './Detail.css';

const query = gql`
query allSongs($artist_id: Int!){
  allSongs(artist_id: $artist_id){
    id
    name
    unique_words
  }
}
`;

class SongDetail extends Component {

  render() {
    let {data} = this.props;
    if (data.loading) {
      return <div></div>
    }

    if(!this.props.data.allSongs){
      return (<div className="detail-subheading">
        <h2 className="line">No Song Data</h2>
      </div>)
    }

    return (
      <div className="detail-subheading">
        <h1>TOP SONGS</h1>
        {this.props.data.allSongs.map((x,i) =>{
          return (
            <div className="line">
              <h2 className="line-rank">{i + 1}.</h2>
              <h2 className="line-name">{x.name}</h2>
              <h2>({x.unique_words})</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const queryOptions = {
  options: ownProps => ({
    variables: {
      artist_id: ownProps.artist_id
    }
  })
}

SongDetail = graphql(query, queryOptions)(SongDetail);

export default SongDetail;
