import React from 'react';
import styled from 'styled-components';

// Styled Components 정의
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
  ${({ gridArea }) => gridArea && `grid-area: ${gridArea};`}
  /* 80% 너비 제한, 자동으로 가로 중앙 정렬 */
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
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

const Terms = ({ gridArea }) => {
  return (
    <Container gridArea={gridArea}>
      <Title>이용약관</Title>
      <hr />
      <Section>
        <Heading>제 1조 목적</Heading>
        <Text>
          이 약관은 [회사명](이하 "회사"라 함)이 제공하는 서비스의 이용과 관련하여 회사와
          회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </Text>
      </Section>
      <Section>
        <Heading>제 2조 약관의 게시와 효력, 개정</Heading>
        <Text>
          1. 회사는 서비스의 가입 과정에 본 약관의 내용을 회원이 알 수 있도록 표시합니다. <br />
          2. 회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등
          관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
        </Text>
      </Section>
      <Section>
        <Heading>제 3조 약관의 해석과 예외 준칙</Heading>
        <Text>
          1. 회사는 제공하는 서비스에 대해 개별 약관 또는 운영정책(이하 "개별 약관")을 둘 수
          있으며, 본 약관과 상충할 경우 개별 약관이 우선 적용됩니다. <br />
          2. 본 약관에 명시되지 않은 사항에 대해서는 관련 법령 또는 상관례에 따릅니다.
        </Text>
      </Section>
      <Section>
        <Heading>제 4조 회원 가입 및 이용 계약</Heading>
        <Text>
          1. 회원 가입은 이용자가 약관의 내용에 동의하고 회원 가입 신청을 한 후 회사가 이를
          승낙함으로써 체결됩니다. <br />
          2. 회사는 다음에 해당하는 경우 회원 가입 신청을 거절할 수 있습니다:
          <br />- 허위 정보를 기재한 경우
          <br />- 사회 질서를 저해할 우려가 있는 경우
        </Text>
      </Section>
      <Section>
        <Heading>제 5조 회원의 의무</Heading>
        <Text>
          1. 회원은 다음 행위를 해서는 안 됩니다:
          <br />- 타인의 정보를 도용하거나 부정 사용
          <br />- 서비스에 위해를 가하거나 정상적인 운영을 방해하는 행위
          <br />- 법령에 위배되는 불법적 행위
          <br />
          2. 회원은 정보 변경 시 즉시 회사에 알리고, 회사가 요청하는 자료를 신속히 제공해야
          합니다.
        </Text>
      </Section>
      <Section>
        <Heading>제 6조 서비스 제공 및 변경</Heading>
        <Text>
          1. 회사는 회원에게 다음과 같은 서비스를 제공합니다:
          <br />- 온라인 콘텐츠 제공
          <br />- 회원 간 커뮤니케이션 도구
          <br />
          2. 회사는 서비스 제공에 필요한 경우 일부 또는 전체 서비스를 변경할 수 있으며,
          변경 사항은 사전에 공지합니다.
        </Text>
      </Section>
      <Section>
        <Heading>제 7조 계약 해지 및 서비스 이용 제한</Heading>
        <Text>
          1. 회원이 서비스 이용 계약을 해지하고자 할 경우, 회사에 신청해야 하며 회사는
          관련 법령에 따라 이를 처리합니다. <br />
          2. 회사는 다음의 경우 사전 통보 없이 서비스 이용을 제한하거나 계약을 해지할 수
          있습니다:
          <br />- 약관 위반 또는 법령에 따른 제재 대상이 된 경우
          <br />- 부적절한 행위로 회사 또는 제3자에게 피해를 준 경우
        </Text>
      </Section>
      <Section>
        <Heading>제 8조 책임 제한</Heading>
        <Text>
          1. 회사는 천재지변, 전쟁, 테러 등 불가항력으로 인해 발생한 손해에 대해 책임을
          지지 않습니다. <br />
          2. 회사는 회원의 귀책 사유로 인한 손해에 대해 책임을 지지 않습니다.
        </Text>
      </Section>
      <Section>
        <Heading>제 9조 분쟁 해결 및 관할</Heading>
        <Text>
          1. 회사와 회원 간에 발생한 분쟁은 성실히 협의하여 해결합니다. <br />
          2. 협의가 이루어지지 않을 경우, 관할 법원은 회사의 본사 소재지에 있는 법원으로
          합니다.
        </Text>
      </Section>
    </Container>
  );
};

export default Terms;
