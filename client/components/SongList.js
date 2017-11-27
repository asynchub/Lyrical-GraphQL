import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.renderSongs = this.renderSongs.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.mutate({
      variables: { id },
      // refetchQueries: [{ query }] // for not associated queries with this component
    }).then(() => this.props.data.refetch()); // better for associated queries with this component via props
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return(
        <li key={id} className='collection-item'>
          <Link to={`songs/${id}`}>
            {title}
          </Link>
          <i
          className="material-icons"
          onClick={() => this.handleDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return(
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link to="songs/new">
          <button
          className="material-icons btn-floating btn-large right"
          >
            add
          </button>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation fDeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
