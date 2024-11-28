// reducer.js
import {
    SET_PROFILE_DATA,
    CHANGE_PROFILE_IMAGE,
    TOGGLE_EDIT_MODE,
    UPDATE_FORM_DATA
} from './action';

// 초기 상태 설정
export const initialState = {
    name: "",
    nickname: "",
    city: "",
    loc: "",
    time: "",
    team: "",
    intro: "",
    profileImage: "",
    isEditable: false,
};

// 리듀서 함수
export const reducer = (state, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return { ...state, ...action.payload };
        case CHANGE_PROFILE_IMAGE:
            return { ...state, profileImage: action.payload };
        case TOGGLE_EDIT_MODE:
            return { ...state, isEditable: !state.isEditable };
        case UPDATE_FORM_DATA:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return state;
    }
};
