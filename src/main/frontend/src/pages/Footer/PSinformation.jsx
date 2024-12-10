import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans', sans-serif; /* 폰트 패밀리를 Noto Sans로 변경 */
  line-height: 1.6;
  color: #333;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  /* 80% 너비 제한, 자동으로 가로 중앙 정렬 */
`;
const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Heading = styled.h2`
  font-size: 1.5em;
  color: #333;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 12px;
`;

const Text = styled.p`
  font-size: 1em;
  color: #555;
  line-height: 1.8;
  text-indent: 1em; /* 문단 첫 줄 들여쓰기 */
  white-space: pre-wrap;
`;

const List = styled.ul`
  margin-left: 20px;
  list-style: disc;
`;

const ListItem = styled.li`
  font-size: 1em;
  margin-bottom: 10px;
  color: #555;
`;

// 개인정보 처리방침 컴포넌트
const PSinformation = ({ gridArea }) => {
  return (
    <Container style={{ gridArea }}>
    <Title>개인정보 처리방침</Title>
    <hr />

      <Section>
        <Heading>1. 개인정보 수집 항목</Heading>
        <Text>저희는 다음과 같은 개인정보를 수집하고 있습니다:</Text>
        <List>
          <ListItem>이름, 이메일, 연락처</ListItem>
          <ListItem>주소, 생년월일</ListItem>
          <ListItem>결제 정보 (카드 번호, 계좌 정보 등)</ListItem>
          <ListItem>서비스 이용 기록 및 접속 로그</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>2. 개인정보 이용 목적</Heading>
        <Text>수집된 개인정보는 다음과 같은 목적으로 활용됩니다:</Text>
        <List>
          <ListItem>회원 서비스 제공 및 본인 인증</ListItem>
          <ListItem>고객 상담 및 문제 해결</ListItem>
          <ListItem>맞춤형 콘텐츠 및 광고 제공</ListItem>
          <ListItem>법적 의무 준수 및 감사 대응</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>3. 개인정보 보유 및 이용 기간</Heading>
        <Text>개인정보는 다음 기간 동안 보유됩니다:</Text>
        <List>
          <ListItem>회원 탈퇴 시까지 보유</ListItem>
          <ListItem>법령에 따라 보관이 필요한 경우 해당 기간 동안 보유</ListItem>
          <ListItem>미사용 계정은 일정 기간 후 삭제</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>4. 개인정보 보호</Heading>
        <Text>고객님의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취하고 있습니다:</Text>
        <List>
          <ListItem>SSL 인증서로 데이터 암호화</ListItem>
          <ListItem>주기적인 보안 점검 및 모니터링</ListItem>
          <ListItem>내부 접근 권한 최소화</ListItem>
          <ListItem>개인정보 취급자에 대한 보안 교육 강화</ListItem>
        </List>
      </Section>

      <Section>
        <Heading>5. 제3자 제공 및 위탁</Heading>
        <Text>
          개인정보는 원칙적으로 제3자에게 제공되지 않으며, 필요 시 고객님의 동의를 받습니다. 또한,
          외부 업체에 개인정보 처리를 위탁하는 경우 안전한 처리를 위해 계약을 체결하고 관리합니다.
        </Text>
      </Section>

      <Section>
        <Heading>6. 개인정보 처리방침 변경</Heading>
        <Text>
          개인정보 처리방침은 변경될 수 있으며, 변경 사항은 서비스 공지사항 또는 이메일을 통해
          알려드립니다.
        </Text>
      </Section>
    </Container>
  );
};

export default PSinformation;
