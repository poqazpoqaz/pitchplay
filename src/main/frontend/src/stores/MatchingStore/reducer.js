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

export const initialState = [
    {
        matchingNum: 100001, 
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
        matchingNum: 100002,  
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
        matchingNum: 100003, 
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
        matchingNum: 100004,  
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
        matchingNum: 100005,  
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
        matchingNum: 100006,  
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
];

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_MATCHING_NUMBER: {
            const { matchingNum } = action.payload;
            return { ...state, matchingNumber: matchingNum };
        }

        case CHANGE_TEAM_NAME: {
            const { matchingNum, teamId, teamName } = action.payload;
            return state.map((data, index) =>
                index === matchingNum // 매칭 번호 확인
                    ? {
                        ...data,
                        teams: {
                            ...data.teams,
                            [teamId]: { ...data.teams[teamId], name: teamName }
                        }
                    }
                    : data
            );
        }

        case CHANGE_TEAM_IMG: {
            const { matchingNum, teamId, teamImg } = action.payload;
            return state.map((data, index) =>
                index === matchingNum
                    ? {
                        ...data,
                        teams: {
                            ...data.teams,
                            [teamId]: { ...data.teams[teamId], src: teamImg }
                        }
                    }
                    : data
            );
        }

        case CHANGE_MATCHING_DATE: {
            const { matchingNum, matchingDate } = action.payload;
            return state.map((data, index) =>
                index === matchingNum ? { ...data, date: matchingDate } : data
            );
        }

        case CHANGE_MATCHING_LOC: {
            const { matchingNum, matchingLoc } = action.payload;
            return state.map((data, index) =>
                index === matchingNum ? { ...data, location: matchingLoc } : data
            );
        }

        case CHANGE_TEAM_GENDER: {
            const { matchingNum, teamGender } = action.payload;
            return state.map((data, index) =>
                index === matchingNum ? { ...data, gender: teamGender } : data
            );
        }

        case CHANGE_TEAM_LEVEL: {
            const { matchingNum, teamLevel } = action.payload;
            return state.map((data, index) =>
                index === matchingNum ? { ...data, level: teamLevel } : data
            );
        }

        case CHANGE_VIEW_COUNT: {
            const { matchingNum, viewCount } = action.payload;
            return state.map((data, index) =>
                index === matchingNum ? { ...data, views: viewCount } : data
            );
        }

        case CHANGE_WRITTEN_DATE: {
            const { matchingNum, writtenDate } = action.payload;
            return state.map((data, index) =>
                index === matchingNum ? { ...data, writtenDate: writtenDate } : data
            );
        }

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
};