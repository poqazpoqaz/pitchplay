export const CHANGE_COLLECTION_NUMBER = "CHANGE_COLLECTION_NUMBER";
export const CHANGE_RESERVATION_NUMBER = "CHANGE_RESERVATION_NUMBER";
export const CHANGE_RESERVATION_DATE = "CHANGE_RESERVATION_DATE";
export const CHANGE_STADIUM_ID = "CHANGE_STADIUM_ID";
export const CHANGE_TEAM_CODE = "CHANGE_TEAM_CODE";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";

export const changeCollectionNumber = (collectionNumber) => ({ type: CHANGE_COLLECTION_NUMBER, payload: collectionNumber })
export const changeReservationNumber = (reservationNumber) => ({ type: CHANGE_RESERVATION_NUMBER, payload: reservationNumber });
export const changeReservationDate = (reservationDate) => ({ type: CHANGE_RESERVATION_DATE, payload: reservationDate });
export const changeStadiumId = (stadiumId) => ({ type: CHANGE_STADIUM_ID, payload: stadiumId });
export const changeTeamCode = (teamCode) => ({ type: CHANGE_TEAM_CODE, payload: teamCode });
export const updateAllFields = (fields) => ({type: UPDATE_ALL_FIELDS, payload: fields});
export const reserState = () => ({ type: RESET_STATE });