import React from 'react';
import styled from 'styled-components';

// 간단한 스타일링
const Container = styled.div`
  padding: 2rem;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  max-width: 1200px;
  margin: 2.5rem auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1.2rem;
  color: #555;
  margin-top: 2rem;

  p {
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: disc;
    margin-left: 2rem;
  }

  li {
    margin-bottom: 0.8rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const PSinformation = ({gridArea}) => {
  return (
    <Container style={{gridArea}}>
      <Title>개인정보 처리방침</Title>
      <Content>
        <Section>
          <h2>1. 개인정보 수집 항목</h2>
          <p>저희는 다음과 같은 개인정보를 수집하고 있습니다:</p>
          <ul>
            <li>이름</li>
            <li>이메일</li>
            <li>연락처</li>
            <li>주소</li>
          </ul>
        </Section>

        <Section>
          <h2>2. 개인정보 이용 목적</h2>
          <p>수집된 개인정보는 다음의 목적을 위해 사용됩니다:</p>
          <ul>
            <li>서비스 제공을 위한 본인 확인</li>
            <li>회원 관리 및 고객 지원</li>
            <li>마케팅 및 광고</li>
          </ul>
        </Section>

        <Section>
          <h2>3. 개인정보 보유 및 이용 기간</h2>
          <p>수집된 개인정보는 다음과 같은 기간 동안 보유됩니다:</p>
          <ul>
            <li>회원 탈퇴 시까지 보유</li>
            <li>법적 의무에 의해 보관이 필요한 경우</li>
          </ul>
        </Section>

        <Section>
          <h2>4. 개인정보 보호</h2>
          <p>저희는 고객님의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취하고 있습니다:</p>
          <ul>
            <li>암호화된 데이터 저장</li>
            <li>정기적인 보안 점검</li>
            <li>접근 제한</li>
          </ul>
        </Section>
        
        <Section>
          <h2>5. 개인정보 처리방침 변경</h2>
          <p>본 개인정보 처리방침은 변경될 수 있으며, 변경 시 공지사항을 통해 알리겠습니다.</p>
        </Section>
      </Content>
    </Container>
  );
};

export default PSinformation;
