import Footer from "../../containers/Footer/Footer";
import Header from "../../containers/header/Header";
import styles from "./Main.module.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "../../containers/Login/Login"
import Register from "../../containers/Register/Register"
import MainSection from "../../components/MainSection/MainSection";
import Post from "../Post/Post"
import TeamCollections from "../../containers/TeamCollections/TeamCollections";


const examples = [
  {
    "src": "/imgs/1.jpg",
    "title": "KOSMO 팀원모집asdasdasdasdasdasdaadasdasdasdasdadsasadasdasdasasdasdasdsdasd",
    "location": "경기도 안양시",
    "currentMembers": "2",
    "totalMembers": "23",
    "gender": "남자",
    "views": "207",
    "date": "2023-11-20"
  },
  {
    "src": "/imgs/2.jpg",
    "title": "123123123 팀원모집",
    "location": "서울특별시",
    "currentMembers": "23",
    "totalMembers": "23",
    "gender": "여자",
    "views": "220",
    "date": "2023-11-18"
  },
  {
    "src": "/imgs/3.jpg",
    "title": "새로운 팀 모집",
    "location": "부산광역시",
    "currentMembers": "15",
    "totalMembers": "20",
    "gender": "남자",
    "views": "150",
    "date": "2023-11-15"
  },
  {
    "src": "/imgs/4.jpg",
    "title": "프로젝트 팀원 모집",
    "location": "대구광역시",
    "currentMembers": "10",
    "totalMembers": "15",
    "gender": "여자",
    "views": "320",
    "date": "2023-11-10"
  },
  {
    "src": "/imgs/5.jpg",
    "title": "코딩 팀원 모집",
    "location": "인천광역시",
    "currentMembers": "7",
    "totalMembers": "10",
    "gender": "남자",
    "views": "100",
    "date": "2023-11-08"
  },
  {
    "src": "/imgs/6.jpg",
    "title": "디자인 팀원 모집",
    "location": "광주광역시",
    "currentMembers": "5",
    "totalMembers": "7",
    "gender": "여자",
    "views": "50",
    "date": "2023-11-05"
  },
  {
    "src": "/imgs/7.jpg",
    "title": "스터디 그룹 모집",
    "location": "대전광역시",
    "currentMembers": "12",
    "totalMembers": "12",
    "gender": "남자",
    "views": "180",
    "date": "2023-11-03"
  },
  {
    "src": "/imgs/8.jpg",
    "title": "연구개발 팀원 모집",
    "location": "경기도 성남시",
    "currentMembers": "4",
    "totalMembers": "10",
    "gender": "여자",
    "views": "90",
    "date": "2023-11-01"
  },
  {
    "src": "/imgs/9.jpg",
    "title": "기술 지원 팀원 모집",
    "location": "울산광역시",
    "currentMembers": "6",
    "totalMembers": "8",
    "gender": "남자",
    "views": "75",
    "date": "2023-10-30"
  },
  {
    "src": "/imgs/10.jpg",
    "title": "웹 개발 팀 모집",
    "location": "제주특별자치도",
    "currentMembers": "3",
    "totalMembers": "5",
    "gender": "여자",
    "views": "60",
    "date": "2023-10-28"
  }
];



const router = createBrowserRouter([
  { path: "/", element: <MainSection gridArea={"section"} /> },
  { path: "/login", element: <Login gridArea={"section"} /> },
  { path: "/register", element: <Register gridArea={"section"} /> },
  {
    path: "/team", element: <Post gridArea={"section"} />,
    children: [
      { path: "", element: <TeamCollections contents={examples}/> },
      { path: "member", element: <TeamCollections contents={examples}/>}
    ]
  }
]);

function Main() {
  return (
    <div className={styles['main-grid']}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default Main;