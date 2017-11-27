import gql from 'graphql-tag';

export default gql`
  query fSongQuery($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;
