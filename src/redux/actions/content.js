import * as ActionTypes from "src/redux/constants";
import { axiosAPI, urls } from "src/api";


export const loadContent = () => (dispatch, getState) => {
    const state = getState();
    if (state.content.isFetching) {
        return Promise.reject(null)
    }

    return dispatch({
        type: ActionTypes.LOAD_CONTENT,
        payload: axiosAPI.get(urls.content, {
            maxRecords: 1
        })
    });
};
