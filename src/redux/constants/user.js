import { ActionType } from 'redux-promise-middleware';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_PENDING = `LOAD_USER_${ActionType.Pending}`;
export const LOAD_USER_FULFILLED = `LOAD_USER_${ActionType.Fulfilled}`;
export const LOAD_USER_REJECTED = `LOAD_USER_${ActionType.Rejected}`;

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_PENDING = `CREATE_USER_${ActionType.Pending}`;
export const CREATE_USER_FULFILLED = `CREATE_USER_${ActionType.Fulfilled}`;
export const CREATE_USER_REJECTED = `CREATE_USER_${ActionType.Rejected}`;

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_PENDING = `UPDATE_USER_${ActionType.Pending}`;
export const UPDATE_USER_FULFILLED = `UPDATE_USER_${ActionType.Fulfilled}`;
export const UPDATE_USER_REJECTED = `UPDATE_USER_${ActionType.Rejected}`;

export const LOGOUT = 'LOGOUT';
