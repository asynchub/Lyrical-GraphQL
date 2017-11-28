import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  constructor(props) {
    super(props);
    this.onLike = this.onLike.bind(this);
  }

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          likes: likes + 1,
          __typename: "LyricType"
        }
      }
    })
  }

  renderList() {
    const { lyrics } = this.props;
    if (!lyrics) { return <div>Loading...</div> }
    return(
      lyrics.map(({ id, content, likes }) => {
        return(
          <li key={id} className="collection-item">
            {content}
            <div className="vote-box">
              <i className="material-icons"
              onClick={() => this.onLike(id, likes)}
              >thumb_up</i>
              {likes}
            </div>
          </li>
        );
      })
    );
  }

  render() {
    return(
      <ul className="collection">
        {this.renderList()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation fLikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;



export default graphql(mutation)(LyricList);
