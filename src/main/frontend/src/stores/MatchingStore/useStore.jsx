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
    changeStadiumId,
    changeTeamSize,
    updateAllFields,
    changeMatchingType,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 매칭 번호 변경 메서드
        changeMatchingNumber: (matchingNum) => dispatch(changeMatchingNumber(matchingNum)),
        // 팀 이름 변경 메서드 (팀1, 팀2)
        changeTeamName: (teamId, teamName) => dispatch(changeTeamName(teamId, teamName)),
        // 팀 이미지 변경 메서드 (팀1, 팀2)
        changeTeamImg: (teamId, teamImg) => dispatch(changeTeamImg(teamId, teamImg)),
        // 매칭 날짜 변경 메서드
        changeMatchingDate: (matchingDate) => dispatch(changeMatchingDate(matchingDate)),
        // 매칭 구장 이름 변경메서드
        changeMatchingLoc: (matchingLoc) => dispatch(changeMatchingLoc(matchingLoc)),
        // 매칭 구장 ID 변경메서드
        changeStadiumId: (stadiumId) => dispatch(changeStadiumId(stadiumId)),
        // 팀 구성성별 변경 메서드
        changeTeamGender: (teamGender) => dispatch(changeTeamGender(teamGender)),
        // 팀 레벨 변경 메서드
        changeTeamLevel: (teamLevel) => dispatch(changeTeamLevel(teamLevel)),
        // 게시물 조회수 변경 메서드
        changeViewCount: (viewCount) => dispatch(changeViewCount(viewCount)),
        // 게시물 작성날짜 변경 메서드
        changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
        // 매칭 인원 변경 메서드
        changeTeamSize: (teamSize) => dispatch(changeTeamSize(teamSize)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        //매칭 종류
        changeMatchingType : (matchingType) => dispatch(changeMatchingType(matchingType)),
        // 팀 매칭 state 초기화 메서드
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};