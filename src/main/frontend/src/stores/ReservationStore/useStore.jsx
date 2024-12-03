import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeCollectionNumber,
    changeReservationNumber,
    changeReservationDate,
    changeStadiumId,
    changeTeamCode,
    updateAllFields,
    reserState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        //모집글 번호
        changeCollectionNumber: (collectionNumber) => dispatch(changeCollectionNumber(collectionNumber)),
        // 예약번호 변경 메서드
        changeReservationNumber: (reservationNumber) => dispatch(changeReservationNumber(reservationNumber)),
        // 예약 날짜 변경 메서드
        changeReservationDate: (reservationDate) => dispatch(changeReservationDate(reservationDate)),
        // 예약 구장 이름 변경 메서드 
        changeStadiumId: (stadiumId) => dispatch(changeStadiumId(stadiumId)),
        //팀 코드 변경 메서드(예약한 팀 코드) 
        changeTeamCode: (teamCode) => dispatch(changeTeamCode(teamCode)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        //상태 초기화 메서드
        reserState: () => dispatch(reserState())
    }

    return { state, actions };
}