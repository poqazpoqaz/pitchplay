import {
    CHANGE_TEAM_NUMBER,
    CHANGE_COLLECTION_TITLE,
    CHANGE_COLLECTION_DESCRIPTION,
    CHANGE_COLLECTION_TIME,
    CHANGE_CURRENT_MEMBER,
    CHANGE_TOTAL_MEMBER,
    CHANGE_TEAM_NAME,
    CHANGE_TEAM_IMG,
    CHANGE_TEAM_CITY,
    CHANGE_TEAM_LOC,
    CHANGE_TEAM_GENDER,
    CHANGE_VIEW_COUNT,
    CHANGE_ACTIVE_STATUS,
    CHANGE_WRITTEN_DATE,
    CHANGE_TEAM_SIZE,
    CHANGE_STADIUM,
    RESET_STATE
} from "./action";

export const initialState = [
    {
        teamNumber: "123123",
        collectionTitle: "KOSMO 팀원모집합니다. 많은 참여부탁드려요.",
        collectionDescription: "10시00분 ~ 12시 00분이고, 장소는 서울 디지털운동장 A구장입니다. 회사 동호회 수준이니까 다들 걱정없이 오세요!! 회사팀이라서 땀흘리고 운동하는 것을 목적으로 하고 있습니다. 고레벨의 플레이를 원하시거나 과도한 경쟁심이 있으신분들은 정중히 사양하겠습니다",
        collectionTime: "2024-11-25T20:00:00",
        currentMember: "20",
        totalMember: "20",
        teamName: "KOSMO팀",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "도봉구",
        teamGender: "남자",
        viewCount: "100",
        activeStatus: "true",
        writtenDate: "2024-11-01",
        teamSize: "5vs5",
        stadium: "용인 어쩌구 스타디움"
    },
    {
        teamNumber: "124124",
        collectionTitle: "축구 즐기실 분 모집합니다!",
        collectionTime: "2024-12-05T18:00:00",
        currentMember: "10",
        totalMember: "20",
        teamName: "도봉FC",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "강남구",
        teamGender: "혼성",
        viewCount: "250",
        activeStatus: "false",
        writtenDate: "2024-11-05",
        teamSize: "6vs6",
        stadium: "서울 어쩌구 스타디움"
    },
    {
        teamNumber: "125125",
        collectionTitle: "풋살팀 레드불에서 새로운 멤버를 찾습니다!",
        collectionTime: "2024-12-15T15:30:00",
        currentMember: "8",
        totalMember: "10",
        teamName: "레드불FC",
        teamImg: "/imgs/1.jpg",
        teamCity: "부산",
        teamLoc: "해운대구",
        teamGender: "여자",
        viewCount: "80",
        activeStatus: "false",
        writtenDate: "2024-11-10",
        teamSize: "4vs4",
        stadium: "경기도 어쩌구 스타디움"
    },
    {
        teamNumber: "126126",
        collectionTitle: "풋살 함께 하실 분 구합니다.",
        collectionTime: "2024-11-30T09:00:00",
        currentMember: "15",
        totalMember: "15",
        teamName: "광주 풋살클럽",
        teamImg: "/imgs/1.jpg",
        teamCity: "광주",
        teamLoc: "북구",
        teamGender: "남자",
        viewCount: "120",
        activeStatus: "true",
        writtenDate: "2024-11-12",
        teamSize: "5vs5",
        stadium: "인천 어쩌구 스타디움"
    },
    {
        teamNumber: "127127",
        collectionTitle: "아마추어 축구팀 모집합니다!",
        collectionTime: "2024-11-29T14:00:00",
        currentMember: "12",
        totalMember: "15",
        teamName: "사커드림",
        teamImg: "/imgs/1.jpg",
        teamCity: "대전",
        teamLoc: "중구",
        teamGender: "혼성",
        viewCount: "95",
        activeStatus: "false",
        writtenDate: "2024-11-15",
        teamSize: "7vs7",
        stadium: "도봉구 어쩌구 스타디움"
    },
    {
        teamNumber: "128128",
        collectionTitle: "축구 즐기실 초보분 환영합니다.",
        collectionTime: "2024-12-01T10:00:00",
        currentMember: "5",
        totalMember: "10",
        teamName: "초보FC",
        teamImg: "/imgs/1.jpg",
        teamCity: "인천",
        teamLoc: "남동구",
        teamGender: "혼성",
        viewCount: "50",
        activeStatus: "false",
        writtenDate: "2024-11-20",
        teamSize: "5vs5",
        stadium: "몰라 어쩌구 스타디움"
    },
    {
        teamNumber: "129129",
        collectionTitle: "풋살 클럽에서 새로운 동료를 기다립니다!",
        collectionTime: "2024-12-10T19:00:00",
        currentMember: "7",
        totalMember: "12",
        teamName: "드림풋살",
        teamImg: "/imgs/1.jpg",
        teamCity: "대구",
        teamLoc: "수성구",
        teamGender: "남자",
        viewCount: "180",
        activeStatus: "false",
        writtenDate: "2024-11-25",
        teamSize: "6vs6",
        stadium: "용인 어쩌구 스타디움"
    },
    {
        teamNumber: "130130",
        collectionTitle: "여성 축구 클럽에서 멤버 모집합니다.",
        collectionTime: "2024-12-20T16:00:00",
        currentMember: "18",
        totalMember: "20",
        teamName: "여성FC",
        teamImg: "/imgs/1.jpg",
        teamCity: "울산",
        teamLoc: "남구",
        teamGender: "여자",
        viewCount: "300",
        activeStatus: "false",
        writtenDate: "2024-11-30",
        teamSize: "5vs5",
        stadium: "용인 어쩌구 스타디움"
    },
    {
        teamNumber: "131131",
        collectionTitle: "서울에서 축구 함께하실 분 구합니다.",
        collectionTime: "2024-11-28T17:00:00",
        currentMember: "16",
        totalMember: "16",
        teamName: "서울FC",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "강서구",
        teamGender: "혼성",
        viewCount: "150",
        activeStatus: "true",
        writtenDate: "2024-11-18",
        teamSize: "5vs5",
        stadium: "용인 어쩌구 스타디움"
    },
    {
        teamNumber: "132132",
        collectionTitle: "초보부터 고수까지 환영합니다!",
        collectionTime: "2024-12-25T13:00:00",
        currentMember: "10",
        totalMember: "15",
        teamName: "전국풋살연합",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "노원구",
        teamGender: "혼성",
        viewCount: "220",
        activeStatus: "false",
        writtenDate: "2024-11-22",
        teamSize: "6vs6",
        stadium: "용인 어쩌구 스타디움"
    }
];


