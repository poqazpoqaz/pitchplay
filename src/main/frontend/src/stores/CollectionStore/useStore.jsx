import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeCollectionNumber,
    changeTeamCode,
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
    updateAllFields,
    changeMercenary,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        //모집글 번호
        changeCollectionNumber: (collectionNumber) => dispatch(changeCollectionNumber(collectionNumber)),
        // 팀 번호 변경 메서드
        changeTeamCode: (teamCode) => dispatch(changeTeamCode(teamCode)),
        // 용병 모집 게시물 내용 변경 메서드
        changeCollectionDescription: (collectionDescription) => dispatch(changeCollectionDescription(collectionDescription)),
        // 용병 모집 시간 변경 메서드
        changeCollectionTime: (collectionTime) => dispatch(changeCollectionTime(collectionTime)),
        // 팀원 모집 현 멤버수 변경 메서드
        changeCurrentMember: (currentMember) => dispatch(changeCurrentMember(currentMember)),
        // 팀원 모집 총 멤버수 변경 메서드
        changeTotalMember: (totalMember) => dispatch(changeTotalMember(totalMember)),
        // 팀 명 변경 메서드
        changeTeamName: (teamName) => dispatch(changeTeamName(teamName)),
        // 팀 이미지 변경 메서드
        changeTeamImg: (teamImg) => dispatch(changeTeamImg(teamImg)),
        // 팀 도시 변경 메서드
        changeTeamCity: (teamCity) => dispatch(changeTeamCity(teamCity)),
        // 팀 구 변경 메서드
        changeTeamLoc: (teamLoc) => dispatch(changeTeamLoc(teamLoc)),
        // 팀 성별 변경 메서드
        changeTeamGender: (teamGender) => dispatch(changeTeamGender(teamGender)),
        // 게시물 조회수 변경 메서드
        changeViewCount: (viewCount) => dispatch(changeViewCount(viewCount)),
        // 팀 모집 완료 상태 변경 메서드
        changeActiveStatus: (activeStatus) => dispatch(changeActiveStatus(activeStatus)),
        // 게시물 작성 날짜 변경 메서드
        changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
        // 팀 사이즈 변경 메서드
        changeTeamSize: (teamSize) => dispatch(changeTeamSize(teamSize)),
        // 경기장 변경 메서드
        changeStadium: (stadiumId) => dispatch(changeStadium(stadiumId)),
        // 용병 관리 메서드
        changeMercenary: (mercenaryMembers) => dispatch(changeMercenary(mercenaryMembers)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        // 상태 초기화 메서드
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};