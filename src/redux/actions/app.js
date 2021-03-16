import * as ActionTypes from "src/redux/constants";

export const initAppSuccess = () => (dispatch, getState) => {
    return dispatch({
        type: ActionTypes.INIT_APP_SUCCESS
    })
};
