export const CHANGE_TEAM_NUMBER = "CHANGE_TEAM_NUMBER";
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
export const RESET_STATE = "RESET_STATE";

// 팀 번호 변경
export const changeTeamNumber = (teamNumber) => ({
    type: CHANGE_TEAM_NUMBER,
    payload: teamNumber
});

// 용병 모집 게시물 내용 변경
export const changeCollectionDescription = (teamNumber, collectionDescription) => ({
    type: CHANGE_COLLECTION_DESCRIPTION,
    payload: { teamNumber, collectionDescription }
});

// 용병 모집 시간 변경
export const changeCollectionTime = (teamNumber, collectionTime) => ({
    type: CHANGE_COLLECTION_TIME,
    payload: { teamNumber, collectionTime }
});

// 팀원 모집 현 멤버수 변경
export const changeCurrentMember = (teamNumber, currentMember) => ({
    type: CHANGE_CURRENT_MEMBER,
    payload: { teamNumber, currentMember }
});

// 팀원 모집 총 멤버수 변경
export const changeTotalMember = (teamNumber, totalMember) => ({
    type: CHANGE_TOTAL_MEMBER,
    payload: { teamNumber, totalMember }
});

// 팀 명 변경
export const changeTeamName = (teamNumber, teamName) => ({
    type: CHANGE_TEAM_NAME,
    payload: { teamNumber, teamName }
});

// 팀 이미지 변경
export const changeTeamImg = (teamNumber, teamImg) => ({
    type: CHANGE_TEAM_IMG,
    payload: { teamNumber, teamImg }
});

// 팀 도시 변경
export const changeTeamCity = (teamNumber, teamCity) => ({
    type: CHANGE_TEAM_CITY,
    payload: { teamNumber, teamCity }
});

// 팀 구 변경
export const changeTeamLoc = (teamNumber, teamLoc) => ({
    type: CHANGE_TEAM_LOC,
    payload: { teamNumber, teamLoc }
});

// 팀 성별 변경
export const changeTeamGender = (teamNumber, teamGender) => ({
    type: CHANGE_TEAM_GENDER,
    payload: { teamNumber, teamGender }
});

// 게시물 조회수 변경
export const changeViewCount = (teamNumber, viewCount) => ({
    type: CHANGE_VIEW_COUNT,
    payload: { teamNumber, viewCount }
});

// 팀 모집 완료 상태 변경
export const changeActiveStatus = (teamNumber, activeStatus) => ({
    type: CHANGE_ACTIVE_STATUS,
    payload: { teamNumber, activeStatus },
});

// 게시물 작성 날짜 변경
export const changeWrittenDate = (teamNumber, writtenDate) => ({
    type: CHANGE_WRITTEN_DATE,
    payload: { teamNumber, writtenDate }
});

// 팀 사이즈 변경
export const changeTeamSize = (teamNumber, teamSize) => ({
    type: CHANGE_TEAM_SIZE,
    payload: { teamNumber, teamSize }
});

// 경기장 변경
export const changeStadium = (teamNumber, stadium) => ({
    type: CHANGE_STADIUM,
    payload: { teamNumber, stadium }
});

// 상태 초기화
export const resetState = () => ({
    type: RESET_STATE,
});