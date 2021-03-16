import { ActionType } from 'redux-promise-middleware';

export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const LOAD_PLAYERS_PENDING = `LOAD_PLAYERS_${ActionType.Pending}`;
export const LOAD_PLAYERS_FULFILLED = `LOAD_PLAYERS_${ActionType.Fulfilled}`;
export const LOAD_PLAYERS_REJECTED = `LOAD_PLAYERS_${ActionType.Rejected}`;
