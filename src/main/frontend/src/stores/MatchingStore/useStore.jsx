import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeMatchingNumber,
    changeTeamName,
    changeTeamImg,
    changeMatchingDate,
    changeMatchingLoc,
    changeTeamGender,
    changeTeamLevel,
    changeViewCount,
    changeWrittenDate,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 매칭 번호 변경 메서드
        changeMatchingNumber: (matchingNum) =>
            dispatch(changeMatchingNumber(matchingNum)),
        
        // 팀 이름 변경 메서드 (팀1, 팀2)
        changeTeamName: (matchingNum, teamId, teamName) =>
            dispatch(changeTeamName(matchingNum, teamId, teamName)),

        // 팀 이미지 변경 메서드 (팀1, 팀2)
        changeTeamImg: (matchingNum, teamId, teamImg) =>
            dispatch(changeTeamImg(matchingNum, teamId, teamImg)),

        // 매칭 날짜 변경 메서드
        changeMatchingDate: (matchingNum, matchingDate) =>
            dispatch(changeMatchingDate(matchingNum, matchingDate)),

        // 매칭 장소 변경 메서드
        changeMatchingLoc: (matchingNum, matchingLoc) =>
            dispatch(changeMatchingLoc(matchingNum, matchingLoc)),

        // 팀 구성성별 변경 메서드
        changeTeamGender: (matchingNum, teamGender) =>
            dispatch(changeTeamGender(matchingNum, teamGender)),

        // 팀 레벨 변경 메서드
        changeTeamLevel: (matchingNum, teamLevel) =>
            dispatch(changeTeamLevel(matchingNum, teamLevel)),

        // 게시물 조회수 변경 메서드
        changeViewCount: (matchingNum, viewCount) =>
            dispatch(changeViewCount(matchingNum, viewCount)),

        // 게시물 작성날짜 변경 메서드
        changeWrittenDate: (matchingNum, writtenDate) =>
            dispatch(changeWrittenDate(matchingNum, writtenDate)),

        // 팀 매칭 state 초기화 메서드
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};