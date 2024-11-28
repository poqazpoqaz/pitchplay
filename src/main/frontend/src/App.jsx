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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';




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
      {
        path: "/mypage", element: <MyPage gridArea={"section"} />,
        children: [
          { path: "", element: <Mypage1 /> },
          { path: "act", element: <MypageAct gridArea={"section"} />},
  
        ]
      },
      { path: "/reservation", element: <ReservationPage gridArea={"section"} /> },
      { path: "/details", element: <GuestRecruitmentDetail/>}
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