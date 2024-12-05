import {
    CHANGE_STADIUM_ID,
    CHANGE_STADIUM_NAME,
    CHANGE_STADIUM_IMG,
    CHANGE_STADIUM_ADDRESS,
    CHANGE_STADIUM_DESCRIPTION,
    CHANGE_STADIUM_Y,
    CHANGE_STADIUM_X,
    CHANGE_STADIUM_COST,
    CHANGE_STADIUM_V_MIN,
    CHANGE_STADIUM_V_MAX,
    UPDATE_ALL_FIELDS,
    RESET_STATE
} from "./action";

export const initialState = {
}

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_STADIUM_ID:
            return { ...state, stadiumId: action.payload };
        case CHANGE_STADIUM_NAME:
            return { ...state, stadiumName: action.payload };
        case CHANGE_STADIUM_IMG:
            return { ...state, stadiumImg: action.payload };
        case CHANGE_STADIUM_ADDRESS:
            return { ...state, stadiumAddress: action.payload };
        case CHANGE_STADIUM_DESCRIPTION:
            return { ...state, stadiumDescription: action.payload };
        case CHANGE_STADIUM_X:
            return { ...state, stadiumX: action.payload };
        case CHANGE_STADIUM_Y:
            return { ...state, stadiumY: action.payload };
        case CHANGE_STADIUM_COST:
            return { ...state, stadiumCost: action.payload };
        case CHANGE_STADIUM_V_MIN:
            return { ...state, stadiumVmin: action.payload };
        case CHANGE_STADIUM_V_MAX:
            return { ...state, stadiumVmax: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}