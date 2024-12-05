import {
    CHANGE_SOCIAL_NUMBER,
    CHANGE_USER_ID,
    CHANGE_STADIUM_ID,
    CHANGE_SOCIAL_GENDER,
    CHANGE_SOCIAL_SIZE,
    CHANGE_SOCIAL_LEVEL,
    CHANGE_SOCIAL_TIME,
    CHANGE_WRITTEN_DATE,
    CHANGE_VIEW_COUNT,
    CHANGE_ACTIVE_STATUS,
    CHANGE_CURRENT_MEMBER,
    CHANGE_TOTAL_MEMBER,
    UPDATE_ALL_FIELDS,
    RESET_STATE
} from "./action";

export const initialState = {
};

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_SOCIAL_NUMBER:
            return { ...state, socialNumber: action.payload };
        case CHANGE_USER_ID:
            return { ...state, userId: action.payload };
        case CHANGE_STADIUM_ID:
            return { ...state, stadiumId: action.payload };
        case CHANGE_SOCIAL_GENDER:
            return { ...state, socialGender: action.payload };
        case CHANGE_SOCIAL_SIZE:
            return { ...state, socialSize: action.payload };
        case CHANGE_SOCIAL_LEVEL:
            return { ...state, socialLevel: action.payload };
        case CHANGE_SOCIAL_TIME:
            return { ...state, socialTime: action.payload };
        case CHANGE_WRITTEN_DATE:
            return { ...state, writtenDate: action.payload };
        case CHANGE_VIEW_COUNT:
            return { ...state, viewCount: action.payload };
        case CHANGE_ACTIVE_STATUS:
            return { ...state, activeStatus: action.payload };
        case CHANGE_CURRENT_MEMBER:
            return { ...state, currentMember: action.payload };
        case CHANGE_TOTAL_MEMBER:
            return { ...state, totalMember: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
};