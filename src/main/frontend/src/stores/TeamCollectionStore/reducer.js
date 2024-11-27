import {
    CHANGE_TEAM_NUMBER,
    CHANGE_COLLECTION_TITLE,
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
    RESET_STATE
} from "./action";

export const initialState = [
    {
        teamNumber: "123123",
        collectionTitle: "KOSMO 팀원모집합니다. 많은 참여부탁드려요.",
        currentMember: "20",
        totalMember: "20",
        teamName: "KOSMO팀",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "도봉구",
        teamGender: "남자",
        viewCount: "100",
        writtenDate: "2024-11-01",
        activeStatus: "true"
    },
    {
        teamNumber: "123124",
        collectionTitle: "서울 지역 풋살 팀원 모집합니다. 많은 관심 부탁드립니다.",
        currentMember: "5",
        totalMember: "10",
        teamName: "서울파이터",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "강남구",
        teamGender: "여자",
        viewCount: "150",
        writtenDate: "2024-12-15",
        activeStatus: "false"
    },
    {
        teamNumber: "123125",
        collectionTitle: "믹스팀으로 풋살을 즐길 멤버 모집합니다!",
        currentMember: "3",
        totalMember: "10",
        teamName: "혼합팀",
        teamImg: "/imgs/1.jpg",
        teamCity: "부산",
        teamLoc: "서면",
        teamGender: "혼성",
        viewCount: "120",
        writtenDate: "2024-11-15",
        activeStatus: "false"
    },
    {
        teamNumber: "123126",
        collectionTitle: "풋살을 좋아하는 사람들 모여요! 경험자 우대!",
        currentMember: "8",
        totalMember: "15",
        teamName: "부산베어스",
        teamImg: "/imgs/1.jpg",
        teamCity: "부산",
        teamLoc: "해운대구",
        teamGender: "남자",
        viewCount: "200",
        writtenDate: "2024-12-20",
        activeStatus: "false"
    },
    {
        teamNumber: "123127",
        collectionTitle: "전국 각지 풋살팀에서 멤버를 모집합니다!",
        currentMember: "5",
        totalMember: "5",
        teamName: "레드윙스",
        teamImg: "/imgs/1.jpg",
        teamCity: "대전",
        teamLoc: "유성구",
        teamGender: "여자",
        viewCount: "80",
        writtenDate: "2024-12-23",
        activeStatus: "true"
    },
    {
        teamNumber: "123128",
        collectionTitle: "풋살과 축구를 사랑하는 사람들이 모인 팀입니다.",
        currentMember: "6",
        totalMember: "12",
        teamName: "스트라이커스",
        teamImg: "/imgs/1.jpg",
        teamCity: "광주",
        teamLoc: "서구",
        teamGender: "혼성",
        viewCount: "95",
        writtenDate: "2024-12-25",
        activeStatus: "false"
    },
    {
        teamNumber: "123129",
        collectionTitle: "즐겁게 풋살하며 팀워크를 쌓고 싶습니다.",
        currentMember: "10",
        totalMember: "10",
        teamName: "블루웨이브",
        teamImg: "/imgs/1.jpg",
        teamCity: "인천",
        teamLoc: "남구",
        teamGender: "남자",
        viewCount: "110",
        writtenDate: "2024-12-23",
        activeStatus: "true"
    },
    {
        teamNumber: "123130",
        collectionTitle: "풋살을 배우고 싶은 초보자 환영합니다!",
        currentMember: "10",
        totalMember: "10",
        teamName: "뉴비팀",
        teamImg: "/imgs/1.jpg",
        teamCity: "울산",
        teamLoc: "동구",
        teamGender: "혼성",
        viewCount: "90",
        writtenDate: "2024-12-01",
        activeStatus: "true"
    },
    {
        teamNumber: "123131",
        collectionTitle: "서울 지역 여성 풋살 팀원 모집합니다.",
        currentMember: "7",
        totalMember: "10",
        teamName: "서울걸스",
        teamImg: "/imgs/1.jpg",
        teamCity: "서울",
        teamLoc: "홍대",
        teamGender: "여자",
        viewCount: "160",
        writtenDate: "2024-12-23",
        activeStatus: "false"
    },
    {
        teamNumber: "123132",
        collectionTitle: "경기 지역 남성 풋살 팀원 모집 중입니다.",
        currentMember: "2",
        totalMember: "10",
        teamName: "경기드래곤즈",
        teamImg: "/imgs/1.jpg",
        teamCity: "경기",
        teamLoc: "수원",
        teamGender: "남자",
        viewCount: "50",
        writtenDate: "2024-11-31",
        activeStatus: "false"
    }
];


export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TEAM_NUMBER:
            return state.map(data => ({ ...data, teamNumber: action.payload }));
        case CHANGE_COLLECTION_TITLE:
            return state.map(data => ({ ...data, collectionTitle: action.payload }));
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
        case CHANGE_WRITTEN_DATE:
            return state.map(data => ({ ...data, writtenDate: action.payload }));
        case CHANGE_ACTIVE_STATUS:
            return state.map(data => ({ ...data, activeStatus: action.payload }));
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
};