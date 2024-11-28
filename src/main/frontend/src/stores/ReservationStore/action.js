export const CHANGE_RESERVATION_DATE = "CHANGE_RESERVATION_DATE";
export const CHANGE_STADIUM = "CHANGE_STADIUM";
export const CHANGE_STADIUM_ADDRESS = "CHANGE_STADIUM_ADDRESS";
export const CHANGE_STADIUM_PRICE = "CHANGE_STADIUM_PRICE";
export const RESET_STATE = "RESET_STATE";


export const changeReservationDate = (reservationDate) => ({ type: CHANGE_RESERVATION_DATE, payload: reservationDate });
export const changeStadium = (stadium) => ({ type: CHANGE_STADIUM, payload: stadium });
export const changeStadiumAddress = (stadiumAddress) => ({ type: CHANGE_STADIUM_ADDRESS, payload: stadiumAddress });
export const changeStadiumPrice = (staridumPrice) => ({ type: CHANGE_STADIUM_PRICE, payload: staridumPrice });
export const reserState = () => ({ type: RESET_STATE });