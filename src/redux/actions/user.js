import * as ActionTypes from "src/redux/constants";
import { getUser, logout } from "src/storage";
import { axiosAPI, urls } from "src/api";


export const loadUser = (userId) => (dispatch, getState) => {
    const state = getState();
    const user = state.user.response;

    if (user) {
        return Promise.resolve(user)
    }

    return dispatch({
        type: ActionTypes.LOAD_USER,
        payload: axiosAPI.get(`${urls.users}/${userId}`)
    });
};

export const createUser = (Email, Instagram) => dispatch => {
    const user = getUser();

    if (user) {
        return Promise.resolve(user)
    }

    return dispatch({
        type: ActionTypes.CREATE_USER,
        payload: axiosAPI.post(urls.users, {
            fields: { Email, Instagram }
        })
    });
};

export const updateUser = (fields) => (dispatch, getState) => {
    const state = getState();
    if (state.user.isLoading) {
        return Promise.reject(null)
    }

    const user = getUser();
    if (!user) {
        return Promise.reject(null);
    }

    return dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: axiosAPI.patch(`${urls.users}/${user}`, {
            fields
        }),
        // meta: {
        //     ids: selected_ids
        // }
    });
};

export const logoutUser = () => dispatch => {
    logout();

    return dispatch({
        type: ActionTypes.LOGOUT
    });
};
