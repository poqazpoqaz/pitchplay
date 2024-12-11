export const CHANGE_ORDER_ID = "CHANGE_ORDER_ID";
export const CHANGE_PAYMENT_DATE = "CHANGE_PAYMENT_DATE";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";
export const CHANGE_PAYMENT_METHOD = "CHANGE_PAYMENT_METHOD";
export const CHANGE_PAYMENT_STATUS = "CHANGE_PAYMENT_STATUS";
export const CHANGE_USER_ID = "CHANGE_USER_ID";
export const CHANGE_RESERVATION_NUMBER = "CHANGE_RESERVATION_NUMBER";
export const CHANGE_REFUND_ID = "CHANGE_REFUND_ID";
export const CHANGE_REFUND_STATUS = "CHANGE_REFUND_STATUS";
export const CHANGE_REFUND_DATE = "CHANGE_REFUND_DATE";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";
 

export const changeOrderId = (orderId) => ({type: CHANGE_ORDER_ID, payload: orderId});
export const changePaymentDate = (paymentDate) => ({type:CHANGE_PAYMENT_DATE, paylaod: paymentDate});
export const changeAmount = (amount) => ({type: CHANGE_AMOUNT, payload: amount});
export const changePaymentMethod = (paymentMethod) => ({type: CHANGE_PAYMENT_METHOD, payload: paymentMethod});
export const changePaymentStatus = (paymentStatus) => ({type: CHANGE_PAYMENT_STATUS, payload: paymentStatus});
export const changeUserId = (userId) => ({type: CHANGE_USER_ID, paylaod: userId});
export const changeReservationNumber = (reservationNumber) => ({type: CHANGE_RESERVATION_NUMBER, payload: reservationNumber});
export const changeRefundId = (refundId) => ({type:CHANGE_REFUND_ID,paylaod:refundId });
export const changeRefundStatus = (refundStatus)=>({type:CHANGE_REFUND_STATUS, paylaod: refundStatus});
export const changeRefundDate = (refundDate)=>({type:CHANGE_REFUND_DATE, paylaod: refundDate});
export const updateAllFields = (fields) => ({type: UPDATE_ALL_FIELDS, payload: fields});
export const resetState = () => ({ type: RESET_STATE });


