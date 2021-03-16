import * as ActionTypes from "src/redux/constants";


const initialState = {
    isInitialized: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.INIT_APP_SUCCESS:
            return {
                isInitialized: true
            };
        default:
            return state;
    }
};
