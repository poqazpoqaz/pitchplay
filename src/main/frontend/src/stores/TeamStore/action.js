// 액션타입
export const CHANGE_TEAM_NAME = "CHANGE_TEAM_NAME";
export const CHANGE_TEAM_CODE = "CHANGE_TEAM_CODE";
export const CHANGE_TEAM_IMG = "CHANGE_TEAM_IMG";
export const CHANGE_TEAM_DESCRIPTION = "CHANGE_TEAM_DESCRIPTION";
export const CHANGE_TEAM_LEVEL = "CHANGE_TEAM_LEVEL";
export const CHANGE_TEAM_DAY = "CHANGE_TEAM_DAY";
export const CHANGE_TEAM_TIME = "CHANGE_TEAM_TIME";
export const CHANGE_TEAM_CITY = "CHANGE_TEAM_CITY";
export const CHANGE_TEAM_LOC = "CHANGE_TEAM_LOC";
export const CHANGE_TEAM_AGE = "CHANGE_TEAM_AGE";
export const CHANGE_TEAM_GENDER = "CHANGE_TEAM_GENDER";
export const CHANGE_CURRENT_MEMBER = "CHANGE_CURRENT_MEMBER";
export const CHANGE_TOTAL_MEMBER = "CHANGE_TOTAL_MEMBER";
export const CHANGE_COLLECTION_TITLE = "CHANGE_COLLECTION_TITLE";
export const CHANGE_TEAM_MEMBER = "CHANGE_TEAM_MEMBER";
export const RESET_STATE = "RESET_STATE";

// 액션생성자 
export const changeTeamName = (teamName) => ({ type: CHANGE_TEAM_NAME, payload: teamName });
export const changeTeamCode = (teamCode) => ({ type: CHANGE_TEAM_CODE, payload: teamCode });
export const changeTeamImg = (teamImg) => ({ type: CHANGE_TEAM_IMG, payload: teamImg });
export const changeTeamDescription = (teamDescription) => ({ type: CHANGE_TEAM_DESCRIPTION, payload: teamDescription });
export const changeTeamLevel = (teamLevel) => ({ type: CHANGE_TEAM_LEVEL, payload: teamLevel });
export const changeTeamDay = (teamDay) => ({ type: CHANGE_TEAM_DAY, payload: teamDay });
export const changeTeamTime = (teamTime) => ({ type: CHANGE_TEAM_TIME, payload: teamTime });
export const changeTeamCity = (teamCity) => ({ type: CHANGE_TEAM_CITY, payload: teamCity });
export const changeTeamLoc = (teamLoc) => ({ type: CHANGE_TEAM_LOC, payload: teamLoc });
export const changeTeamAge = (teamAge) => ({ type: CHANGE_TEAM_AGE, payload: teamAge });
export const changeTeamGender = (teamGender) => ({ type: CHANGE_TEAM_GENDER, payload: teamGender });
export const changeCurrentMember = (currentMember) => ({ type: CHANGE_CURRENT_MEMBER, payload: currentMember });
export const changeTotalMember = (totalMember) => ({ type: CHANGE_TOTAL_MEMBER, payload: totalMember });
export const changeCollectionTitle = (collectionTitle) => ({ type: CHANGE_COLLECTION_TITLE, payload: collectionTitle });
export const changeTeamMember = (teamMember) => ({ type: CHANGE_TEAM_MEMBER, payload: teamMember});
export const resetState = () => ({ type: RESET_STATE });