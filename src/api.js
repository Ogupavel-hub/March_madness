import axios from "axios";
import marked from "marked";

import renderer from "./renderer";


marked.use({ renderer });

const baseID = 'appEhFhZN0JNjcDgv';

const baseURL = (() => {
    const environment = process.env.NODE_ENV;

    switch (environment) {
        case 'test':
            return '';
        default:
            return `https://api.airtable.com/v0/${baseID}/`;
    }
})();


export const axiosAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: "Bearer keyMZ0LJwZkwSeJuQ",
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

// 429 status code need retry
// axiosAPI.interceptors.response.use(null, error => {
//     const status = error.status || error.response.status;
//     if (status === 401 || status === 403) {
//         store.dispatch(logoutUser());
//     }
//     return Promise.reject(error);
// });


export const urls = {
    content: 'Content',
    players: 'Players',
    users: 'Users',
};

export const formattingContentResponse = (data) => {
    const { records } = data;
    if (!records.length) return;

    const { fields } = records[0];
    return {
        enable_selection: fields["enable_selection"],
        login_label: fields["login_label"],
        login_text: fields["login_text"],
        login_consent: marked(fields["login_consent"]),
        main_selection_rules: marked(fields["main_selection_rules"]),
        main_selected_players: marked(fields["main_selected_players"]),
        main_empty: marked(fields["main_empty"]),
        leaderboard_label: fields["leaderboard_label"],
        leaderboard_empty: marked(fields["leaderboard_empty"]),
    }
};

export const formattingPlayersResponse = (data) => {
    const { records } = data;
    return records.map(card => {
        const { fields } = card;
        const first_image = fields["Card"][0];
        return {
            id: card.id,
            name: fields["Name"],
            tier: fields["Tier"],
            // image_url: first_image.url,
            image_url: first_image['thumbnails']['large']['url'],
            // image_url_mobile: first_image['thumbnails']['large']['url']
        }
    });
};
