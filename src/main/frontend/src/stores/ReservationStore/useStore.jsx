import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeReservationDate,
    changeStadium,
    changeStadiumAddress,
    changeStadiumImg,
    changeStadiumPrice,
    reserState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 예약 날짜 변경 메서드
        changeReservationDate: (reservationDate) => dispatch(changeReservationDate(reservationDate)),

        // 예약 구장 이름 변경 메서드
        changeStadium: (stadium) => dispatch(changeStadium(stadium)),

        // 예약 구장 주소 변경 메서드
        changeStadiumAddress: (stadiumAddress) => dispatch(changeStadiumAddress(stadiumAddress)),
        
        // 예약 구장 사진 변경 메서드
        changeStadiumImg: (stadiumImg) => dispatch(changeStadiumImg(stadiumImg)),
        
        // 예약 구장 가격 변경 메서드
        changeStadiumPrice: (stadiumPrice) => dispatch(changeStadiumPrice(stadiumPrice)),

        //상태 초기화 메서드
        reserState: () => dispatch(reserState())
    }

    return { state, actions };
}