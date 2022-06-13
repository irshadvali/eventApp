import {apirequest} from '../apirequest/apirequest';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//Purchase
export const userActions = {
  userLogin,
};

function userLogin(data) {
  return dispatch => {
    dispatch(request());
    try {
      dispatch(success(data));
    } catch (e) {
      console.log('error', e);
    }
  };

  function request() {
    return {type: LOGIN_REQUEST};
  }
  function success(data) {
    return {type: LOGIN_SUCCESS, data};
  }
  function failure(error) {
    return {type: LOGIN_FAILURE, error};
  }
}
