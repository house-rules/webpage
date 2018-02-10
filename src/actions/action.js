import Cookies from 'js-cookie';
import request from "superagent";
import services from '../services/services';

export const GAME_SELECTED = "GAME_SELECTED";
export const SET_DATA = "SET_DATA";
export const SET_USER = "SET_USER";
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const SET_FILTER = 'SET_FILTER';
export const ADD_GAME = 'ADD_GAME';
export const LOG_OUT = 'LOG_OUT';
export const ADD_ALTERNATE = 'ADD_ALTERNATE';

//TODO once reducers are created for DELETE_GAME, DELETE_HOUSE_RULES, and ADD_HOUSE_RULES; create the necessary actions.
//TODO We then want to make the api call followed by updating the state with the returned info.

const makeActionCreator = function(actionType) {
    return function(payload) {
        return {type: actionType, payload: payload}
    }
};

const setToken     = makeActionCreator(SET_TOKEN);
const removeToken  = makeActionCreator(REMOVE_TOKEN);
const setError     = makeActionCreator(SET_ERROR);
const setData      = makeActionCreator(SET_DATA);
const setUser      = makeActionCreator(SET_USER);
const addGame      = makeActionCreator(ADD_GAME);
export const addAlternate = makeActionCreator(ADD_ALTERNATE);
export const logout       = makeActionCreator(LOG_OUT);
export const setFilter    = makeActionCreator(SET_FILTER);
export const gameSelected = makeActionCreator(GAME_SELECTED);

// TODO change this url once backend can log in and out
// const baseURL = "https://dry-forest-51238.herokuapp.com/api";
const baseURL = "https://user-auth-test.herokuapp.com";
const api = (path) => baseURL + path;

export const register = (state) => {
    // TODO change to a normal fetch call to handle the data. Call login upon successfully registering.
    // TODO move to services.js
    return (dispatch, getState) => {
        // dispatch(incrLoading(1));
        request //TODO change this endpoint back to /createUser
            .post(api("/register"))
            .send({email: state.email, password: state.password, full_name: state.username, message: 'Hi ' + state.username + '!'})
            .end((err, res) => {
                // dispatch(incrLoading(-1));
                if (err) {
                    return dispatch(setError(res.body.errors));
                } else {
                    dispatch(setError(null));
                    dispatch(login({email: state.email, password: state.password, username: state.username}))
                }
            })
    }
}

// TODO move to services.js
export const login = (fields) => {
  return (dispatch) => {
     return fetch(api('/login'), {
       method: "POST",
       body: JSON.stringify({email: fields.email, password: fields.password}),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then(response => {
       return response.json();
     })
     .then(data => {
       if (data.errors) {
         return dispatch(setError(data.errors));
       } else {
         dispatch(setError(null))
         dispatch(setToken(data['auth_token']));
         dispatch(getGamePage(data['auth_token']));
         Cookies.set('token', data['auth_token'], {expires: 90});
         Cookies.set('email', data['email'], {expires: 90});
         if (fields.username) {
           Cookies.set('name', fields.username, {expires: 90});
         }
         return data;
       }
     })
     .catch(err => {
       return dispatch(setError(err.body.errors))
     })
  }
}

const getGamePage = (token) => {
  return(dispatch, getState) => {
    // TODO move to services.js
    request
      .get(api("/dashboard"))
      .set('X-AUTH-TOKEN', getState()['token'])
      .end((err, res) => {
        if (err) {
          return dispatch(setError(res.body.errors));
        }
        dispatch(setUser({
          user: {
            email: res.body.email,
            username: res.body.full_name
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

export const destroyCookie = () => {
  return (dispatch) => {
    const token = Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('email');
    dispatch(removeToken(token));
    dispatch(logout());
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

// api call to add a game then dispatching addGame to update state with new game
export const newGame = (gameItem) => {
  return(dispatch, getState) => {
    return services.addGame(gameItem)
           .then(data => {
             dispatch(addGame(data))
           })
  }
}

// TODO create action to add alternate ruls here. Use similar to newGame.
export const newAlternate = (payload) => {
  return(dispatch, getState) => {
    return services.addHouseRules(payload)
            .then(data => {
              dispatch(addAlternate(data))
            })
  }
}
