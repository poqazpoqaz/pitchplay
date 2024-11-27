import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeTeamNumber,
    changeCollectionTitle,
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
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        //팀 번호 변경 메서드
        changeTeamNumber: (teamNumber) => dispatch(changeTeamNumber(teamNumber)),
        //팀원 모집 게시물 제목 변경 메서드
        changeCollectionTitle: (collectionTitle) => dispatch(changeCollectionTitle(collectionTitle)),
        //용병 모집시에 시간 변경 메서드
        changeCollectionTime : (collectionTime) => dispatch(changeCollectionTime(collectionTime)),
        //팀원 모집 현 멤버수 변경 메서드
        changeCurrentMember: (currentMember) => dispatch(changeCurrentMember(currentMember)),
        //팀원 모집 총 멤버수 변경 메서드
        changeTotalMember: (totalMember) => dispatch(changeTotalMember(totalMember)),
        //팀 명 변경 메서드
        changeTeamName: (teamName) => dispatch(changeTeamName(teamName)),
        //팀 이미지 변경 메서드
        changeTeamImg: (teamImg) => dispatch(changeTeamImg(teamImg)),
        //팀 도시 변경 메서드
        changeTeamCity: (teamCity) => dispatch(changeTeamCity(teamCity)),
        //팀 구 변경 메서드 
        changeTeamLoc: (teamLoc) => dispatch(changeTeamLoc(teamLoc)),
        //팀 구성인원 변경 메서드
        changeTeamGender: (teamGender) => dispatch(changeTeamGender(teamGender)),
        //게시물 조회수 변경 메서드
        changeViewCount: (viewCount) => dispatch(changeViewCount(viewCount)),
        //팀 모집 완료 상태 변경 메서드
        changeActiveStatus: (activeStatus) => dispatch(changeActiveStatus(activeStatus)),
        // 게시물 작성날짜 변경메서드
        changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
        // 팀 사이즈 변경 메서드
        changeTeamSize: (teamSize) => dispatch(changeTeamSize(teamSize)),
        //상태 초기화 메서드
        resetState: () => dispatch(resetState())
    };

    return { state, actions };

}