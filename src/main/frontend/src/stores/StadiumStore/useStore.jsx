import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeStadiumId,
    changeStadiumName,
    changeStadiumImg,
    changeStadiumAddress,
    changeStadiumDescription,
    changeStadiumX,
    changeStadiumY,
    changeStadiumCost,
    changeStadiumVmin,
    changeStadiumVmax,
    updateAllFields,
    resetState
} from "./action";


export const useStore = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 경기장ID
        changeStadiumId: (stadiumId) => dispatch(changeStadiumId(stadiumId)),
        // 경기장 이름
        changeStadiumName: (stadiumName) => dispatch(changeStadiumName(stadiumName)),
        // 경기장 이미지
        changeStadiumImg: (stadiumImg) => dispatch(changeStadiumImg(stadiumImg)),
        //경기장주소
        changeStadiumAddress: (stadiumAddress) => dispatch(changeStadiumAddress(stadiumAddress)),
        //경기장소개
        changeStadiumDescription: (stadiumDescription) => dispatch(changeStadiumDescription(stadiumDescription)),
        //경기장 위도 경도 
        changeStadiumX: (stadiumX) => dispatch(changeStadiumX(stadiumX)),
        changeStadiumY: (stadiumY) => dispatch(changeStadiumY(stadiumY)),
        //경기장 가격
        changeStadiumCost: (stadiumCost) => dispatch(changeStadiumCost(stadiumCost)),
        //경기장 오픈시간
        changeStadiumVmin: (stadiumVmin) => dispatch(changeStadiumVmin(stadiumVmin)),
        //경기장 클로즈시간
        changeStadiumVmax: (stadiumVmax) => dispatch(changeStadiumVmax(stadiumVmax)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        // state초기화
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
}