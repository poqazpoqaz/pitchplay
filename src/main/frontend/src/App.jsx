import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import MainSection from "./pages/MainSection/MainSection";
import Post from "../src/pages/Post/Post"
import TeamCollections from "./pages/TeamCollections/TeamCollections";
import TeamMatchings from "./pages/TeamMatchings/TeamMatchings";
import ReservationPage from "../src/pages/Reservation/ReservationPage";
import GuestRecruitment from "./pages/GuestRecruitment/GuestRecruitment";
import TeamCreation from "../src/pages/TeamCreation/TeamCreation";
import TeamApplication from "./pages/TeamApplication/TeamApplication";
import { createBrowserRouter, Outlet, Router, RouterProvider } from 'react-router-dom';



const teamCollectionsData = [
  {
    "src": "/imgs/1.jpg",
    "title": "KOSMO 팀원모집asdasdasdasdasdasdaadasdasdasdasdadsasadasdasdasasdasdasdsdasd",
    "location": "경기도 안양시",
    "currentMembers": "2",
    "totalMembers": "23",
    "gender": "남자",
    "views": "207",
    "date": "2023-11-20",
    "stadium": "안산 스타디움",
    "teamDay": ["금요일", "토요일"],
    "level": "Intermediate",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "123123123 팀원모집",
    "location": "서울특별시",
    "currentMembers": "23",
    "totalMembers": "23",
    "gender": "여자",
    "views": "220",
    "date": "2023-11-18",
    "stadium": "안산 스타디움",
    "teamDay": ["월요일", "수요일"],
    "level": "비기너",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "새로운 팀 모집",
    "location": "부산광역시",
    "currentMembers": "15",
    "totalMembers": "20",
    "gender": "남자",
    "views": "150",
    "date": "2023-11-15",
    "stadium": "안산 스타디움",
    "teamDay": ["금요일", "토요일", "일요일"],
    "level": "비기너",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "프로젝트 팀원 모집",
    "location": "대구광역시",
    "currentMembers": "10",
    "totalMembers": "15",
    "gender": "여자",
    "views": "320",
    "date": "2023-11-10",
    "stadium": "안산 스타디움",
    "teamDay": ["금요일", "토요일", "일요일"],
    "level": "아마추어",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "코딩 팀원 모집",
    "location": "인천광역시",
    "currentMembers": "7",
    "totalMembers": "10",
    "gender": "남자",
    "views": "100",
    "date": "2023-11-08",
    "stadium": "안산 스타디움",
    "teamDay": ["월요일", "수요일"],
    "level": "중급",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "디자인 팀원 모집",
    "location": "광주광역시",
    "currentMembers": "5",
    "totalMembers": "7",
    "gender": "여자",
    "views": "50",
    "date": "2023-11-05",
    "stadium": "안산 스타디움",
    "teamDay": ["월요일", "수요일"],
    "level": "비기너",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "스터디 그룹 모집",
    "location": "대전광역시",
    "currentMembers": "12",
    "totalMembers": "12",
    "gender": "남자",
    "views": "180",
    "date": "2023-11-03",
    "stadium": "안산 스타디움",
    "teamDay": ["금요일", "토요일", "일요일"],
    "level": "아마추어",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "연구개발 팀원 모집",
    "location": "경기도 성남시",
    "currentMembers": "4",
    "totalMembers": "10",
    "gender": "여자",
    "views": "90",
    "date": "2023-11-01",
    "stadium": "안산 스타디움",
    "teamDay": ["금요일", "토요일", "일요일"],
    "level": "선수",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  },
  {
    "src": "/imgs/1.jpg",
    "title": "기술 지원 팀원 모집",
    "location": "울산광역시",
    "currentMembers": "6",
    "totalMembers": "8",
    "gender": "남자",
    "views": "75",
    "date": "2023-10-30",
    "stadium": "안산 스타디움",
    "teamDay": ["월요일", "수요일", "일요일"],
    "level": "아마추어",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!격주로 주말에 모이며 실력 관계없이 매너 게임.."
  },
  {
    "src": "/imgs/1.jpg",
    "title": "웹 개발 팀 모집",
    "location": "제주특별자치도",
    "currentMembers": "3",
    "totalMembers": "5",
    "gender": "여자",
    "views": "60",
    "date": "2023-10-28",
    "stadium": "안산 스타디움",
    "teamDay": ["토요일", "일요일"],
    "level": "아마추어",
    "teamDescription" : "안녕하세요. 여기는 kosmo 팀입니다. 함께 즐거운 경기 할 사람을 구합니다!!!!!!"
  }
];
const teamMatchingData = [
  {
    team1: "Team Alpha",
    team1src: "/imgs/1.jpg",
    team2: "Team Bravo",
    team2src: "/imgs/team.jpg",
    date: "2024-11-25",
    location: "수원 HK 풋살파크",
    gender: "Mixed",
    level: "Intermediate",
    views: "120",
  },
  {
    team1: "Red Dragons",
    team1src: "/imgs/1.jpg",
    team2: "Blue Phoenix",
    team2src: "/imgs/team.jpg",
    date: "2024-12-01",
    location: "Busan, South Korea",
    gender: "Male",
    level: "Advanced",
    views: "200",
  },
  {
    team1: "Golden Tigers",
    team1src: "/imgs/1.jpg",
    team2: null, // 팀이 아직 미정
    team2src: null,
    date: "2024-12-05",
    location: "가산디지털운동장",
    gender: "Female",
    level: "Beginner",
    views: "85",
  },
  {
    team1: "Silver Wolves",
    team1src: "/imgs/1.jpg",
    team2: "Black Panthers",
    team2src: "/imgs/team.jpg",
    date: "2024-12-10",
    location: "Daegu, South Korea",
    gender: "Mixed",
    level: "Advanced",
    views: "310",
  },
  {
    team1: "Green Arrows",
    team1src: "/imgs/1.jpg",
    team2: null,
    team2src: null,
    date: "2024-12-15",
    location: "Jeju, South Korea",
    gender: "Male",
    level: "Intermediate",
    views: "50",
  },
  {
    team1: "Black Eagles",
    team1src: "/imgs/1.jpg",
    team2: "Red Foxes",
    team2src: "/imgs/team.jpg",
    date: "2024-12-20",
    location: "Incheon, South Korea",
    gender: "Female",
    level: "Intermediate",
    views: "145",
  },
  {
    team1: "Purple Dragons",
    team1src: "/imgs/1.jpg",
    team2: "Golden Wolves",
    team2src: "/imgs/team.jpg",
    date: "2024-12-25",
    location: "Seoul, South Korea",
    gender: "Mixed",
    level: "Advanced",
    views: "230",
  },
  {
    team1: "Blue Tigers",
    team1src: "/imgs/1.jpg",
    team2: null,
    team2src: null,
    date: "2025-01-05",
    location: "Busan, South Korea",
    gender: "Male",
    level: "Beginner",
    views: "90",
  },
  {
    team1: "White Wolves",
    team1src: "/imgs/1.jpg",
    team2: "Red Lions",
    team2src: "/imgs/team.jpg",
    date: "2025-01-10",
    location: "Daegu, South Korea",
    gender: "Mixed",
    level: "Intermediate",
    views: "180",
  },
  {
    team1: "Yellow Sparks",
    team1src: "/imgs/1.jpg",
    team2: null,
    team2src: null,
    date: "2025-01-15",
    location: "Gwangju, South Korea",
    gender: "Female",
    level: "Advanced",
    views: "75",
  },
];


