import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';
import './Detail.css';

const query = gql`
query allAlbums($artist_id: Int!){
  allAlbums(artist_id: $artist_id){
    id
    name
    unique_words
  }
}
`;

class AlbumDetail extends Component {

  render() {
    let {data} = this.props;
    if (data.loading) {
      return <div></div>
    }

    if(!this.props.data.allAlbums){
      return (<div className="detail-subheading">
        <h2 className="line">No Album Data</h2>
      </div>)
    }

    return (
      <div className="detail-subheading">
        <h1>TOP ALBUMS</h1>
        {this.props.data.allAlbums.map((x,i) =>{
          return (
            <div className="line">
              <h2 className="line-rank">{i + 1}.</h2>
              <h2 className="line-name">{x.name}</h2>
              <h2 className="line-num">({x.unique_words})</h2>
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

AlbumDetail = graphql(query, queryOptions)(AlbumDetail);

export default AlbumDetail;
