import * as ActionTypes from "src/redux/constants";
import { formattingContentResponse } from "src/api";


const initialState = {
    enable_selection: false,
    login_label: 'frank michael smith\'s',
    login_text: 'Choose 1 player from each tier. The team with the most total points scored through the whole tournament wins!',
    login_consent: 'By participating, you consent to receive recurring autodialed SMS/MMS promotional messages. No purchase required. Msg&data rates may apply. Reply HELP for help, or STOP to end.',
    main_selection_rules: 'Choose 1 player from each tier. The team with the most total points scored through the whole tournament wins!',
    main_selected_players: 'Thanks for entering.',
    main_empty: 'Contest 38 is closed! Must be following Frank & SBD',
    leaderboard_label: 'leaderboard',
    leaderboard_empty: '"March Madness" else didn\'t start',
    isLoading: false,
    response: null,
    error: false
};

export const contentReducer = (state=initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_CONTENT_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.LOAD_CONTENT_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isLoading: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_CONTENT_FULFILLED: {
            const data = action.payload.data;
            const result = formattingContentResponse(data);
            return {
                ...result,
                response: data,
                isLoading: false,
                error: false
            };
        }
        default:
            return state;
    }
};
