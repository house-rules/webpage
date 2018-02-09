import { GAME_SELECTED, SET_DATA, SET_TOKEN, SET_ERROR, SET_USER, SET_FILTER, ADD_GAME } from '../actions/action';
import update from 'immutability-helper';

const initialState = {
    token: null,
    error: null,
    gamesList: [],
    filter: 'all',
    user: null,
    selectedGame: ''
};

// TODO create ADD_GAME, DELETE_GAME, DELETE_HOUSE_RULES, ADD_HOUSE_RULES and create thier actions. Need some help from the backend to receive the proper info
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
          })
        default:
          return state;
    }
};

export default reducer;
