import * as userActions from '../action/auth.action';
const auth = (
  state = {
    isLogined: false,
    userData: {},
    userStatus: '',
    userLoading: false,
    userType: '',
    token: '',
    isLogout: false,
  },
  action,
) => {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      return Object.assign({}, state, {
        userLoading: true,
        userStatus: action.status,
        userType: userActions.LOGIN_REQUEST,
      });
    case userActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        token: action.token,
        userData: action.data,
        isLogined: action.data,
        userLoading: false,
        userStatus: action.status,
        userType: userActions.LOGIN_SUCCESS,
      });
    }
    case userActions.LOGIN_FAILURE:
      return Object.assign({}, state, {
        bookError: action.error,
        userLoading: false,
        userStatus: action.status,
        userType: userActions.LOGIN_FAILURE,
      });
    case userActions.LOGOUT: {
      console.log('in reduce logout', action);
      return Object.assign({}, state, {
        token: '',
        userData: {},
        isLogined: false,
        userLoading: false,
        userType: userActions.LOGOUT,
        isLogout: true,
      });
    }
    default:
      return state;
  }
};
export default auth;
