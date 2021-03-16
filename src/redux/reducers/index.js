import { combineReducers } from "redux";
import { appReducer } from "./app";
import { preloaderReducer } from "./preloader";
import { playersReducer } from "./players";
import { contentReducer } from "./content";
import { usersReducer } from "./users";
import { userReducer } from "./user";


const rootReducer = combineReducers({
    app: appReducer,
    preloader: preloaderReducer,
    players: playersReducer,
    content: contentReducer,
    users: usersReducer,
    user: userReducer,
});

export default rootReducer;
