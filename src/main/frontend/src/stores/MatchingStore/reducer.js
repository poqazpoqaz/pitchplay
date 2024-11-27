import {
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

export const initialState = [
    {
        teams: {
            team1: { name: "Team Alpha", src: "/imgs/1.jpg" },
            team2: { name: "Team Bravo", src: "/imgs/1.jpg" },
        },
        date: "2024-11-25",
        location: "수원 HK 풋살파크",
        gender: "Mixed",
        level: "Intermediate",
        views: "120",
        writtenDate: "2024-11-01"
    },
    {
        teams: {
            team1: { name: "Red Dragons", src: "/imgs/1.jpg" },
            team2: { name: "null", src: "null" }
        },
        date: "2024-12-01",
        location: "Busan, South Korea",
        gender: "Male",
        level: "Advanced",
        views: "200",
        writtenDate: "2024-12-15"
    },
    {
        teams: {
            team1: { name: "Team Alpha", src: "/imgs/1.jpg" },
            team2: { name: "Team Bravo", src: "/imgs/1.jpg" },
        },
        date: "2024-11-25",
        location: "수원 HK 풋살파크",
        gender: "Mixed",
        level: "Intermediate",
        views: "120",
        writtenDate: "2024-11-15"
    },
    {
        teams: {
            team1: { name: "Red Dragons", src: "/imgs/1.jpg" },
            team2: { name: "null", src: "null" }
        },
        date: "2024-11-01",
        location: "Busan, South Korea",
        gender: "Male",
        level: "Advanced",
        views: "200",
        writtenDate: "2024-12-20"
    },
    {
        teams: {
            team1: { name: "Team Alpha", src: "/imgs/1.jpg" },
            team2: { name: "Team Bravo", src: "/imgs/1.jpg" },
        },
        date: "2024-11-25",
        location: "수원 HK 풋살파크",
        gender: "Mixed",
        level: "Intermediate",
        views: "120",
        writtenDate: "2024-12-23"
    },
    {
        teams: {
            team1: { name: "Red Dragons", src: "/imgs/1.jpg" },
            team2: { name: "null", src: "null" }
        },
        date: "2024-11-10",
        location: "Busan, South Korea",
        gender: "Male",
        level: "Advanced",
        views: "200",
        writtenDate: "2024-12-25"
    }
]


export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TEAM_NAME:
            const { teamId, teamName } = action.payload;
            return state.map(data => {
                const updatedTeams = { ...data.teams };
                if (updatedTeams[teamId]) {
                    updatedTeams[teamId].name = teamName;
                }
                return { ...data, teams: updatedTeams };
            });

        case CHANGE_TEAM_IMG:
            const { teamId: imgTeamId, teamImg } = action.payload;
            return state.map(data => {
                const updatedTeams = { ...data.teams };
                if (updatedTeams[imgTeamId]) {
                    updatedTeams[imgTeamId].src = teamImg;
                }
                return { ...data, teams: updatedTeams };
            });

        case CHANGE_MATCHING_DATE:
            return state.map(data => ({ ...data, date: action.payload }));

        case CHANGE_MATCHING_LOC:
            return state.map(data => ({ ...data, location: action.payload }));

        case CHANGE_TEAM_GENDER:
            return state.map(data => ({ ...data, gender: action.payload }));

        case CHANGE_TEAM_LEVEL:
            return state.map(data => ({ ...data, level: action.payload }));

        case CHANGE_VIEW_COUNT:
            return state.map(data => ({ ...data, views: action.payload }));

        case CHANGE_WRITTEN_DATE:
            return state.map(data => ({ ...data, writtenDate: action.payload }));

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
};