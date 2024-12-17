import {
    CHANGE_TEAM_NAME,
    CHANGE_TEAM_CODE,
    CHANGE_TEAM_IMG,
    CHANGE_TEAM_DESCRIPTION,
    CHANGE_TEAM_LEVEL,
    CHANGE_TEAM_DAY,
    CHANGE_TEAM_TIME,
    CHANGE_TEAM_CITY,
    CHANGE_TEAM_LOC,
    CHANGE_TEAM_AGE,
    CHANGE_TEAM_GENDER,
    CHANGE_CURRENT_MEMBER,
    CHANGE_TOTAL_MEMBER,
    CHANGE_TEAM_MEMBER,
    CHANGE_COLLECTION_TITLE,
    UPDATE_ALL_FIELDS,
    CHANGE_PENDINGMEMBERS,
    RESET_STATE

} from "./action";

// 초기값 설정
export const initialState = {
    teamName: "", // 팀 이름 (빈 문자열로 초기화)
    teamCode: "", // 팀 코드 (빈 문자열로 초기화)
    teamImg: null, // 팀 이미지 (null로 초기화)
    teamDescription: "", // 팀 설명 (빈 문자열로 초기화)
    teamLevel: [], // 팀 레벨 (빈 배열로 초기화)
    teamDay: [], // 팀 활동 요일 (빈 배열로 초기화)
    teamTime: [], // 팀 활동 시간대 (빈 배열로 초기화)
    teamCity: "", // 팀 도시 (빈 문자열로 초기화)
    teamLoc: "", // 팀 위치 (빈 문자열로 초기화)
    teamAge: [], // 팀 연령대 (빈 배열로 초기화)
    teamGender: [], // 팀 성별 (빈 배열로 초기화)
    currentMember: 0, // 현재 멤버 수 (0으로 초기화)
    totalMember: 0, // 전체 멤버 수 (0으로 초기화)
    collectionTitle: "", // 컬렉션 제목 (빈 문자열로 초기화)
    teamMember: [], // 팀 멤버 (빈 배열로 초기화)
    pendingMembers: [], // 대기 중인 멤버 (빈 배열로 초기화
}

// state와 action을 매개변수로 받음
export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TEAM_NAME:
            return { ...state, teamName: action.payload };
        case CHANGE_TEAM_CODE:
            return { ...state, teamCode: action.payload };
        case CHANGE_TEAM_IMG:
            return { ...state, teamImg: action.payload };
        case CHANGE_TEAM_DESCRIPTION:
            return { ...state, teamDescription: action.payload };
        case CHANGE_TEAM_LEVEL:
            return { ...state, teamLevel: action.payload };
        case CHANGE_TEAM_DAY:
            return { ...state, teamDay: action.payload };
        case CHANGE_TEAM_TIME:
            return { ...state, teamTime: action.payload };
        case CHANGE_TEAM_CITY:
            return { ...state, teamCity: action.payload };
        case CHANGE_TEAM_LOC:
            return { ...state, teamLoc: action.payload };
        case CHANGE_TEAM_AGE:
            return { ...state, teamAge: action.payload };
        case CHANGE_TEAM_GENDER:
            return { ...state, teamGender: action.payload };
        case CHANGE_CURRENT_MEMBER:
            return { ...state, currentMember: action.payload };
        case CHANGE_TOTAL_MEMBER:
            return { ...state, totalMember: action.payload };
        case CHANGE_COLLECTION_TITLE:
            return { ...state, collectionTitle: action.payload };
        case CHANGE_TEAM_MEMBER:
            return { ...state, teamMember: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };
        case CHANGE_PENDINGMEMBERS:
            return { ...state, ...action.payload};
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

