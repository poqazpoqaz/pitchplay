export const CHANGE_COLLECTION_NUMBER = "CHANGE_COLLECTION_NUMBER";
export const CHANGE_TEAM_CODE = "CHANGE_TEAM_CODE";
export const CHANGE_COLLECTION_DESCRIPTION = "CHANGE_COLLECTION_DESCRIPTION";
export const CHANGE_COLLECTION_TIME = "CHANGE_COLLECTION_TIME";
export const CHANGE_CURRENT_MEMBER = "CHANGE_CURRENT_MEMBER";
export const CHANGE_TOTAL_MEMBER = "CHANGE_TOTAL_MEMBER";
export const CHANGE_TEAM_NAME = "CHANGE_TEAM_NAME";
export const CHANGE_TEAM_IMG = "CHANGE_TEAM_IMG";
export const CHANGE_TEAM_CITY = "CHANGE_TEAM_CITY";
export const CHANGE_TEAM_LOC = "CHANGE_TEAM_LOC";
export const CHANGE_TEAM_GENDER = "CHANGE_TEAM_GENDER";
export const CHANGE_VIEW_COUNT = "CHANGE_VIEW_COUNT";
export const CHANGE_ACTIVE_STATUS = "CHANGE_ACTIVE_STATUS";
export const CHANGE_WRITTEN_DATE = "CHANGE_WRITTEN_DATE";
export const CHANGE_TEAM_SIZE = "CHANGE_TEAM_SIZE";
export const CHANGE_STADIUM = "CHANGE_STADIUM";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";


export const changeCollectionNumber = (collectionNumber) => ({type: CHANGE_COLLECTION_NUMBER, payload: collectionNumber})
export const changeTeamCode = (teamCode) => ({type: CHANGE_TEAM_CODE, payload: teamCode});
export const changeCollectionDescription = (collectionDescription) => ({type: CHANGE_COLLECTION_DESCRIPTION,payload: collectionDescription });
export const changeCollectionTime = (collectionTime) => ({type: CHANGE_COLLECTION_TIME,payload: collectionTime});
export const changeCurrentMember = (currentMember) => ({type: CHANGE_CURRENT_MEMBER, payload: currentMember});
export const changeTotalMember = (totalMember) => ({type: CHANGE_TOTAL_MEMBER,payload: totalMember });
export const changeTeamName = (teamName) => ({type: CHANGE_TEAM_NAME,payload: teamName });
export const changeTeamImg = (teamImg) => ({type: CHANGE_TEAM_IMG,payload:  teamImg });
export const changeTeamCity = (teamCity) => ({type: CHANGE_TEAM_CITY,payload: teamCity });
export const changeTeamLoc = (teamLoc) => ({type: CHANGE_TEAM_LOC,payload:  teamLoc });
export const changeTeamGender = ( teamGender) => ({type: CHANGE_TEAM_GENDER,payload: teamGender });
export const changeViewCount = ( viewCount) => ({type: CHANGE_VIEW_COUNT,payload: viewCount });
export const changeActiveStatus = (activeStatus) => ({type: CHANGE_ACTIVE_STATUS, payload: activeStatus});
export const changeWrittenDate = ( writtenDate) => ({type: CHANGE_WRITTEN_DATE,payload:  writtenDate });
export const changeTeamSize = (teamSize) => ({type: CHANGE_TEAM_SIZE,payload: teamSize });
export const changeStadium = (stadiumId) => ({type: CHANGE_STADIUM,payload:  stadiumId });
export const updateAllFields = (fields) => ({type: UPDATE_ALL_FIELDS, payload: fields});
export const resetState = () => ({type: RESET_STATE});