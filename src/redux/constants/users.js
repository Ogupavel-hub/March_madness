import { ActionType } from 'redux-promise-middleware';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_PENDING = `LOAD_USERS_${ActionType.Pending}`;
export const LOAD_USERS_FULFILLED = `LOAD_USERS_${ActionType.Fulfilled}`;
export const LOAD_USERS_REJECTED = `LOAD_USERS_${ActionType.Rejected}`;
