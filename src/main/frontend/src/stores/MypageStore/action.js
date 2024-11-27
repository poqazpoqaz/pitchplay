export const SET_PROFILE_DATA = "SET_PROFILE_DATA";
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";
export const TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE";
export const UPDATE_FORM_DATA = "UPDATE_FORM_DATA";


// 액션 생성자
export const setProfileData = (profileData) => ({
    type : SET_PROFILE_DATA,
    payload: profileData
});

export const changeProfileImage = (profileImage) => ({
    type: CHANGE_PROFILE_IMAGE,
    payload: profileImage
});

export const toggleEditMode = () => ({
    type: TOGGLE_EDIT_MODE
});

export const updateFormData = (name, value) => ({
    type: UPDATE_FORM_DATA,
    payload: { name, value },
});
