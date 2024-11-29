import {
    CHANGE_NAME,
    CHANGE_PROFILE_IMG,
    CHANGE_BIRTHDAY,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_PHONE,
    CHANGE_ID,
    CHANGE_NICKNAME,
    CHANGE_FAVORITE_CITY,
    CHANGE_USER_CASH,
    CHANGE_FAVORITE_TIME,
    CHANGE_MY_TEAM,
    CHANGE_MY_DESCRIPTION,
    RESET_STATE
} from "./action";

export const initialState = {
    name: "김피치",
    profileImg: "/public/imgs/team.jpg",
    birthday: "2000-01-30",
    email: "pitch@kosmo.com",
    phone: "010-1234-5678",
    id: "pitch123",
    nickname: "피치플레이",
    password: "pitchplay",
    favoriteCity: "서울 도봉구",
    favoriteTime: "오전 시간대",
    myTeam: "피플",
    myDescription: "안녕하세요. 열심히 참석할 자신이 있는 피치플레이라고 합니다.",
    userCash: "20000"
}


export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        case CHANGE_PROFILE_IMG:
            return { ...state, profileImg: action.payload };
        case CHANGE_BIRTHDAY:
            return { ...state, birthday: action.payload };
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_PHONE:
            return { ...state, phone: action.payload };
        case CHANGE_ID:
            return { ...state, id: action.payload };
        case CHANGE_NICKNAME:
            return { ...state, nickname: action.payload };
        case CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case CHANGE_FAVORITE_CITY:
            return { ...state, favoriteCity: action.payload };
        case CHANGE_FAVORITE_TIME:
            return { ...state, favoriteTime: action.payload };
        case CHANGE_MY_TEAM:
            return { ...state, myTeam: action.payload };
        case CHANGE_MY_DESCRIPTION:
            return { ...state, myDescription: action.payload };
        case CHANGE_USER_CASH:
            return { ...state, userCash: action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}