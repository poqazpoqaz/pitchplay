import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
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
        // 팀 이름 변경 메서드 (팀1, 팀2)
        changeTeamName: (teamId, teamName) => dispatch(changeTeamName(teamId, teamName)),
        // 팀 이미지 변경 메서드 (팀1, 팀2)
        changeTeamImg: (teamId, teamImg) => dispatch(changeTeamImg(teamId, teamImg)),
        // 매칭 날짜 변경 메서드
        changeMatchingDate: (matchingDate) => dispatch(changeMatchingDate(matchingDate)),
        // 매칭 장소 변경 메서드
        changeMatchingLoc: (matchingLoc) => dispatch(changeMatchingLoc(matchingLoc)),
        // 팀 구성성별 변경메서드
        changeTeamGender: (teamGender) => dispatch(changeTeamGender(teamGender)),
        // 팀 레벨 변경메서드
        changeTeamLevel: (teamLevel) => dispatch(changeTeamLevel(teamLevel)),
        // 게시물 조회수 변경메서드
        changeViewCount: (viewCount) => dispatch(changeViewCount(viewCount)),
        // 게시물 작성날짜 변경메서드
        changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
        // 팀 매칭 state 초기화 메서드
        resetState: () => dispatch(resetState())
    }

    return { state, actions };
}

