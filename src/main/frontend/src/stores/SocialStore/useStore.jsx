import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeSocialNumber,
    changeUserId,
    changeStadiumId,
    changeSocialGender,
    changeSocialSize,
    changeSocialLevel,
    changeSocialTime,
    changeWrittenDate,
    changeViewCount,
    changeActiveStatus,
    changeCurrentMember,
    changeTotalMember,
    updateAllFields,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 소셜매칭번호
        changeSocialNumber: (socialNumber) => dispatch(changeSocialNumber(socialNumber)),
        // 사용자 번호
        changeUserId: (userId) => dispatch(changeUserId(userId)),
        // 경기장 ID
        changeStadiumId: (stadiumId) => dispatch(changeStadiumId(stadiumId)),
        // 성별
        changeSocialGender: (socialGender) => dispatch(changeSocialGender(socialGender)),
        // 인원 수
        changeSocialSize: (socialSize) => dispatch(changeSocialSize(socialSize)),
        // 레벨
        changeSocialLevel: (socialLevel) => dispatch(changeSocialLevel(socialLevel)),
        // 경기 시간
        changeSocialTime: (socialTime) => dispatch(changeSocialTime(socialTime)),
        // 작성 날짜
        changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
        // 조회수
        changeViewCount: (viewCount) => dispatch(changeViewCount(viewCount)),
        // 활성화 상태
        changeActiveStatus: (activeStatus) => dispatch(changeActiveStatus(activeStatus)),
        // 현재 인원
        changeCurrentMember: (currentMember) => dispatch(changeCurrentMember(currentMember)),
        // 총 인원
        changeTotalMember: (totalMember) => dispatch(changeTotalMember(totalMember)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        // 상태 리셋
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};