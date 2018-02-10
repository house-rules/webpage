import { GAME_SELECTED, SET_DATA, SET_TOKEN, REMOVE_TOKEN, SET_ERROR, SET_USER, SET_FILTER, ADD_GAME , LOG_OUT, ADD_ALTERNATE } from '../actions/action';
import update from 'immutability-helper';
import Cookies from 'js-cookie';

const initialState = {
    token: Cookies.get('token'),
    error: null,
    gamesList: [],
    filter: 'all',
    user: {username: Cookies.get('name'), email: Cookies.get('email')},
    selectedGame: '',
    loggedIn: false
};

// TODO create DELETE_GAME, DELETE_HOUSE_RULES, ADD_HOUSE_RULES and create thier actions. Need some help from the backend to receive the proper info
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return update(state, {
                error: {
                    $set: action.payload
                }
            });
        case SET_TOKEN:
            return update(state, {
                token: {
                    $set: action.payload
                }
            });
        case REMOVE_TOKEN:
            return update(state, {
                token: {
                  $set: null
                }
            })
        case GAME_SELECTED:
            return update(state, {
              selectedGame: {
                $set: action.payload
              }
            });
        case SET_DATA:
            return update(state, {
              gamesList: {
                $set: action.payload
              }
            });
        case SET_USER:
            return update(state, {
              user: {
                $set: action.payload
              },
              loggedIn: {
                $set: true
              }
            });
        case SET_FILTER:
          return update(state, {
            filter: {
              $set: action.payload
            }
          });
        case ADD_GAME:
          return update(state, {
            gamesList: {
              $push: [action.payload]
            }
          });
        case ADD_ALTERNATE:
          return update(state, {
            selectedGame: {
              alternates: {
                $push: [action.payload]
              }
            }
          });
        case LOG_OUT:
          return update(state, {
            loggedIn: {
              $set: false
            },
            user: {
              $set: null
            },
            filter: {
              $set: 'all'
            }
          });
        default:
          return state;
    }
};

export default reducer;
