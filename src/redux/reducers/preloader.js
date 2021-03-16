import * as ActionTypes from "src/redux/constants";


const initialState = {
    show: false
};

export const preloaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_PRELOADER:
            return { show: true };

        case ActionTypes.HIDE_PRELOADER:
            return { show: false };

        default:
            return state;
    }
};
