import * as ActionTypes from "src/redux/constants";

export const showPreloader = () => (dispatch, getState) => {
    const { show } = getState().preloader;

    if (show) {
        return null
    }

    return dispatch({
        type: ActionTypes.SHOW_PRELOADER
    })
};

export const hidePreloader = () => (dispatch, getState) => {
    const { show } = getState().preloader;

    if (!show) {
        return null
    }

    return dispatch({
        type: ActionTypes.HIDE_PRELOADER
    })
};
