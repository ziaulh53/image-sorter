import gql from "graphql-tag";

export const ADMIN_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    AdminLogin(email: $email, password: $password) {
      code
      success
      message
      token
      user {
        # _id
        email
        role
      }
    }
  }
`;

export const VERIFICATION_CODE = gql`
  mutation Verify2FCodeAdmin($code: String!) {
    Verify2FCodeAdmin(code: $code) {
      code
      success
      message
      token
      user {
        email
        role
      }
    }
  }
`;

export const ADMIN_SIGNUP = gql`
  mutation AdminRegister($userInput: RegistrationInput) {
    AdminRegister(userInput: $userInput) {
      code
      message
      success
    }
  }
`;

export const ADMIN_LOGOUT = gql`
  mutation Logout($code: String) {
    Logout(code: $code) {
      code
      message
      success
    }
  }
`;

// export const CHECK_USER_TOKEN = gql`
//   mutation IsValidToken($code: String) {
//     IsValidToken(code: $code) {
//       code
//       message
//       success
//     }
//   }
// `;

export const FORGET_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    ForgetPassword(email: $email) {
      code
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassowrd($securityCode: String!, $newPassword: String!) {
    ResetPassowrd(securityCode: $securityCode, newPassword: $newPassword) {
      code
      success
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  # Write your query or mutation here
  mutation VerifyEmail($securityCode: String!) {
    VerifyEmail(securityCode: $securityCode) {
      code
      success
      message
    }
  }
`;

export const CONFIRM_EMAIL_CHANGE = gql`
  mutation ConfirmChangeEmail($securityCode: String!) {
    ConfirmChangeEmail(securityCode: $securityCode) {
      code
      success
      message
    }
  }
`;

export const FACEBOOK_LOGIN = gql`
  mutation FacebookSignIn($token: String, $role: UserRole) {
    FacebookSignIn(token: $token, role: $role) {
      code
      success
      message
      user {
        _id
        firstname
        lastname
        avater
        email
        status
        role
        status
        phone
        zipCode
        age
        gender
        isScocialPrivider
        timeZone
        isEmailVarified
      }
      token
    }
  }
`;

export const GOOGLE_AUTH = gql`
  mutation GoogleSignIn($token: String, $role: UserRole) {
    GoogleSignIn(token: $token, role: $role) {
      code
      success
      message
      user {
        _id
        firstname
        lastname
        avater
        email
        status
        role
        status
        phone
        zipCode
        age
        gender
        timeZone
        isScocialPrivider
        isEmailVarified
      }
      token
    }
  }
`;

export const PROFILE_UPDATE = gql`
  mutation ProfileUpdate($profileData: UserProfileUpdateInput) {
    ProfileUpdate(profileData: $profileData) {
      code
      success
      message
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation ChangeEmail($password: String!, $newEmail: String!) {
    ChangeEmail(password: $password, newEmail: $newEmail) {
      code
      success
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation PassowrdUpdate($oldPassword: String!, $newPassword: String!) {
    PassowrdUpdate(oldPassword: $oldPassword, newPassword: $newPassword) {
      code
      message
      success
    }
  }
`;

export const NEW_EMAIL_VERIFY = gql`
  mutation ConfirmChangeEmail($securityCode: String!) {
    ConfirmChangeEmail(securityCode: $securityCode) {
      code
      success
      message
    }
  }
`;

export const CHECK_GUEST_EMAIL = gql`
  mutation IsGuestUser($email: String) {
    IsGuestUser(email: $email) {
      code
      success
      message
      _id
    }
  }
`;

export const USER_UNSUBSCRIBER = gql`
  mutation RemoveSubscriber($email: String!) {
    RemoveSubscriber(email: $email) {
      code
      success
      message
    }
  }
`;
