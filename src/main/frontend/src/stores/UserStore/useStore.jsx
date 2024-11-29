import { useReducer } from "react";
import { initialState, reducer } from "./reducer.js";
import {
    changeUserNumber,
    changeName,
    changeProfileImg,
    changeBirthday,
    changeEmail,
    changePhone,
    changeId,
    changeNickname,
    changePassword,
    changeFavoriteCity,
    changeUserCash,
    changeFavoriteTime,
    changeMyTeam,
    changeMyDescription,
    resetState
} from "./action.js";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 유저번호
        changeUserNumber: (userNumber) => dispatch(changeUserNumber(userNumber)),
        // 프로필 이름 
        changeName: (name) => dispatch(changeName(name)),
        //프로필 이미지
        changeProfileImg: (profileImg) => dispatch(changeProfileImg(profileImg)),
        //생일
        changeBirthday: (birthday) => dispatch(changeBirthday(birthday)),
        //이메일
        changeEmail: (email) => dispatch(changeEmail(email)),
        //핸드폰
        changePhone: (phone) => dispatch(changePhone(phone)),
        //아이디
        changeId: (id) => dispatch(changeId(id)),
        //별명
        changeNickname: (nickname) => dispatch(changeNickname(nickname)),
        //비밀번호
        changePassword: (password) => dispatch(changePassword(password)),
        //선호하는 지역 
        changeFavoriteCity: (favoriteCity) => dispatch(changeFavoriteCity(favoriteCity)),
        //선호하는 시간대
        changeFavoriteTime: (favoriteTime) => dispatch(changeFavoriteTime(favoriteTime)),
        //팀 변경
        changeMyTeam: (myTeam) => dispatch(changeMyTeam(myTeam)),
        //나의 소개
        changeMyDescription: (myDescription) => dispatch(changeMyDescription(myDescription)),
        //유저 캐시
        changeUserCash: (userCash) => dispatch(changeUserCash(userCash)),
        //초기화
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
}