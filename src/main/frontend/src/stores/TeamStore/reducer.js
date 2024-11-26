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
    CHANGE_COLLECTION_TITLE,
    RESET_STATE
} from "./action";

// 초기값 설정
export const initialState = {
    teamName: "피치플레이",
    teamCode: "pitchplay",
    teamImg: "/public/imgs/1.jpg",
    teamDescription: "피치플레이는 피치플레이 시작때부터 만들었던 팀입니다. ",
    teamLevel: ["비기너"],
    teamDay: ["월", "목"],
    teamTime: ["6~10시"],
    teamCity: "서울",
    teamLoc: "동작구",
    teamAge: ["10대", "40대"],
    teamGender: "혼성",
    currentMember: 10,
    totalMember: 20,
    collectionTitle: "피치플레이 팀에 함께하실 분 구합니다."

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
            return { ...state, collectionTitle: action.payload};
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

