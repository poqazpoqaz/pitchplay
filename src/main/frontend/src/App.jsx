import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainSection from "./pages/MainSection/MainSection";
import Post from "../src/pages/Post/Post";
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
import MypageAct01 from "./pages/Mypage/MypageAct/MypageAct01/MypageAct01";
import MypageAct02 from "./pages/Mypage/MypageAct/MypageAct02/MypageAct02";
import MypageAct03 from "./pages/Mypage/MypageAct/MypageAct03/MypageAct03";
import MypageAct04 from "./pages/Mypage/MypageAct/MypageAct04/MypageAct04";
import NoticeAccordion from "./components/NoticeAccordion/NoticeAccordion";
import FAQAccordion from "./components/FAQAccordion/FAQAccordion";
import NoticePost from "./components/NoticePost/NoticePost";
import MypageAct05 from "./pages/Mypage/MypageAct/MypageAct05/MypageAct05";
import TeamMatchingDetail from "./pages/TeamMatchingDetail/TeamMatchingDetail";
import StadiumDetail from "./pages/StadiumDetail/StadiumDetail";
import FeedbackAccordion from "./components/FeedbackAccordion/FeedbackAccordion";
import ConductAccordion from "./components/ConductAccordion/ConductAccordion";
import SocialMatchings from "./pages/SocialMatchings/SocialMatchings";
import SocialMatchingDetail from "./pages/SocialMatchingDetail/SocialMatchingDetail";
import FindIdPage from "./pages/FindIdPage/FindIdPage";
import FindPwPage from "./pages/FindPwPage/FindPwPage";
import FindIdPw from "./pages/FindIdPw/FindIdPw";
import WriteReport from "./components/FeedbackAccordion/WriteReport";
import AdminPage from "./pages/AdminPage/AdminPage";
import Dashboard from "./pages/AdminPageDashboard/Dashboard";
import AdminMemeberManagement from './pages/AdminMemberManagement/AdminMemberManagement';
import AdminTeamManagement from "./pages/AdminTeamManagement/AdminTeamManagement";
import AdminStadiumReservation from './pages/AdminStadiumManagement/AdminStadiumManagement';
import AdminNoticeBoard from "./pages/AdminNoticeBoard/AdminNoticeBoard";
import NoticeBoardWrite from "./pages/AdminNoticeBoard/NoticeBoardWrite/NoticeBoardWrite";
import AdminPaymentManagement from "./pages/AdminPaymentManagement/AdminPaymentManagement";

// 새로 추가된 페이지
import ChargePage from "./pages/ChargePage";
import RefundPage from "./pages/RefundPage";
import HistoryPage from "./pages/HistoryPage";
import Community1 from './pages/Mypage/Community/Community1/Community1';
import Setting from './pages/Mypage/Setting/Setting';
import CommentInfo from './pages/Mypage/Community/Community2/CommentInfo';
import PostInfo from './pages/Mypage/Community/Community2/PostInfo';
import AppMangement from './pages/Mypage/TeamSet/AppManagement';
import AdminMatchingManagement from './pages/AdminMatchingManagement/AdminMatchingManagement';
import ChargeMain from './pages/ChargeMain';
import RefundMain from './pages/RefundMain';
import ChangeSetting from './pages/Mypage/ChangeSet/ChangeSetting';
import PSinformation from './pages/Footer/PSinformation';
import Terms from './pages/Terms';
import BusinessInfo from './pages/BusinessInfo';

