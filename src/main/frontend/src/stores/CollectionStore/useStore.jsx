import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeTeamNumber,
    changeCollectionDescription,
    changeCollectionTime,
    changeCurrentMember,
    changeTotalMember,
    changeTeamName,
    changeTeamImg,
    changeTeamCity,
    changeTeamLoc,
    changeTeamGender,
    changeViewCount,
    changeActiveStatus,
    changeWrittenDate,
    changeTeamSize,
    changeStadium,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 팀 번호 변경 메서드
        changeTeamNumber: (teamNumber, newTeamNumber) => dispatch(changeTeamNumber(teamNumber, newTeamNumber)),
        // 용병 모집 게시물 내용 변경 메서드
        changeCollectionDescription: (teamNumber, collectionDescription) => dispatch(changeCollectionDescription(teamNumber, collectionDescription)),
        // 용병 모집 시간 변경 메서드
        changeCollectionTime: (teamNumber, collectionTime) => dispatch(changeCollectionTime(teamNumber, collectionTime)),
        // 팀원 모집 현 멤버수 변경 메서드
        changeCurrentMember: (teamNumber, currentMember) => dispatch(changeCurrentMember(teamNumber, currentMember)),
        // 팀원 모집 총 멤버수 변경 메서드
        changeTotalMember: (teamNumber, totalMember) => dispatch(changeTotalMember(teamNumber, totalMember)),
        // 팀 명 변경 메서드
        changeTeamName: (teamNumber, teamName) => dispatch(changeTeamName(teamNumber, teamName)),
        // 팀 이미지 변경 메서드
        changeTeamImg: (teamNumber, teamImg) => dispatch(changeTeamImg(teamNumber, teamImg)),
        // 팀 도시 변경 메서드
        changeTeamCity: (teamNumber, teamCity) => dispatch(changeTeamCity(teamNumber, teamCity)),
        // 팀 구 변경 메서드
        changeTeamLoc: (teamNumber, teamLoc) => dispatch(changeTeamLoc(teamNumber, teamLoc)),
        // 팀 성별 변경 메서드
        changeTeamGender: (teamNumber, teamGender) => dispatch(changeTeamGender(teamNumber, teamGender)),
        // 게시물 조회수 변경 메서드
        changeViewCount: (teamNumber, viewCount) => dispatch(changeViewCount(teamNumber, viewCount)),
        // 팀 모집 완료 상태 변경 메서드
        changeActiveStatus: (teamNumber, activeStatus) => dispatch(changeActiveStatus(teamNumber, activeStatus)),
        // 게시물 작성 날짜 변경 메서드
        changeWrittenDate: (teamNumber, writtenDate) => dispatch(changeWrittenDate(teamNumber, writtenDate)),
        // 팀 사이즈 변경 메서드
        changeTeamSize: (teamNumber, teamSize) => dispatch(changeTeamSize(teamNumber, teamSize)),
        // 경기장 변경 메서드
        changeStadium: (teamNumber, stadium) => dispatch(changeStadium(teamNumber, stadium)),
        // 상태 초기화 메서드
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};