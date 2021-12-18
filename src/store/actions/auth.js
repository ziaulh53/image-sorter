import { LOGIN, LOGOUT } from "../constants";
import { fAuth } from "../../config";

// logout
export const LogOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// login
export const LogIn = (payload) => async(dispatch) => {
  const res = await fAuth.signInWithEmailAndPassword(
    payload.email,
    payload.password
  );
  dispatch({
    type: LOGIN,
    payload: { ...res.user?.multiFactor?.user },
  });
  return { ...res.user?.multiFactor?.user };
  // .then(userCredential=>{
  //   dispatch({
  //     type: LOGIN,
  //     payload: {...userCredential.user?.multiFactor?.user}
  //   })
  //   return {...userCredential.user?.multiFactor?.user}
  // }).catch(err=>console.log(err))
};
