import { LOGOUT, LOGIN } from "../constants";

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT: {
      return initialState;
    }

    case LOGIN: {
      return {
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
};
