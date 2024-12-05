import { useReducer } from "react";
import { initialState, reducer } from "./reducer.js";
import {
    changeTeamName,
    changeTeamCode,
    changeTeamImg,
    changeTeamDescription,
    changeTeamLevel,
    changeTeamDay,
    changeTeamTime,
    changeTeamCity,
    changeTeamLoc,
    changeTeamAge,
    changeTeamGender,
    changeCurrentMember,
    changeTotalMember,
    changeCollectionTitle,
    changeTeamMember,
    updateAllFields,
    changePendingMembers,
    resetState
} from "./action.js";

export const useStore = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        //팀 이름 변경 메서드
        changeTeamName: (teamName) => dispatch(changeTeamName(teamName)),
        //팀 코드 변경 메서드
        changeTeamCode: (teamCode) => dispatch(changeTeamCode(teamCode)),
        // 팀 이미지 변경 메서드
        changeTeamImg: (teamImg) => dispatch(changeTeamImg(teamImg)),
        // 팀 소개 변경 메서드
        changeTeamDescription: (teamDescription) => dispatch(changeTeamDescription(teamDescription)),
        // 팀 레벨 변경 메서드
        changeTeamLevel: (teamLevel) => dispatch(changeTeamLevel(teamLevel)),
        // 팀 주요 요일 변경 메서드
        changeTeamDay: (teamDay) => dispatch(changeTeamDay(teamDay)),
        // 팀 주요 시간 변경 메서드
        changeTeamTime: (teamTime) => dispatch(changeTeamTime(teamTime)),
        // 팀 주요 도시 변경 메서드
        changeTeamCity: (teamCity) => dispatch(changeTeamCity(teamCity)),
        // 팀 주요 구 변경 메서드
        changeTeamLoc: (teamLoc) => dispatch(changeTeamLoc(teamLoc)),
        // 팀 나이대 변경 메서드
        changeTeamAge: (teamAge) => dispatch(changeTeamAge(teamAge)),
        // 팀 구성요인 변경 메서드
        changeTeamGender: (teamGender) => dispatch(changeTeamGender(teamGender)),
        // 팀 구하는 인원
        changeCurrentMember: (currentMember) => dispatch(changeCurrentMember(currentMember)),
        // 팀 토탈 인원
        changeTotalMember: (totalMember) => dispatch(changeTotalMember(totalMember)),
        // 팀 모집 제목
        changeCollectionTitle: (collectionTitle) => dispatch(changeCollectionTitle(collectionTitle)),
        // 팀원 정보 변경
        changeTeamMember: (teamMember) => dispatch(changeTeamMember(teamMember)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        // 팬딩멤버 변경
        changePendingMembers: (pendingMembers) => dispatch(changePendingMembers(pendingMembers)),
        // 팀 state 초기화 메서드
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
}