const recruitmentData = [
  {
    "date": "2024-11-25T20:00:00",
    "location": "서울 올림픽 공원",
    "currentMembers": 5,
    "totalMembers": 10,
    "team": "A팀",
    "gender": "남성",
    "teamSize": "5v5",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-11-26T20:00:00",
    "location": "부산 해운대",
    "currentMembers": 3,
    "totalMembers": 7,
    "team": "B팀",
    "gender": "여성",
    "teamSize": "5v5",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-11-27T20:00:00",
    "location": "대구 수성못",
    "currentMembers": 4,
    "totalMembers": 6,
    "team": "C팀",
    "gender": "남성",
    "teamSize": "3v3",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-11-28T20:00:00",
    "location": "광주 전남대학교",
    "currentMembers": 2,
    "totalMembers": 6,
    "team": "D팀",
    "gender": "여성",
    "teamSize": "3v3",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-11-29T20:00:00",
    "location": "인천 송도",
    "currentMembers": 6,
    "totalMembers": 10,
    "team": "E팀",
    "gender": "남성",
    "teamSize": "5v5",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-11-30T20:00:00",
    "location": "서울 한강공원",
    "currentMembers": 7,
    "totalMembers": 7,
    "team": "F팀",
    "gender": "여성",
    "teamSize": "7v7",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-12-01T20:00:00",
    "location": "경기도 파주",
    "currentMembers": 8,
    "totalMembers": 10,
    "team": "G팀",
    "gender": "남성",
    "teamSize": "5v5",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-12-02T20:00:00",
    "location": "대전 유성구",
    "currentMembers": 3,
    "totalMembers": 6,
    "team": "H팀",
    "gender": "여성",
    "teamSize": "3v3",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-12-03T20:00:00",
    "location": "울산 문수축구장",
    "currentMembers": 4,
    "totalMembers": 8,
    "team": "I팀",
    "gender": "남성",
    "teamSize": "5v5",
    "src": "/public/imgs/1.jpg"
  },
  {
    "date": "2024-12-04T20:00:00",
    "location": "강원도 원주",
    "currentMembers": 5,
    "totalMembers": 9,
    "team": "J팀",
    "gender": "여성",
    "teamSize": "5v5",
    "src": "/public/imgs/1.jpg"
  }];


const router = createBrowserRouter([
  {
    path: "/", element: <Main/>,
    children: [
      { path : "/", element: <MainSection gridArea={"section"}/>},
      { path: "/login", element: <Login gridArea={"section"} /> },
      { path: "/register", element: <Register gridArea={"section"} /> },
      {
        path: "/team", element: <Post gridArea={"section"} />,
        children: [
          { path: "", element: <TeamMatchings contents={teamMatchingData} /> },
          { path: "member", element: <TeamCollections contents={teamCollectionsData} /> },
          { path: "guestplayer", element: <GuestRecruitment contents={recruitmentData} /> },
          { path: "creation", element: <TeamCreation isOpen={true} /> },
          { path: "application", element: <TeamApplication contents={teamCollectionsData} /> }
        ]
      },
      {
        path: "/reservation", element: <ReservationPage gridArea={"section"} />
      }
    ]
  },
]);


function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;