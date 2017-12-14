import { GAME_SELECTED, SET_DATA, SET_TOKEN, SET_ERROR, SET_USER } from '../actions/action';
import update from 'immutability-helper';


const initialState = {
    token: null,
    error: null,
    gamesList: [],
    filter: 'all',
    user: null,
    selectedGame: ''
}

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
        default:
          return state;
    }
}

export default reducer;
