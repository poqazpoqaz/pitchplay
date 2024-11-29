export const CHANGE_STADIUM_ID = "CHANGE_STADIUM_ID";
export const CHANGE_STADIUM_NAME = "CHANGE_STADIUM_NAME";
export const CHANGE_STADIUM_IMG = "CHANGE_STADIUM_IMG";
export const CHANGE_STADIUM_ADDRESS = "CHANGE_STADIUM_ADDRESS";
export const CHANGE_STADIUM_DESCRIPTION = "CHANGE_STADIUM_DESCRIPTION";
export const CHANGE_STADIUM_Y = "CHANGE_STADIUM_Y";
export const CHANGE_STADIUM_X = "CHANGE_STADIUM_X";
export const CHANGE_STADIUM_COST = "CHANGE_STADIUM_COST";
export const CHANGE_STADIUM_V_MIN = "CHANGE_STADIUM_V_MIN";
export const CHANGE_STADIUM_V_MAX = "CHANGE_STADIUM_V_MAX";
export const RESET_STATE = "RESET_STATE";

export const changeStadiumId = (stadiumId) => ({type: CHANGE_STADIUM_ID, payload: stadiumId});
export const changeStadiumName = (stadiumName) => ({type: CHANGE_STADIUM_NAME, payload: stadiumName});
export const changeStadiumImg = (stadiumImg) => ({type: CHANGE_STADIUM_IMG, payload: stadiumImg});
export const changeStadiumAddress = (stadiumAddress) => ({type: CHANGE_STADIUM_ADDRESS, payload: stadiumAddress});
export const changeStadiumDescription = (stadiumDescription) => ({type: CHANGE_STADIUM_DESCRIPTION, payload: stadiumDescription});
export const changeStadiumX = (stadiumX) => ({type: CHANGE_STADIUM_X, payload: stadiumX});
export const changeStadiumY = (stadiumY) => ({type: CHANGE_STADIUM_Y, payload: stadiumY});
export const changeStadiumCost = (stadiumCost) => ({type: CHANGE_STADIUM_COST, payload: stadiumCost});
export const changeStadiumVmin = (stadiumVmin) => ({type: CHANGE_STADIUM_V_MIN, payload: stadiumVmin});
export const changeStadiumVmax = (stadiumVmax) => ({type: CHANGE_STADIUM_V_MAX, payload: stadiumVmax});
export const resetState = () => ({ type: RESET_STATE });