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
    RESET_STATE
} from "./action";

// 초기값 설정
export const initialState = {
    teamName: "",
    teamCode: "",
    teamImg: "",
    teamDescription: "",
    teamLevel: [],
    teamDay: [],
    teamTime: [],
    teamCity: "",
    teamLoc: "",
    teamAge: [],
    teamGender: "",
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
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}
