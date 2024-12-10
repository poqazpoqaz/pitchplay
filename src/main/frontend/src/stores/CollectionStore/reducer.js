import {
    CHANGE_COLLECTION_NUMBER,
    CHANGE_TEAM_CODE,
    CHANGE_COLLECTION_DESCRIPTION,
    CHANGE_COLLECTION_TIME,
    CHANGE_CURRENT_MEMBER,
    CHANGE_TOTAL_MEMBER,
    CHANGE_TEAM_NAME,
    CHANGE_TEAM_IMG,
    CHANGE_TEAM_CITY,
    CHANGE_TEAM_LOC,
    CHANGE_TEAM_GENDER,
    CHANGE_VIEW_COUNT,
    CHANGE_ACTIVE_STATUS,
    CHANGE_WRITTEN_DATE,
    CHANGE_TEAM_SIZE,
    CHANGE_STADIUM,
    UPDATE_ALL_FIELDS,
    CHANGE_MERCENARY,
    RESET_STATE
} from "./action";

export const initialState =
{
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_COLLECTION_NUMBER:
            return { ...state, collectionNumber: action.payload };
        case CHANGE_TEAM_CODE:
            return { ...state, teamCode: action.payload };
        case CHANGE_COLLECTION_DESCRIPTION:
            return { ...state, collectionDescription: action.payload };
        case CHANGE_COLLECTION_TIME:
            return { ...state, collectionTime: action.payload };
        case CHANGE_CURRENT_MEMBER:
            return { ...state, currentMember: action.payload };
        case CHANGE_TOTAL_MEMBER:
            return { ...state, totalMember: action.payload };
        case CHANGE_TEAM_NAME:
            return { ...state, teamName: action.payload };
        case CHANGE_TEAM_IMG:
            return { ...state, teamImg: action.payload };
        case CHANGE_TEAM_CITY:
            return { ...state, teamCity: action.payload };
        case CHANGE_TEAM_LOC:
            return { ...state, teamLoc: action.payload };
        case CHANGE_TEAM_GENDER:
            return { ...state, teamGender: action.payload };
        case CHANGE_VIEW_COUNT:
            return { ...state, viewCount: action.payload };
        case CHANGE_ACTIVE_STATUS:
            return { ...state, activeStatus: action.payload };
        case CHANGE_WRITTEN_DATE:
            return { ...state, writtenDate: action.payload };
        case CHANGE_TEAM_SIZE:
            return { ...state, teamSize: action.payload };
        case CHANGE_STADIUM:
            return { ...state, stadiumId: action.payload };
        case CHANGE_MERCENARY:
            return {...state, ...action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
};