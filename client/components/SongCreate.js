import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { title: this.state.value },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return(
      <div>
        <Link to="/">Back</Link>
        <h4>Create New Song</h4>
        <form
        onSubmit={this.handleSubmit}
        >
          <label>
            Song Title:
          </label>
          <input
          onChange={this.handleChange}
          value={this.state.value}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation fAddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
