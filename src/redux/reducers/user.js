import * as ActionTypes from "src/redux/constants";


const initialState = {
    isLoading: false,
    response: null,
    error: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // load user
        case ActionTypes.LOAD_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.LOAD_USER_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isLoading: false,
                response: null,
                // response: data, // TODO if need errors rendering
                error: true
            };
        }
        case ActionTypes.LOAD_USER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                response: action.payload.data,
                error: false
            };

        // create user
        case ActionTypes.CREATE_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.CREATE_USER_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isLoading: false,
                response: null,
                // response: data, // TODO if need errors rendering
                error: true
            };
        }
        case ActionTypes.CREATE_USER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                response: action.payload.data,
                error: false
            };

        // update user
        case ActionTypes.UPDATE_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.UPDATE_USER_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isLoading: false,
                response: null,
                // response: data, // TODO if need errors rendering
                error: true
            };
        }
        case ActionTypes.UPDATE_USER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                response: action.payload.data,
                error: false
            };

        // logout
        case ActionTypes.LOGOUT:
            return {
                isLoading: false,
                response: null,
                error: false
            };
        default:
            return state;
    }
};
