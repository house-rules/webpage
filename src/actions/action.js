import Cookies from 'js-cookie';
// import request from "superagent";
import services from '../services/services';

export const GAME_SELECTED = "GAME_SELECTED",
             SET_DATA      = "SET_DATA",
             SET_USER      = "SET_USER",
             SET_TOKEN     = 'SET_TOKEN',
             REMOVE_TOKEN  = 'REMOVE_TOKEN',
             SET_FILTER    = 'SET_FILTER',
             ADD_GAME      = 'ADD_GAME',
             LOG_OUT       = 'LOG_OUT',
             ADD_ALTERNATE = 'ADD_ALTERNATE',
             SET_ALERT     = 'SET_ALERT';

// TODO once reducers are created for DELETE_GAME and DELETE_HOUSE_RULES create the necessary actions.
const makeActionCreator = function(actionType) {
    return function(payload) {
        return {type: actionType, payload: payload}
    }
};

export const setToken     = makeActionCreator(SET_TOKEN),
             removeToken  = makeActionCreator(REMOVE_TOKEN),
             setData      = makeActionCreator(SET_DATA),
             setUser      = makeActionCreator(SET_USER),
             addGame      = makeActionCreator(ADD_GAME),
             addAlternate = makeActionCreator(ADD_ALTERNATE),
             logout       = makeActionCreator(LOG_OUT),
             setFilter    = makeActionCreator(SET_FILTER),
             gameSelected = makeActionCreator(GAME_SELECTED),
             setAlert     = makeActionCreator(SET_ALERT);

// TODO change this url once backend can log in and out
// const baseURL = "https://dry-forest-51238.herokuapp.com/api";
// const baseURL = "https://user-auth-test.herokuapp.com";
// const baseURL = 'https://house-rules-api.herokuapp.com';
// const api = (path) => baseURL + path;

export const register = (fields) => {
    return (dispatch, getState) => {
      return services.register(fields)
             .then(data =>{
               if (data.error) {
                 dispatch(setAlert({type: 'error', message: data.error}));
                 return data;
               } else {
                 dispatch(setAlert({type: 'success', message: fields.username + ' successfully registered'}))
                 dispatch(login({email: fields.email, password: fields.password, username: fields.username}))
                 return data;
               }
             });
    };
};

export const login = (fields) => {
  return (dispatch) => {
    return services.login(fields)
           .then(data => {
             if (!data.user) {
              dispatch(setAlert({type: 'error', message: data.errors}));
              return data;
             } else {
               dispatch(setAlert({type: null, message: null}))
               dispatch(setToken(data['auth_token']));
               dispatch(setUser({
                   email: data.user.email,
                   username: data.user.username,
                   userId: data.user.id
               }))
               // dispatch(getGamePage(data['auth_token']));
               Cookies.set('token', data['auth_token'], {expires: 90});
               Cookies.set('email', data.user['email'], {expires: 90});
               Cookies.set('name', data.user['username'], {expires: 90});
               Cookies.set('userId', data.user['id'], {expires: 90});
               return data;
             }
           });
  };
};

// const getGamePage = (token) => {
//   return(dispatch, getState) => {
//     // TODO move to services.js
//     request
//       .get(api("/dashboard"))
//       .set('X-AUTH-TOKEN', getState()['token'])
//       .end((err, res) => {
//         if (err) {
//           console.log("Error---->>>> ", err);
//           // return dispatch(setAlert({type: 'error', message: res.body.errors}));
//         }
//
//       })
//   }
// }

export const loadTokenFromCookie = () => {
  return (dispatch) => {
    const token  = Cookies.get('token');
    const email  = Cookies.get('email');
    const name   = Cookies.get('name');
    const userId = Cookies.get('userId');
    if (token) {
        dispatch(setToken(token));
        // dispatch(getGamePage(token));
        dispatch(setUser({
            email: email,
            username: name,
            userId: userId
        }))
    }
  }
}

export const destroyCookie = () => {
  return (dispatch) => {
    const token = Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('userId');
    dispatch(removeToken(token));
    dispatch(logout());
    dispatch(setUser({
        email: null,
        username: null,
        userId: null
    }))
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
             if (data.errors) {
               dispatch(setAlert({type: 'error', message: data.errors}));
               return data.errors;
             } else {
               dispatch(addGame(data))
               dispatch(setAlert({type: 'success', message: data.title + ' successfully added'}))
               return data;
             }
             // return data;
           })
  }
}

// api call to add alternate rules to a game.
export const newAlternate = (payload) => {
  return(dispatch, getState) => {
    return services.addHouseRules(payload)
            .then(data => {
              if (data.errors) {
                dispatch(setAlert({type: 'error', message: data.errors}));
                return data.errors;
              } else {
                dispatch(addAlternate(data))
                dispatch(setAlert({type: 'success', message: data.title + ' added successfully'}))
                return data;
              }

            });
  };
};
