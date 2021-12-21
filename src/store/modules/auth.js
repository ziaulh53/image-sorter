//Constant
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

// initial state
const initialState = {
  isAuthenticated: null,
  jwtToken: null,
  user: {},
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_USER:
      window.location.href = '/';
      return initialState;

    case LOGIN_USER: {
      window.location.reload();
      return {
        isAuthenticated: !!action.payload.token,
        jwtToken: action.payload.token,
        user: action.payload.user,
      };
    }
    case UPDATE_PROFILE: {
      const statedata = {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
      return statedata;
    }
    default: {
      return state;
    }
  }
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const onUpdateProfile = (payload) => ({
  type: UPDATE_PROFILE,
  payload,
});