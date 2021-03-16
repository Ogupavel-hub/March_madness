import qs from 'qs';
import * as ActionTypes from "src/redux/constants";
import { axiosAPI, urls } from "src/api";


export const loadUsers = (params) => (dispatch, getState) => {
    const state = getState();
    if (state.users.isLoading) {
        return Promise.reject(null)
    }

    return dispatch({
        type: ActionTypes.LOAD_USERS,
        payload: axiosAPI.get(urls.users, {
            params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
    });
};
