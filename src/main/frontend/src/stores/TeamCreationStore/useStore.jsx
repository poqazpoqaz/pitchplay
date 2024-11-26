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
    changeTeamGender
} from "./action";

export const useStore = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        changeTeamName: (teamName) => dispatch(changeTeamName(teamName)),
        changeTeamCode: (teamCode) => dispatch(changeTeamCode(teamCode)),
        changeTeamImg: (teamImg) => dispatch(changeTeamImg(teamImg)),
        changeTeamDescription: (teamDescription) => dispatch(changeTeamDescription(teamDescription)),
        changeTeamLevel: (teamLevel) => dispatch(changeTeamLevel(teamLevel)),
        changeTeamDay: (teamDay) => dispatch(changeTeamDay(teamDay)),
        changeTeamTime: (teamTime) => dispatch(changeTeamTime(teamTime)),
        changeTeamCity: (teamCity) => dispatch(changeTeamCity(teamCity)),
        changeTeamLoc: (teamLoc) => dispatch(changeTeamLoc(teamLoc)),
        changeTeamAge: (teamAge) => dispatch(changeTeamAge(teamAge)),
        changeTeamGender: (teamGender) => dispatch(changeTeamGender(teamGender))
    };

    return { state, actions };
}