export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TEAM_NUMBER:
            return state.map(data => ({ ...data, teamNumber: action.payload }));
        case CHANGE_COLLECTION_TITLE:
            return state.map(data => ({ ...data, collectionTitle: action.payload }));
        case CHANGE_COLLECTION_DESCRIPTION:
            return state.map(data => ({ ...data, collectionDescription: action.payload }));
        case CHANGE_COLLECTION_TIME:
            return state.map(data => ({ ...data, collectionTime: action.payload }));
        case CHANGE_CURRENT_MEMBER:
            return state.map(data => ({ ...data, currentMember: action.payload }));
        case CHANGE_TOTAL_MEMBER:
            return state.map(data => ({ ...data, totalMember: action.payload }));
        case CHANGE_TEAM_NAME:
            return state.map(data => ({ ...data, teamName: action.payload }));
        case CHANGE_TEAM_IMG:
            return state.map(data => ({ ...data, teamImg: action.payload }));
        case CHANGE_TEAM_CITY:
            return state.map(data => ({ ...data, teamCity: action.payload }));
        case CHANGE_TEAM_LOC:
            return state.map(data => ({ ...data, teamLoc: action.payload }));
        case CHANGE_TEAM_GENDER:
            return state.map(data => ({ ...data, teamGender: action.payload }));
        case CHANGE_VIEW_COUNT:
            return state.map(data => ({ ...data, viewCount: action.payload }));
        case CHANGE_ACTIVE_STATUS:
            return state.map(data => ({ ...data, activeStatus: action.payload }));
        case CHANGE_WRITTEN_DATE:
            return state.map(data => ({ ...data, writtenDate: action.payload }));
        case CHANGE_TEAM_SIZE:
            return state.map(data => ({ ...data, teamSize: action.payload }));
        case CHANGE_STADIUM:
            return state.map(data => ({ ...data, stadium: action.payload }));
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
};