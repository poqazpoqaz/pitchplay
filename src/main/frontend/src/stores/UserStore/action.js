export const CHANGE_USER_NUMBER = "CHANGE_USER_NUMBER";
export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_PROFILE_IMG = "CHANGE_PROFILE_IMG";
export const CHANGE_BIRTHDAY = "CHANGE_BIRTHDAY";
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_PHONE = "CHANGE_PHONE";
export const CHANGE_ID = "CHANGE_ID";
export const CHANGE_NICKNAME = "CHANGE_NICKNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_FAVORITE_CITY = "CHANGE_FAVORITE_CITY";
export const CHANGE_FAVORITE_TIME = "CHANGE_FAVORITE_TIME";
export const CHANGE_MY_TEAM = "CHANGE_MY_TEAM";
export const CHANGE_MY_DESCRIPTION = "CHANGE_MY_DESCRIPTION";
export const CHANGE_USER_CASH = "CHANGE_USER_CASH";
export const RESET_STATE = "RESET_STATE";

export const changeUserNumber = (userNumber) => ({type: CHANGE_USER_NUMBER, payload: userNumber});
export const changeName = (name) => ({type: CHANGE_NAME, payload: name});
export const changeProfileImg = (profileImg) => ({type: CHANGE_PROFILE_IMG, payload: profileImg});
export const changeBirthday = (birthday) => ({type: CHANGE_BIRTHDAY, payload: birthday});
export const changeEmail = (email) => ({type: CHANGE_EMAIL, payload: email});
export const changePhone = (phone) => ({type: CHANGE_PHONE, payload: phone});
export const changeId = (id) => ({type: CHANGE_ID, payload: id});
export const changeNickname = (nickname) => ({type: CHANGE_NICKNAME, payload: nickname});
export const changePassword = (password) => ({type: CHANGE_PASSWORD, payload: password});
export const changeFavoriteCity = (favoriteCity) => ({type: CHANGE_FAVORITE_CITY, payload: favoriteCity});
export const changeUserCash = (userCash) => ({type: CHANGE_USER_CASH, payload: userCash});
export const changeFavoriteTime = (favoriteTime) => ({type: CHANGE_FAVORITE_TIME, payload: favoriteTime});
export const changeMyTeam = (myTeam) => ({type: CHANGE_MY_TEAM, payload: myTeam});
export const changeMyDescription = (myDescription) => ({type: CHANGE_MY_DESCRIPTION, payload: myDescription});
export const resetState = () => ({ type: RESET_STATE });