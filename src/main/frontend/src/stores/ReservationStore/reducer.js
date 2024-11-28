import {
    CHANGE_RESERVATION_DATE,
    CHANGE_STADIUM,
    CHANGE_STADIUM_ADDRESS,
    CHANGE_STADIUM_IMG,
    CHANGE_STADIUM_PRICE,
    RESET_STATE
} from "./action";

export const initialState = {
    reservationDate: "2024-11-25T20:00:00",
    stadium: "마포 난지천 인조잔디축구장",
    stadiumAddress: "서울특별시 금천구 가산디지털2로 151(가산동 459-18)",
    stadiumImg: "/public/imgs/1.jpg",
    stadiumPrice: "2000"
}

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_RESERVATION_DATE:
            return { ...state, reservationDate: action.payload };
        case CHANGE_STADIUM:
            return { ...state, stadium: action.payload };
        case CHANGE_STADIUM_ADDRESS:
            return { ...state, stadiumAddress: action.payload };
        case CHANGE_STADIUM_IMG:
            return { ...state, stadiumImg: action.payload};
        case CHANGE_STADIUM_PRICE:
            return { ...state, stadiumPrice: action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}