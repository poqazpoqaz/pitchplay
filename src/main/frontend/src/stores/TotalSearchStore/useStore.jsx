import { useReducer } from "react";
import { initialState, reducer } from "./reducer.js";
import {
    changeLocation,
    changeGendar,
    changeTeamsize,
    changeMatchingDate,
    resetState
} from "./action.js";

export const useStore = ()=>{
    const [state, dispatch] = useReducer(reducer , initialState);

    const actions = {
    // 지역 변경 메서드
    changeLocation : (location) => dispatch(changeLocation(location)),
    // 성별 변경 메서드
    changeGendar : (gendar) => dispatch(changeGendar(gendar)),
    // 인원 변경 메서드
    changeTeamsize : (teamSize) => dispatch(changeTeamsize(teamSize)),
    // 매칭 날짜 변경 메서드 
    changeMatchingDate : (matchingDate) => dispatch(changeMatchingDate(matchingDate)),
    // 초기화 메서드
    resetState: () => dispatch(resetState())
    };

    return {state , actions};
}