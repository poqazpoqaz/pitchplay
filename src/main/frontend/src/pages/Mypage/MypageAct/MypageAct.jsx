import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./MypageAct.css";
import pachiImage from './pachi.jpg';

const MypageAct = ({ matches, records, teamInfo, posts }) => {
  return (
    <div className="mypage-grid">
      <Header />
      <div className="container">
        <Sidebar className="sidebar" />
        <div className="content">
          <h1 className="title">마이페이지 &gt; 내 활동</h1>
          <div className="item">
            <div className="top1">
              <h1 className="subtitle">예약한 경기 목록</h1>
              <div className="box">
                {/* 디자인만 볼 수 있게 임시로 넣어둠 */}
                <h1>잠실 종합운동장 보조 경기장</h1>
                {/* <h1>{matches[0].location}</h1> */}
                <div className="box-cal">
                  <p>2024.02.03</p>
                  {/* <p>{matches[0].date}</p> */}
                </div>
              </div>
              <div className="box">
              <h1>잠실 종합운동장 보조 경기장</h1>
              {/* <h1>{matches[1].location}</h1> */}
                <div className="box-cal">
                  <p>2024.02.03</p>
                  {/* <p>{matches[1].date}</p> */}
                </div>
              </div>
              <div className="btnend">
                {/* 링크 미구현 상태라 임시로 a 태그 넣어둠 */}
              <a href="/matches" className="link-button">더 보기</a>
              {/* <Link to="/matches" className="link-button">더 보기</Link> */}
              </div>
             </div>
            <div className="top2">
              <h1 className="subtitle">참가한 경기 기록</h1>
              <div className="box">
              {/* <h1>{records[0].location}</h1> */}
              <div className="box-cal">
              {/* <p>{records[0].date}</p> */}
              </div>
              </div>
              <div className="box">
              {/* <h1>{records[1].location}</h1> */}
              <div className="box-cal">
              {/* <p>{records[1].date}</p> */}
              </div>
              </div>
              <div className="btnend">
              <a href="/records" className="link-button">더 보기</a>
              {/* <Link to="/records" className="link-button">더 보기</Link> */}
              </div>
            </div>
            <div className="top3">
              <h1 className="subtitle">내 팀 정보</h1>
              <div className="top3-item">
              <div className="team-info">
              <img src={pachiImage} alt="팀 이미지" className="teamimg" />
              {/* <img src={teamInfo.image} alt="팀 이미지" className="teamimg" /> */}
              {/* props 로 팀 이미지 받아와야 함 임시로 이미지 넣어둠 */}
              </div>
              <div className="team-details">
              <h2 className="teamname">안산 그리너스</h2>
              {/* <h2 className="teamname">{teamInfo.name}</h2> */}
              <p className="members">안산 고잔동 / 24명</p>
              {/* <p className="members">{teamInfo.location} / {teamInfo.members}명</p> */}
              </div>
              </div>
              <div className="btnend">
              <a href="/team" className="link-button">나의 팀</a>
              {/* <Link to="/team" className="link-button">나의 팀</Link> */}
              </div>
            </div>
            <div className="top4">
              <h1 className="subtitle">내가 쓴 글</h1>
              <div className="box">
              <p>게시물 :</p>
              {/* <p>{posts[0]}</p> */}
              </div>
              <div className="box">
              <p>댓글 :</p>
              {/* <p>{Comment[0]}</p> */}
              </div>
              <div className="btnend">
              <a href="/posts" className="link-button">보러가기</a>
              {/* <Link to="/posts" className="link-button">보러가기</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageAct;
