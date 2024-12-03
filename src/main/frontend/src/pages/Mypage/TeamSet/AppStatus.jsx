import React from 'react';
import styled from 'styled-components';

const Top1 = styled.div`
  padding: 30px;
  background-color: #f9fafc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const Subtitle = styled.h1`
  margin-bottom: 25px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const Box = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px); 
  }
`;

const BoxCal = styled.div`
  font-size: 14px;
  color: #888;
  margin-right: 15px;

  p {
    margin: 0;
    font-weight: bold;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const AppStatus = ({ pendingMembers }) => {
  // pendingMembers가 배열이 아니면 빈 배열로 설정
  const members = Array.isArray(pendingMembers) ? pendingMembers : [];

  return (
    <Top1>
      <Subtitle>신청한 멤버 목록</Subtitle>
      {members.length === 0 ? (
        <p>대기 중인 멤버가 없습니다.</p>
      ) : (
        members.map((member, index) => (
          <Box key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileImg src={member.profileImg}/>
              <h1>{member.pendingnickname}</h1>
            </div>
            <BoxCal>
              <p>신청일: {member.applicationDate}</p>
            </BoxCal>
          </Box>
        ))
      )}
    </Top1>
  );
};

export default AppStatus;
