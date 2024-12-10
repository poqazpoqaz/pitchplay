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
  whitesp-ace: pre-wrap;
  text-align: center;
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

// 사업자 정보 확인 컴포넌트
const BusinessInfo = ({ gridArea }) => {
  return (
    <Container style={{ gridArea }}>
      <Title>사업자 정보 확인</Title>
      <hr />

      <Section>
        <Heading>1. 상호명</Heading>
        <Text>피치플레이 (PeachPlay)</Text>
      </Section>

      <Section>
        <Heading>2. 대표자</Heading>
        <Text>김근형</Text>
      </Section>

      <Section>
        <Heading>3. 사업자 등록번호</Heading>
        <Text>XXX-XX-XXXXX</Text>
      </Section>

      <Section>
        <Heading>4. 사업장 주소</Heading>
        <Text>서울특별시 금천구 가산동 549-1 3층</Text>
      </Section>

      <Section>
        <Heading>5. 전화번호</Heading>
        <Text>+82-2-1234-5678</Text>
      </Section>

      <Section>
        <Heading>6. 이메일</Heading>
        <Text>contact@pitchplay.com</Text>
      </Section>

      <Section>
        <Heading>7. 통신판매업 신고번호</Heading>
        <Text>2024-서울가산-XXXX</Text>
      </Section>

      <Section>
        <Heading>8. 개인정보 관리 책임자</Heading>
        <Text>ㅇㅇㅇ (contact@peachplay.com)</Text>
      </Section>
    </Container>
  );
};

export default BusinessInfo;
