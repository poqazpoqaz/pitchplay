import {
CHANGE_LOCATION,
CHANGE_GENDAR,
CHANGE_TEAMSIZE,
CHANGE_MATCHINGDATE,
RESET_STATE
} from "./action";

export const initialState = {}

export const reducer = (state , action)=>{
    switch(action.type) {
        case CHANGE_LOCATION:
            return {...state , location:action.payload};
        case CHANGE_GENDAR:
            return {...state, gendar:action.payload};
        case CHANGE_TEAMSIZE:
            return {...state, teamSize:action.payload};
        case CHANGE_MATCHINGDATE:
            return {...state, matchingDate:action.payload};
        case RESET_STATE:
            return initialState;
        default:
            return state;    
    }
}