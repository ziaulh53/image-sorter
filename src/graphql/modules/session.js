import gql from "graphql-tag";

export const FETCH_SESSION_ADMIN = gql`
  query FetchSessionListAdmin($limit: Int, $offset: Int, $userId: ID) {
    FetchSessionListAdmin(limit: $limit, offset: $offset, userId: $userId) {
      code
      result {
        _id
        name
        status
        createdAt
      }
      message
      count
    }
  }
`;

export const FETCH_SINGLE_SESSION_ADMIN = gql`
  query FetchSingleSessionAdmin($id: ID, $userId: ID) {
    FetchSingleSessionAdmin(id: $id, userId: $userId) {
      code
      message
      success
      result {
        _id
        name
        images {
          _id
          link
          position
          score
        }
        status
        createdAt
      }
    }
  }
`;

export const ADD_SESSION = gql`
  mutation AddSession($name: String, $user: ID) {
    AddSession(name: $name, user: $user) {
      code
      message
      success
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation DeleteSession($id: ID) {
    DeleteSession(id: $id) {
      code
      message
      success
    }
  }
`;
