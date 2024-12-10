export const CHANGE_LOCATION = "CHANGE_LOCATION";
export const CHANGE_GENDAR = "CHANGE_GENDAR";
export const CHANGE_TEAMSIZE = "CHANGE_TEAMSIZE";
export const CHANGE_MATCHINGDATE = "CHANGE_MATCHINGDATE";
export const RESET_STATE = "RESET_STATE";

export const changeLocation = (location) => ({type:CHANGE_LOCATION , payload :location });
export const changeGendar = (gendar) => ({type:CHANGE_LOCATION, payload:gendar });
export const changeTeamsize = (teamSize) => ({type:CHANGE_TEAMSIZE,payload:teamSize});
export const changeMatchingDate = (matchingDate) => ({type:CHANGE_MATCHINGDATE, payload : matchingDate});
export const resetState = () => ({ type: RESET_STATE });