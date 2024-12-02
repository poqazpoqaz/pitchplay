import React, { useState, useEffect } from 'react';
import ToggleButton from "../../../components/ToggleButton/ToggleButton";
import styled from 'styled-components';
import axios from 'axios';

// 제목 스타일
const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

// 서브 제목 스타일
const SubTitle = styled.h2`
  font-size: 1.1rem;
  margin: 5px 0;
`;

// Privacy 컨테이너
const Privacy = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width : 30%;
  gap: 15px;
  margin-bottom: 1rem;
`;

// 전체 컨테이너 스타일
const Container = styled.div`
  padding: 1rem;
`;

const PrivacySet = () => {
  const [profilePublic, setProfilePublic] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [snsNotification, setSnsNotification] = useState(false);

  // 초기 설정 값을 백엔드에서 불러오는 함수
  useEffect(() => {
    axios.get('/api/user/settings')  // 예시 API 경로
      .then(response => {
        const { profilePublic, emailNotification, snsNotification } = response.data;
        setProfilePublic(profilePublic);
        setEmailNotification(emailNotification);
        setSnsNotification(snsNotification);
      })
      .catch(error => {
        console.error('Error fetching settings', error);
      });
    
    // 페이지를 떠날 때 마지막 상태값을 저장
    const handleBeforeUnload = () => {
      axios.post('/api/user/settings', { 
        profilePublic, 
        emailNotification, 
        snsNotification 
      }).catch(error => {
        console.error('Error saving settings', error);
      });
    };

    // 페이지를 떠날 때 자동 저장
    window.addEventListener('beforeunload', handleBeforeUnload);

    // cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [profilePublic, emailNotification, snsNotification]);

  // 상태 변경 함수들
  const handleProfileToggle = () => setProfilePublic(prev => !prev);
  const handleEmailToggle = () => setEmailNotification(prev => !prev);
  const handleSnsToggle = () => setSnsNotification(prev => !prev);

  return (
    <Container>
      <Title>공개 설정</Title>
      <Privacy>
        <SubTitle>프로필 공개</SubTitle>
        <ToggleButton isOn={profilePublic} onToggle={handleProfileToggle} />
      </Privacy>

      <Title>알림 설정</Title>
      <Privacy>
        <SubTitle>이메일</SubTitle>
        <ToggleButton isOn={emailNotification} onToggle={handleEmailToggle} />
      </Privacy>

      <Privacy>
        <SubTitle>SNS</SubTitle>
        <ToggleButton isOn={snsNotification} onToggle={handleSnsToggle} />
      </Privacy>
    </Container>
  );
};

export default PrivacySet;
