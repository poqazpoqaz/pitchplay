import {
    CHANGE_ORDER_ID,
    CHANGE_PAYMENT_DATE,
    CHANGE_AMOUNT,
    CHANGE_PAYMENT_METHOD,
    CHANGE_PAYMENT_STATUS,
    CHANGE_USER_ID,
    CHANGE_RESERVATION_NUMBER,
    CHANGE_REFUND_ID,
    CHANGE_REFUND_STATUS,
    CHANGE_REFUND_DATE,
    UPDATE_ALL_FIELDS,
    RESET_STATE
} from "./action";

export const initialState = {};

export const reducer = (state, action) => {
    switch(action.type) {
        case CHANGE_ORDER_ID:
            return { ...state, orderId: action.payload };
        
        case CHANGE_PAYMENT_DATE:
            return { ...state, paymentDate: action.payload };
        
        case CHANGE_AMOUNT:
            return { ...state, amount: action.payload };
        
        case CHANGE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        
        case CHANGE_PAYMENT_STATUS:
            return { ...state, paymentStatus: action.payload };
        
        case CHANGE_USER_ID:
            return { ...state, userId: action.payload };
        
        case CHANGE_RESERVATION_NUMBER:
            return { ...state, reservationNumber: action.payload };

        case CHANGE_REFUND_ID:
            return {...state, refundId: action.payload };
        
        case CHANGE_REFUND_STATUS:
            return {...state, refundStatus: action.payload };

        case CHANGE_REFUND_DATE:
            return {...state, refundDate: action.payload};
        
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload }; 
         
        case RESET_STATE:
            return initialState; 
            
        default:
            return state;
    }
};