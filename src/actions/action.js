import Cookies from 'js-cookie';
import request from "superagent";


export const GAME_SELECTED = "GAME_SELECTED";
export const SET_DATA = "SET_DATA";
export const SET_USER = "SET_USER";
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ERROR = 'SET_ERROR';

const makeActionCreator = function(actionType) {
    return function(payload) {
        return {type: actionType, payload: payload}
    }
}

const setToken = makeActionCreator(SET_TOKEN);
const setError = makeActionCreator(SET_ERROR);

const baseURL = "https://dry-forest-51238.herokuapp.com/api";
const api = (path) => baseURL + path;

export const register = ({
    email,
    password,
    username
}) => {
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

export function selectGame(gameId) {
  return {
    type: GAME_SELECTED,
    payload: gameId
  };
}

// setting the api data to the initialState
export function setData(payload) {
  return {
    type: SET_DATA,
    payload: payload
  };
}

export function setUser(payload) {
  return {
    type: SET_USER,
    payload: payload
  };
}


// calling the api for the entire gamelist
export const getGameList = () => {
  return(dispatch, getState) => {
    fetch('https://house-rules-jgwrbs.herokuapp.com/api/gameList')
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(setData(data));
    })
  }
}
