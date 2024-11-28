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
import MyPage from "./pages/Mypage/Mypage1/Mypage";
import Mypage1 from "./pages/Mypage/Mypage1/Mypage1";
import MypageAct from "./pages/Mypage/MypageAct/MypageAct";
import GuestRecruitmentDetail from "./pages/GuestRecruitmentDetail/GuestRecruitmentDetail";
import GuestRecruitmentCreation from "./pages/GuestRecruitmentCreation/GuestRecruitmentCreation";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MypageAct01 from "./pages/Mypage/MypageAct/MypageAct01/MypageAct01";
import MypageAct02 from "./pages/Mypage/MypageAct/MypageAct02/MypageAct02";
import MypageAct03 from "./pages/Mypage/MypageAct/MypageAct03/MypageAct03";
import MypageAct04 from "./pages/Mypage/MypageAct/MypageAct04/MypageAct04";



const router = createBrowserRouter([
  {
    path: "/", element: <Main />,
    children: [
      { path: "/", element: <MainSection gridArea={"section"} /> },
      { path: "/login", element: <Login gridArea={"section"} /> },
      { path: "/register", element: <Register gridArea={"section"} /> },
      {
        path: "/team", element: <Post gridArea={"section"} />,
        children: [
          { path: "", element: <TeamMatchings /> },
          { path: "member", element: <TeamCollections /> },
          { path: "guestplayer", element: <GuestRecruitment /> },
          { path: "creation", element: <TeamCreation isOpen={true} /> },
          { path: "application", element: <TeamApplication /> }
        ]
      },
      { path: "/guestapplication", element: <GuestRecruitmentDetail gridArea={"section"}/> },
      { path: "/guestnew", element: <GuestRecruitmentCreation gridArea={"section"}/>},
      {
        path: "/mypage", element: <MyPage gridArea={"section"} />,
        children: [
          { path: "", element: <Mypage1 /> },
          { path: "act", element: <MypageAct gridArea={"section"} />},
          { path : "matches", element : <MypageAct01 gridArea={"section"}/>} ,
          { path : "records", element : <MypageAct02 gridArea={"section"}/>},
          { path : "teamsection", element : <MypageAct03 gridArea={"section"}/>},
          { path : "teamschedule" , element : <MypageAct04 gridArea={"section"}/>}

        ]
      },
      { path: "/reservation", element: <ReservationPage gridArea={"section"}/> },
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