import * as ActionTypes from "src/redux/constants";
import { axiosAPI, urls } from "src/api";


export const loadPlayers = (ids) => (dispatch, getState) => {
    const state = getState();
    if (state.players.isLoading) {
        return Promise.reject(null)
    }

    const params = {};

    if (ids && ids.length) {
        const operands = ids.map(value => `RECORD_ID()='${value}'`);
        params.filterByFormula = `OR(${operands.join(',')})`;
        params.maxRecords = ids.length;
    }

    return dispatch({
        type: ActionTypes.LOAD_PLAYERS,
        payload: axiosAPI.get(urls.players, {
            params
        })
    });
};
