import { LOGIN, LOGOUT } from "../constants";
import { db } from "../../config";

// logout
export const LogOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};


// login 
export const LogIn = async(payload)=>(dispatch)=>{
  dispatch({
    type: LOGIN,
    payload: payload
  })
}

