export const CHANGE_MATCHING_NUMBER = "CHANGE_MATCHING_NUMBER";
export const CHANGE_TEAM_NAME = "CHANGE_TEAM_NAME";
export const CHANGE_TEAM_IMG = "CHANGE_TEAM_IMG";
export const CHANGE_MATCHING_DATE = "CHANGE_MATCHING_DATE";
export const CHANGE_MATCHING_LOC = "CHANGE_MATCHING_LOC";
export const CHANGE_TEAM_GENDER = "CHANGE_TEAM_GENDER";
export const CHANGE_TEAM_LEVEL = "CHANGE_TEAM_LEVEL";
export const CHANGE_VIEW_COUNT = "CHANGE_VIEW_COUNT";
export const CHANGE_WRITTEN_DATE = "CHANGE_WRITTEN_DATE";
export const CHANGE_STADIUM_ID = "CHANGE_STADIUM_ID";
export const CHANGE_TEAMSIZE = "CHANGE_TEAMSIZE";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const CHANGE_MATCHING_TYPE = "CHANGE_MATCHING_TYPE";
export const RESET_STATE = "RESET_STATE";

export const changeMatchingNumber = (matchingNum) => ({ type: CHANGE_MATCHING_NUMBER, payload: matchingNum })
//teamId = team1 인지 team2인지 선택
export const changeTeamName = (teamId, teamName) => ({ type: CHANGE_TEAM_NAME, payload: { teamId, teamName }});
export const changeTeamImg = (teamId, teamImg) => ({type: CHANGE_TEAM_IMG, payload: { teamId, teamImg }});
export const changeMatchingDate = (matchingDate) => ({type: CHANGE_MATCHING_DATE,payload: matchingDate });
export const changeMatchingLoc = (matchingLoc) => ({type: CHANGE_MATCHING_LOC, payload: matchingLoc });
export const changeTeamGender = (teamGender) => ({ type: CHANGE_TEAM_GENDER,payload: teamGender });
export const changeTeamLevel = (teamLevel) => ({type: CHANGE_TEAM_LEVEL,payload:  teamLevel });
export const changeViewCount = (viewCount) => ({type: CHANGE_VIEW_COUNT, payload: viewCount });
export const changeWrittenDate = (writtenDate) => ({type: CHANGE_WRITTEN_DATE,payload: writtenDate });
export const changeStadiumId = (stadiumId) => ({type: CHANGE_STADIUM_ID, payload: stadiumId});
export const changeTeamSize = (teamSize) => ({type: CHANGE_TEAMSIZE, payload: teamSize});
export const updateAllFields = (fields) => ({type: UPDATE_ALL_FIELDS, payload: fields});
export const changeMatchingType = (matchingType) => ({type: CHANGE_MATCHING_TYPE, payload: matchingType});
export const resetState = () => ({type: RESET_STATE});