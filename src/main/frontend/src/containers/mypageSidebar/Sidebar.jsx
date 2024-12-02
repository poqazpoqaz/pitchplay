import React from 'react';
import styled from 'styled-components';
import pachiImage from './pachi.jpg';
import axios from 'axios';
import myinfo from '/imgs/myinfo.svg';
import myactivity from '/imgs/myactivity.svg';
import commnuity from '/imgs/commnuity.svg';
import setting from '/imgs/setting.svg';

// Styled Components
const SidebarContainer = styled.div`
  display: grid;
  height: 100%;
  border-right: 1px solid #efefef;
  grid-template:
    "... ... ..." 50px
    "... sidetop ..." 90px
    "... ... ..." 60px
    "... sidemid ..." 240px
    "... ... ..." 1fr
    "... sidebottom ..." 50px
    "... ... ..." 50px / 10px 240px 10px;
`;

const Sidetop = styled.div`
  grid-area: sidetop;
  display: flex;
  gap: 1rem;
  border: 1px solid #efefef;
  border-radius: 15%;
`;

const Sidemid = styled.div`
  grid-area: sidemid;
`;

const Sidebottom = styled.div`
  grid-area: sidebottom;
`;

const UserInfo = styled.div`
  .username {
    font-size: 1rem;
    font-weight: bold;
  }
  .useremail {
    font-size: 0.75rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease;


  &:hover {
    background-color: #f0f0f0;
  }
`;

const Button = styled.span`
  padding: 1rem;
  color: red;
  cursor: pointer;
`;

const TopImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const BotImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
`;
const Link = styled.a`
  text-decoration: none;
  font-size: 0.875rem;
  color: #333;
  transition: color 0.3s ease;
  &:hover {
    color: #007bff;
  }
`;


// Sidebar Component
const Sidebar = ({ userState, gridArea }) => {

  const handleLogout = async () => {
    try {
      // 로그아웃 요청을 서버에 보냄
      const response = await axios.post('/api/logout');  // 로그아웃 API 엔드포인트

      if (response.status === 200) {
        // actions 랑 연동될 유지
        // 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <SidebarContainer style={{gridArea: gridArea}}>
      <Sidetop>
        <TopImg src={userState.profileImg} alt="User Avatar" />
        <UserInfo>
          <p className="username">{userState.name}</p>
          <p className="useremail">{userState.email}</p>
        </UserInfo>
      </Sidetop>
      <Sidemid>
        <List>
          <ListItem>
            <img src={myinfo} alt="내 정보" />
            {/* Link 컴포넌트로 변경 */}
            <Link href="/mypage/pitch123">내 정보</Link>
          </ListItem>
          <ListItem>
            <img src={myactivity} alt="내 활동" />
            {/* Link 컴포넌트로 변경 */}
            <Link href="/mypage/pitch123/act">내 활동</Link>
          </ListItem>
          <ListItem>
            <img src={commnuity} alt="커뮤니티" />
            {/* Link 컴포넌트로 변경 */}
            <Link href="/mypage/pitch123/posts">커뮤니티</Link>
          </ListItem>
          <ListItem>
            <img src={setting} alt="설정" />
            {/* Link 컴포넌트로 변경 */}
            <Link href="/mypage/pitch123/setting">설정</Link>
          </ListItem>
        </List>
      </Sidemid>
      <Sidebottom>
        <BotImg src={userState.profileImg} alt="User Avatar" />
        <Button onClick={handleLogout}>로그아웃</Button>
      </Sidebottom>
    </SidebarContainer>
  );
};

export default Sidebar;
