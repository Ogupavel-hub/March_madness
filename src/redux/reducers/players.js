import * as ActionTypes from "src/redux/constants";
import { formattingPlayersResponse } from "src/api";


const initialState = {
    players: [],
    isLoading: false,
    response: null,
    error: false
};

export const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_PLAYERS_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.LOAD_PLAYERS_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isLoading: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_PLAYERS_FULFILLED: {
            return {
                ...state,
                isLoading: false,
                players: formattingPlayersResponse(action.payload.data),
                response: action.payload.data,
                error: false
            };
        }
        default:
            return state;
    }
};
