import {apirequest} from '../apirequest/apirequest';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

//Purchase
export const userActions = {
  userLogin,
  userLogout,
};

function userLogin(token) {
  console.log('=============token in action', token);
  return dispatch => {
    dispatch(request());
    let payload = `email,first_name,last_name,friends&access_token=${token}`;
    apirequest.getUser(payload).then(
      data => dispatch(success(data, token)),
      error => dispatch(failure(error.toString())),
    );
  };

  function request() {
    return {type: LOGIN_REQUEST};
  }
  function success(data, token) {
    return {type: LOGIN_SUCCESS, data, token};
  }
  function failure(error) {
    return {type: LOGIN_FAILURE, error};
  }
}

function userLogout() {
  console.log('-----------logout action');
  return dispatch => {
    dispatch(success());
  };
  function success() {
    return {type: LOGOUT};
  }
}