const router = createBrowserRouter([
  {
    path: "/", element: <Main />,
    children: [
      { path: "/", element: <MainSection gridArea={"section"} /> },
      { path: "/login", element: <Login gridArea={"section"} /> },
      {
        path: "/find", element: <FindIdPw gridArea={"section"} />,
        children: [
          { path: "", element: <FindIdPage /> },
          { path: "pw", element: <FindPwPage /> }
        ]
      },
      { path: "/register", element: <Register gridArea={"section"} /> },
      { path: "/social", element: <SocialMatchings gridArea={"section"} /> },
      { path: "/social/:socialNumber", element: <SocialMatchingDetail gridArea={"section"} /> },
      {
        path: "/team", element: <Post gridArea={"section"} />,
        children: [
          { path: "", element: <TeamMatchings /> },
          { path: "member", element: <TeamCollections /> },
          { path: "guestplayer", element: <GuestRecruitment /> },
          { path: "member/:teamCode", element: <TeamApplication /> },
          { path: "creation", element: <TeamCreation isOpen={true} /> }
        ]
      },
      {
        path: "/matching/:matchingNum",
        element: <TeamMatchingDetail gridArea={"section"} />,
      },
      {
        path: "/:postNumber/guestrecruitment",
        element: <GuestRecruitmentDetail gridArea={"section"} />,
      },
      {
        path: "/:reservationNum/newguest",
        element: <GuestRecruitmentCreation gridArea={"section"} />,
      },
      {
        path: "/mypage/:id", element: <MyPage gridArea={"section"} />, 
        children: [
          { path: "", element: <Mypage1 /> },
          { path: "act", element: <MypageAct gridArea={"section"} /> },
          { path: "matches", element: <MypageAct01 gridArea={"section"} /> },
          { path: "records", element: <MypageAct02 gridArea={"section"} /> },
          { path: "teamsection", element: <MypageAct03 gridArea={"section"} /> },
          { path: "teamschedule", element: <MypageAct04 gridArea={"section"} /> },
          { path: ":myTeam/members", element: <MypageAct05 gridArea={"section"} /> },
          { path: "posts" , element : <Community1 gridArea={"section"}/>},
          { path: "setting" , element : <Setting gridArea={"section"}/> },
          { path: "commentinfo" , element : <CommentInfo gridArea={"section"}/>},
          { path: "postinfo", element : <PostInfo gridArea={"section"}/>},
          { path: ":teamCode/members/appmange" , element : <AppMangement gridArea={"section"}/>  },
          { path: "changeset" , element : <ChangeSetting gridArea={"section"}/>},
          { path: "history", element: <HistoryPage gridArea={"section"} /> },
        ]
      },
      {
        path: "/admin", element: <AdminPage gridArea={"section"} />,
        children: [
          { path: "", element: <Dashboard />, },
          { path: "matching-management", element: <AdminMatchingManagement/>},
          { path: "member-management", element: <AdminMemeberManagement/>},
          {path: "team-management/:id?",element: <AdminTeamManagement />},
          {path: "stadium-reservation/:id?", element: <AdminStadiumReservation gridArea={"section"} />},
          {path: "notice-board", element: <AdminNoticeBoard gridArea={"section"} />},
          {path: "notice-board/write", element: <NoticeBoardWrite gridArea={"section"} />},
          {path: "payment-management", element: <AdminPaymentManagement gridArea={"section"} />}
            ],
          },

          {
            path: "/notices",
            element: <NoticePost gridArea={"section"} />,
            children: [
              { path: "", element: <NoticeAccordion /> },
              { path: "faq", element: <FAQAccordion /> },
              { path: "feedback", element: <FeedbackAccordion /> },
              { path: "conduct", element: <ConductAccordion /> },
            ],
          },
          {
            path: "/reservation",
            element: <ReservationPage gridArea={"section"} />,
          },
          {
            path: "/stadium/:stadiumId",
            element: <StadiumDetail gridArea={"section"} />,
          },
          { path: "/charge", element: <ChargeMain gridArea={"section"} /> },
          { path: "/refund", element: <RefundMain gridArea={"section"} /> },
          { path: "/psinfo" , element:<PSinformation gridArea={"section"}/>},
          { path: "/term", element: <Terms gridArea={"section"}/>},
          { path: "/business", element: <BusinessInfo gridArea={"section"} />}
        ]
        
      },


      { path: "/Write", element: <WriteReport gridArea={"section"} /> },
    ]
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
