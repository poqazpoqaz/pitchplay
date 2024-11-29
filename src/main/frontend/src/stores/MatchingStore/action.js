export const CHANGE_MATCHING_NUMBER = "CHANGE_MATCHING_NUMBER";
export const CHANGE_TEAM_NAME = "CHANGE_TEAM_NAME";
export const CHANGE_TEAM_IMG = "CHANGE_TEAM_IMG";
export const CHANGE_MATCHING_DATE = "CHANGE_MATCHING_DATE";
export const CHANGE_MATCHING_LOC = "CHANGE_MATCHING_LOC";
export const CHANGE_TEAM_GENDER = "CHANGE_TEAM_GENDER";
export const CHANGE_TEAM_LEVEL = "CHANGE_TEAM_LEVEL";
export const CHANGE_VIEW_COUNT = "CHANGE_VIEW_COUNT";
export const CHANGE_WRITTEN_DATE = "CHANGE_WRITTEN_DATE";
export const RESET_STATE = "RESET_STATE";

//teamId = team1 인지 team2인지 선택
export const changeMatchingNumber = (matchingNum) => ({
    type: CHANGE_MATCHING_NUMBER, payload: { matchingNum }
})

export const changeTeamName = (matchingNum, teamId, teamName) => ({
    type: CHANGE_TEAM_NAME,
    payload: { matchingNum, teamId, teamName }
});

export const changeTeamImg = (matchingNum, teamId, teamImg) => ({
    type: CHANGE_TEAM_IMG,
    payload: { matchingNum, teamId, teamImg }
});

export const changeMatchingDate = (matchingNum, matchingDate) => ({
    type: CHANGE_MATCHING_DATE,
    payload: { matchingNum, matchingDate }
});

export const changeMatchingLoc = (matchingNum, matchingLoc) => ({
    type: CHANGE_MATCHING_LOC,
    payload: { matchingNum, matchingLoc }
});

export const changeTeamGender = (matchingNum, teamGender) => ({
    type: CHANGE_TEAM_GENDER,
    payload: { matchingNum, teamGender }
});

export const changeTeamLevel = (matchingNum, teamLevel) => ({
    type: CHANGE_TEAM_LEVEL,
    payload: { matchingNum, teamLevel }
});

export const changeViewCount = (matchingNum, viewCount) => ({
    type: CHANGE_VIEW_COUNT,
    payload: { matchingNum, viewCount }
});

export const changeWrittenDate = (matchingNum, writtenDate) => ({
    type: CHANGE_WRITTEN_DATE,
    payload: { matchingNum, writtenDate }
});

export const resetState = () => ({
    type: RESET_STATE
});