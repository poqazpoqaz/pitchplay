import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { TeamCodePattern, TNamePattern, TeamDescriptionPattern } from '../../utils/regExp';
import TeamNameCodeInput from '../../components/TeamCreationItem/TeamNameCodeInput';
import TeamImageInput from '../../components/TeamCreationItem/TeamImageInput';
import TeamDescriptionInput from '../../components/TeamCreationItem/TeamDescriptionInput';
import { useNavigate } from 'react-router-dom';

function TeamCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 팀 이름 & 팀 코드 상태
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [teamNameError, setTeamNameError] = useState(false);
  const [teamCodeError, setTeamCodeError] = useState(false);
  const [isCheckingCode, setIsCheckingCode] = useState(true); // 나중에 백에서 비교할 때 우선 true로 설정

  // 팀 이름 유효성 검사
  const handleTeamNameChange = (e) => {
    const value = e.target.value;
    setTeamName(value);
    setTeamNameError(TNamePattern.test(value));
  };

  // 팀 코드 유효성 검사 및 중복 체크
  const handleTeamCodeChange = async (e) => {
    const value = e.target.value;
    setTeamCode(value);
    setTeamCodeError(TeamCodePattern.test(value));
  };

  // 팀 이미지 상태
  const [image, setImage] = useState(null);

  // 팀 소개글 상태 및 유효성 검사
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(true); // 초기값은 true로 설정

  const handleTeamDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionError(value.length === 0 || TeamDescriptionPattern.test(value)); // 길이가 0이어도 통과
  };

  // 다음 단계로 이동
  const handleNextButtonClick = () => {
    if (
      (currentStep === 1 && teamNameError && teamCodeError && isCheckingCode) || currentStep === 2
      || (currentStep === 3 && descriptionError)
    ) {
      // 유효성 검사를 통과하면 다음 단계로 넘어감
      setCurrentStep(currentStep + 1);
    } else {
      // 유효성 검사 실패 시 알림
      if (currentStep === 1) {
        if (!teamNameError) {
          alert("팀 이름이 유효하지 않습니다.");
        }
        if (!teamCodeError) {
          alert("팀 코드가 유효하지 않습니다.");
        }
        if (!isCheckingCode) {
          alert("팀 코드가 중복됩니다.");
        }
      } else if (currentStep === 3 && !descriptionError) {
        alert("팀 소개글이 유효하지 않습니다. 300자 이하로 작성해주세요.");
      }
    }
  };

  // 이전으로 돌아가기
  const handleBeforeButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };

  // 모달 닫기
  const closeTeamModal = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeTeamModal}>
      {/* 각 단계별 UI */}
      {currentStep === 1 && (
        <TeamNameCodeInput
          teamName={teamName}
          teamCode={teamCode}
          handleTeamNameChange={handleTeamNameChange}
          handleTeamCodeChange={handleTeamCodeChange}
          teamNameError={teamNameError}
          teamCodeError={teamCodeError}
          handleNextStep={handleNextButtonClick}
        />
      )}

      {currentStep === 2 && (
        <TeamImageInput
          handleBeforeButtonClick={handleBeforeButtonClick}
          handleNextButtonClick={handleNextButtonClick}
          image={image}
          setImage={setImage}
        />
      )}

      {currentStep === 3 && (
        <TeamDescriptionInput
          handleNextButtonClick={handleNextButtonClick}
          handleBeforeButtonClick={handleBeforeButtonClick}
          handleTeamDescription={handleTeamDescription}
          description={description}
        />
      )}

      {currentStep === 4 && (
        <p>네번째</p>
      )
      }
    </Modal>
  );
}

export default TeamCreation;