import Cookies from 'js-cookie';
import request from "superagent";
import services from '../services/services';

export const GAME_SELECTED = "GAME_SELECTED";
export const SET_DATA = "SET_DATA";
export const SET_USER = "SET_USER";
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const SET_FILTER = 'SET_FILTER';

const makeActionCreator = function(actionType) {
    return function(payload) {
        return {type: actionType, payload: payload}
    }
}

const setToken     = makeActionCreator(SET_TOKEN);
const setError     = makeActionCreator(SET_ERROR);
const setData      = makeActionCreator(SET_DATA);
const setUser      = makeActionCreator(SET_USER);
export const setFilter    = makeActionCreator(SET_FILTER);
export const gameSelected = makeActionCreator(GAME_SELECTED);

const baseURL = "https://dry-forest-51238.herokuapp.com/api";
const api = (path) => baseURL + path;

export const register = ({email, password, username}) => {
    return (dispatch, getState) => {
        // dispatch(incrLoading(1));
        request
            .post(api("/createUser"))
            .send({email: email, password: password, username: username})
            .end((err, res) => {
                // dispatch(incrLoading(-1));
                if (err) {
                    return dispatch(setError(res.body.errors));
                } else {
                    dispatch(setError(null));
                }
            })
    }
}

export const login = (email, password) => {
  return (dispatch) => {
    request
      .post(api("/games"))
      .send({email: email, password: password})
      .end((err, res) => {
        if (err) {
            return dispatch(setError(res.body.errors));
        } else {
            dispatch(setError(null));
        }

        dispatch(setToken(res.body['auth_token']));
        dispatch(getGamePage(res.body['auth_token']));
        Cookies.set('token', res.body['auth_token'], {expires: 90});
      })
  }
}

const getGamePage = (token) => {
  return(dispatch, getState) => {
    request
      .get(api("/games"))
      .set('X-AUTH-TOKEN', getState()['token'])
      .end((err, res) => {
        if (err) {
          return dispatch(setError(res.body.errors));
        }
        dispatch(setUser({
          user: {
            email: res.body.email,
            username: res.body.username
          }
        }))
      })
  }
}

export const loadTokenFromCookie = () => {
  return (dispatch) => {
    const token = Cookies.get('token');
    if (token) {
        dispatch(setToken(token));
        dispatch(getGamePage());
    }
  }
}

// calling the api for the entire gamelist
export const getGameList = () => {
  return(dispatch, getState) => {
    return services.fetchGameList()
           .then(data => {
             dispatch(setData(data))
           })
  }
}
