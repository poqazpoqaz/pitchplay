import {
    CHANGE_ORDER_ID,
    CHANGE_PAYMENT_DATE,
    CHANGE_AMOUNT,
    CHANGE_PAYMENT_METHOD,
    CHANGE_PAYMENT_STATUS,
    CHANGE_USER_ID,
    CHANGE_RESERVATION_NUMBER,
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
        
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload }; 
         
        case RESET_STATE:
            return initialState; 
            
        default:
            return state;
    }
};