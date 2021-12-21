import gql from "graphql-tag";

export const SINGLE_FILE_UPLAOD = gql`
  mutation SingleUpload($file: Upload!) {
    SingleUpload(file: $file) {
      filename
      filesize
      mimetype
      success
      imageLink
    }
  }
`;
