import * as ActionTypes from "src/redux/constants";


const initialState = {
    isLoading: false,
    response: [],
    error: false
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_USERS_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.LOAD_USERS_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isLoading: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_USERS_FULFILLED: {
            return {
                ...state,
                isLoading: false,
                response: action.payload.data.records,
                error: false
            };
        }
        default:
            return state;
    }
};
