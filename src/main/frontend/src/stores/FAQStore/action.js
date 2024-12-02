// action.js
export const CHANGE_FAQ_NUMBER = 'CHANGE_FAQ_NUMBER';
export const CHANGE_USER_ID = 'CHANGE_USER_ID';
export const CHANGE_WRITE_NICKNAME = 'CHANGE_WRITE_NICKNAME';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CHANGE_VIEWS = 'CHANGE_VIEWS';
export const CHANGE_COMMENT = 'CHANGE_COMMENT';
export const CHANGE_USER_NICKNAME = 'CHANGE_USER_NICKNAME'

export const changefaqnumber = (faqNumber) => ({type : CHANGE_FAQ_NUMBER, payload : faqNumber});
export const changeuserid = (userId) => ({type : CHANGE_USER_ID, payload : userId});
export const changewritenickname = (writeNickname) => ({type : CHANGE_WRITE_NICKNAME, payload : writeNickname});
export const changetitle = (title) => ({type : CHANGE_TITLE, payload : title});
export const changedate = (date) => ({type : CHANGE_DATE, payload : date});
export const changecontent = (content) => ({ type: CHANGE_CONTENT, payload: content});
export const changecomment = (comment) => ({ type: CHANGE_COMMENT, payload: {comment}});
export const changeViews = (views) => ({type : CHANGE_VIEWS , payload : views});
export const changeStatus = (status) => ({type : CHANGE_STATUS , payload : status});
export const changeUserNickname = (userNickname) => ({type : CHANGE_USER_NICKNAME , payload : userNickname});
