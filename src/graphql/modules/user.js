import gql from "graphql-tag";

export const FETCH_ALL_USER = gql`
  query FetchUserList($limit: Int, $offset: Int) {
    FetchUserList(limit: $limit, offset: $offset) {
      code
      success
      message
      users {
        _id
        password
        email
        phone
        userName
        status
        role
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID, $userInput: RegistrationInput) {
    UpdateUser(userId: $userId, userInput: $userInput) {
      code
      success
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID) {
    DeleteUser(userId: $userId) {
      code
      success
      message
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($userInput: RegistrationInput) {
    AddUser(userInput: $userInput) {
      code
      success
      message
    }
  }
`;

export const FETCH_SINGLE_USER = gql`
  query FetchUserById($id: ID) {
    FetchUserById(id: $id) {
      code
      user {
        _id
        email
        phone
        userName
        role
        status
      }
      message
      success
    }
  }
`;

export const FETCH_IMAGES = gql`
  query FetchImagesAdmin($limit: Int, $offset: Int, $userId: ID) {
    FetchImagesAdmin(limit: $limit, offset: $offset, userId: $userId) {
      code
      success
      message
      count
      result {
        _id
        link
        position
        score
      }
    }
  }
`;

export const ADD_IMAGES = gql`
  mutation AddImages($list: [ImageInput]) {
    AddImages(list: $list) {
      code
      success
      message
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID) {
    DeleteImage(id: $id) {
      code
      success
      message
    }
  }
`;
