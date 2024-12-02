// action.js
export const CHANGE_POST = 'CHANGE_POST';
export const CHANGE_COMMENT = 'CHANGE_COMMENT';

export const changepost = (content) => ({ type: CHANGE_POST, payload: content});
export const changecomment = (comment) => ({ type: CHANGE_COMMENT, payload: {comment}});
