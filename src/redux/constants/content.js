import { ActionType } from 'redux-promise-middleware';


export const LOAD_CONTENT = 'LOAD_CONTENT';
export const LOAD_CONTENT_PENDING = `LOAD_CONTENT_${ActionType.Pending}`;
export const LOAD_CONTENT_FULFILLED = `LOAD_CONTENT_${ActionType.Fulfilled}`;
export const LOAD_CONTENT_REJECTED = `LOAD_CONTENT_${ActionType.Rejected}`;
