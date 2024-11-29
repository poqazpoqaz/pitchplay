import {
    CHANGE_USER_NUMBER,
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
    userNumber: "",
    name: "",
    profileImg: "",
    birthday: "",
    email: "",
    phone: "",
    id: "",
    nickname: "",
    password: "",
    favoriteCity: "",
    favoriteTime: "",
    myTeam: "",
    myDescription: "",
    userCash: ""
}


export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_USER_NUMBER:
            return { ...state, userNumber: action.payload };
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