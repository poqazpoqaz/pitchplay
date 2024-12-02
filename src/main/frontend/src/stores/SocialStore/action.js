export const CHANGE_SOCIAL_NUMBER = "CHANGE_SOCIAL_NUMBER";
export const CHANGE_USER_ID = "CHANGE_USER_ID";
export const CHANGE_STADIUM_ID = "CHANGE_STADIUM_ID";
export const CHANGE_SOCIAL_GENDER = "CHANGE_SOCIAL_GENDER";
export const CHANGE_SOCIAL_SIZE = "CHANGE_SOCIAL_SIZE";
export const CHANGE_SOCIAL_LEVEL = "CHANGE_SOCIAL_LEVEL";
export const CHANGE_SOCIAL_TIME = "CHANGE_SOCIAL_TIME";
export const CHANGE_WRITTEN_DATE = "CHANGE_WRITTEN_DATE";
export const CHANGE_VIEW_COUNT = "CHANGE_VIEW_COUNT";
export const CHANGE_ACTIVE_STATUS = "CHANGE_ACTIVE_STATUS";
export const CHANGE_CURRENT_MEMBER = "CHANGE_CURRENT_MEMBER";
export const CHANGE_TOTAL_MEMBER = "CHANGE_TOTAL_MEMBER";
export const RESET_STATE = "RESET_STATE";

export const changeSocialNumber = (socialNumber) => ({
    type: CHANGE_SOCIAL_NUMBER,
    payload: socialNumber
});

export const changeUserId = (userId) => ({
    type: CHANGE_USER_ID,
    payload: userId
});

export const changeStadiumId = (stadiumId) => ({
    type: CHANGE_STADIUM_ID,
    payload: stadiumId
});

export const changeSocialGender = (socialGender) => ({
    type: CHANGE_SOCIAL_GENDER,
    payload: socialGender
});

export const changeSocialSize = (socialSize) => ({
    type: CHANGE_SOCIAL_SIZE,
    payload: socialSize
});

export const changeSocialLevel = (socialLevel) => ({
    type: CHANGE_SOCIAL_LEVEL,
    payload: socialLevel
});

export const changeSocialTime = (socialTime) => ({
    type: CHANGE_SOCIAL_TIME,
    payload: socialTime
});

export const changeWrittenDate = (writtenDate) => ({
    type: CHANGE_WRITTEN_DATE,
    payload: writtenDate
});

export const changeViewCount = (viewCount) => ({
    type: CHANGE_VIEW_COUNT,
    payload: viewCount
});

export const changeActiveStatus = (activeStatus) => ({
    type: CHANGE_ACTIVE_STATUS,
    payload: activeStatus
});

export const changeCurrentMember = (currentMember) => ({
    type: CHANGE_CURRENT_MEMBER,
    payload: currentMember
});

export const changeTotalMember = (totalMember) => ({
    type: CHANGE_TOTAL_MEMBER,
    payload: totalMember
});

export const resetState = () => ({ type: RESET_STATE });