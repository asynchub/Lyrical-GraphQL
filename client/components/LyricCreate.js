import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    event.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.value,
        songId: this.props.songId
      }
    });
    this.setState({ value: ''});
  }

  render() {
    return(
      <form
      onSubmit={this.handleSubmit}>
        <label>Write Lyric</label>
        <input
        value={this.state.value}
        onChange={(event) => this.setState({ value: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation fAddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
