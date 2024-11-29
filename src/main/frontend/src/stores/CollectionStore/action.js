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
export const RESET_STATE = "RESET_STATE";


export const changeCollectionNumber = (collectionNumber) => ({type: CHANGE_COLLECTION_NUMBER, payload: collectionNumber})
// 팀 번호 변경
export const changeTeamCode = (teamCode) => ({type: CHANGE_TEAM_CODE, payload: teamCode});

// 용병 모집 게시물 내용 변경
export const changeCollectionDescription = (collectionDescription) => ({type: CHANGE_COLLECTION_DESCRIPTION,payload: collectionDescription });

// 용병 모집 시간 변경
export const changeCollectionTime = (collectionTime) => ({type: CHANGE_COLLECTION_TIME,payload: collectionTime});

// 팀원 모집 현 멤버수 변경
export const changeCurrentMember = (currentMember) => ({type: CHANGE_CURRENT_MEMBER, payload: currentMember});

// 팀원 모집 총 멤버수 변경
export const changeTotalMember = (totalMember) => ({type: CHANGE_TOTAL_MEMBER,payload: totalMember });

// 팀 명 변경
export const changeTeamName = (teamName) => ({type: CHANGE_TEAM_NAME,payload: teamName });

// 팀 이미지 변경
export const changeTeamImg = (teamImg) => ({type: CHANGE_TEAM_IMG,payload:  teamImg });

// 팀 도시 변경
export const changeTeamCity = (teamCity) => ({type: CHANGE_TEAM_CITY,payload: teamCity });

// 팀 구 변경
export const changeTeamLoc = (teamLoc) => ({type: CHANGE_TEAM_LOC,payload:  teamLoc });

// 팀 성별 변경
export const changeTeamGender = ( teamGender) => ({type: CHANGE_TEAM_GENDER,payload: teamGender });

// 게시물 조회수 변경
export const changeViewCount = ( viewCount) => ({type: CHANGE_VIEW_COUNT,payload: viewCount });

// 팀 모집 완료 상태 변경
export const changeActiveStatus = (activeStatus) => ({type: CHANGE_ACTIVE_STATUS, payload: activeStatus});

// 게시물 작성 날짜 변경
export const changeWrittenDate = ( writtenDate) => ({type: CHANGE_WRITTEN_DATE,payload:  writtenDate });

// 팀 사이즈 변경
export const changeTeamSize = (teamSize) => ({type: CHANGE_TEAM_SIZE,payload: teamSize });

// 경기장 변경
export const changeStadium = (stadiumId) => ({type: CHANGE_STADIUM,payload:  stadiumId });

// 상태 초기화
export const resetState = () => ({type: RESET_STATE});