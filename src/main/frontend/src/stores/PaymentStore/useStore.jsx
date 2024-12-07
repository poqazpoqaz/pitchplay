import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeOrderId,
    changePaymentDate,
    changeAmount,
    changePaymentMethod,
    changePaymentStatus,
    changeUserId,
    changeReservationNumber,
    updateAllFields,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // Order ID 변경
        changeOrderId: (orderId) => dispatch(changeOrderId(orderId)),
        
        // Payment Date 변경
        changePaymentDate: (paymentDate) => dispatch(changePaymentDate(paymentDate)),
        
        // Amount 변경
        changeAmount: (amount) => dispatch(changeAmount(amount)),
        
        // Payment Method 변경
        changePaymentMethod: (paymentMethod) => dispatch(changePaymentMethod(paymentMethod)),
        
        // Payment Status 변경
        changePaymentStatus: (paymentStatus) => dispatch(changePaymentStatus(paymentStatus)),
        
        // User ID 변경
        changeUserId: (userId) => dispatch(changeUserId(userId)),
        
        // Reservation Number 변경
        changeReservationNumber: (reservationNumber) => dispatch(changeReservationNumber(reservationNumber)),
        
        // 모든 필드 업데이트
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        
        // 상태 리셋
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};