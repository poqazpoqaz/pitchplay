import {
    CHANGE_COLLECTION_NUMBER,
    CHANGE_RESERVATION_NUMBER,
    CHANGE_RESERVATION_DATE,
    CHANGE_STADIUM_ID,
    CHANGE_TEAM_CODE,
    UPDATE_ALL_FIELDS,
    RESET_STATE
} from "./action";

export const initialState = {
}

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TEAM_CODE:
            return { ...state, teamCode: action.payload };
        case CHANGE_COLLECTION_NUMBER:
            return { ...state, collectionNumber: action.payload };
        case CHANGE_RESERVATION_NUMBER:
            return { ...state, reservationNumber: action.payload };
        case CHANGE_RESERVATION_DATE:
            return { ...state, reservationDate: action.payload };
        case CHANGE_STADIUM_ID:
            return { ...state, stadiumId: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}