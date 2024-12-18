import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import { changePhone } from '../../../stores/UserStore/action';
import { accountNum } from '../../../utils/regExp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  width: 120px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  transition: border-color 0.3s ease;
  margin-bottom: 0px;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 0 0 30%; /* 드롭다운은 30% */
  max-width: 150px; /* 드롭다운의 최대 너비를 설정 */
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 150px; /* 버튼 길이를 고정 */

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  align-self: center;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
`;

const ChangeSetComp = ({
  openPasswordModal,
  sendAuthCode,
  verifyAuthCode,
  authCode,
  email,
  setNewEmail,
  emailChangeModal,
  handleSubmitInfo,
  newPhone,
  setNewPhone,
  newbirth,
  setNewBirth,
  newAccount,
  setNewAccount,
  newAccountNum,
  setNewAccountNum,
  setAuthCode,
  userState,
  handleBlur
}) => {
  const navigate = useNavigate(); // useNavigate 훅 추가
  const user = JSON.parse(localStorage.getItem('user')); 

  // handleSubmitInfo 함수 수정: 제출 후 '/changeset' 페이지로 이동
  const handleSubmitInfoAndRedirect = () => {
    handleSubmitInfo(); // 기존 서브밋 함수 호출

    alert("변경되었습니다"); // 알림 창 추가

    // 페이지 이동 (현재 사용자 ID에 맞는 경로로 이동)
    navigate(`/mypage/${user.id}/setting`);
  };

  return (
    <Container>
      {/* 아이디 변경 */}
      <FormField>
        <Label>아이디</Label>
        <Input 
          type="text" 
          value={userState.id} 
        />
      </FormField>

      {/* 비밀번호 변경 (모달 호출) */}
      <FormField>
        <Label>비밀번호</Label>
        <Input 
          type="password" 
          value={userState.password} // 비밀번호 필드 업데이트
        />
        <Button onClick={() => openPasswordModal()}>비밀번호 재설정</Button>
      </FormField>

      {/* 이메일 변경 */}
      <FormField>
        <Label>기존 이메일</Label>
        <Input 
          type="email" 
          value={userState.email} 
        />
        <Button onClick={sendAuthCode}>인증번호 발송</Button>
      </FormField>

      {/* 인증번호 입력 */}
      <FormField>
        <Label>인증번호</Label>
        <Input 
          type="text" 
          value={authCode} 
          onChange={(e) => setAuthCode(e.target.value)} 
        />
        <Button onClick={verifyAuthCode}>인증하기</Button>
      </FormField>

      {/* 이메일 변경 모달 */}
      {emailChangeModal && (
        <div className="email-change-modal">
          <h2>이메일 변경</h2>
          <Input
            type="email"
            name="email"
            value={userState.email}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="새 이메일 입력"
          />
        </div>
      )}

      {/* 휴대폰 번호 */}
      <FormField>
        <Label>휴대폰 번호</Label>
        <Input 
          type="text" 
          name="phone"
          value={newPhone} 
          onChange={(e) => setNewPhone(e.target.value)} 
          onBlur={handleBlur}
        />
      </FormField>

      {/* 생년월일 */}
      <FormField>
        <Label>생년월일</Label>
        <Input 
          type="text" 
          name="birth"
          value={newbirth} 
          onChange={(e) => setNewBirth(e.target.value)} 
          onBlur={handleBlur}
        />
      </FormField>

      {/* 등록 계좌 */}
      <FormField>
        <Label>등록 계좌</Label>
        <Select 
          value={newAccount} 
          onChange={(e) => setNewAccount(e.target.value)}
        >
          <option value={newAccount}>{newAccount}</option>
          <option value="국민은행">국민은행</option>
          <option value="카카오뱅크">카카오뱅크</option>
          <option value="신한은행">신한은행</option>
          <option value="농협">농협</option>
          <option value="우리은행">우리은행</option>
          <option value="하나은행">하나은행</option>
          <option value="기업은행">기업은행</option>
        </Select>
        <Input 
          type="text" 
          value={newAccountNum} 
          onChange={(e) => setNewAccountNum(e.target.value)} 
          style={{flex: 1}}
          onBlur={handleBlur}
          name={accountNum}
        />
      </FormField>

      {/* 수정 완료 버튼 */}
      <SubmitButton onClick={handleSubmitInfoAndRedirect}>수정 완료</SubmitButton>
    </Container>
  );
};

export default ChangeSetComp;
