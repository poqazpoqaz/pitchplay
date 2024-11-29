import {
    CHANGE_MATCHING_NUMBER,
    CHANGE_TEAM_NAME,
    CHANGE_TEAM_IMG,
    CHANGE_MATCHING_DATE,
    CHANGE_MATCHING_LOC,
    CHANGE_TEAM_GENDER,
    CHANGE_TEAM_LEVEL,
    CHANGE_VIEW_COUNT,
    CHANGE_WRITTEN_DATE,
    RESET_STATE
} from './action';

export const initialState = {
    matchingNum: "",
    teams: {
        team1: { name: "", src: "" },
        team2: { name: "", src: "" },
    },
    date: "",
    location: "",
    gender: "",
    level: "",
    views: "",
    writtenDate: ""
};

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_MATCHING_NUMBER:
            return { ...state, matchingNum: action.payload };

        case CHANGE_TEAM_NAME: {
            const { teamId, teamName } = action.payload;
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [teamId]: { ...state.teams[teamId], name: teamName }
                }
            };
        }

        case CHANGE_TEAM_IMG: {
            const { teamId, teamImg } = action.payload;
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [teamId]: { ...state.teams[teamId], src: teamImg }
                }
            };
        }

        case CHANGE_MATCHING_DATE:
            return { ...state, date: action.payload };

        case CHANGE_MATCHING_LOC:
            return { ...state, location: action.payload };

        case CHANGE_TEAM_GENDER:
            return { ...state, gender: action.payload };

        case CHANGE_TEAM_LEVEL:
            return { ...state, level: action.payload };

        case CHANGE_VIEW_COUNT:
            return { ...state, views: action.payload };

        case CHANGE_WRITTEN_DATE:
            return { ...state, writtenDate: action.payload };

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
};