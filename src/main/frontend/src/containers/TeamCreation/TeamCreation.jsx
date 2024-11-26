import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { TeamCodePattern, TNamePattern, TeamDescriptionPattern } from '../../utils/regExp';
import TeamNameCodeInput from '../../components/TeamCreationItem/TeamNameCodeInput';
import TeamImageInput from '../../components/TeamCreationItem/TeamImageInput';
import TeamDescriptionInput from '../../components/TeamCreationItem/TeamDescriptionInput';
import { useNavigate } from 'react-router-dom';
import TeamInformation from '../../components/TeamCreationItem/TeamLevel';
import TeamTime from '../../components/TeamCreationItem/TeamTime';
import TeamLocation from '../../components/TeamCreationItem/TeamLocation';
import TeamMemberGender from '../../components/TeamCreationItem/TeamMemberGender';
import TeamCreationEnd from '../../components/TeamCreationItem/TeamCreationEnd';

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

  // 체크박스 상태 관리
  const [selectedLevels, setSelectedLevels] = useState([]);
  const levels = ["비기너", "아마추어", "세미프로", "프로"]; // 선택 가능한 옵션

  // 체크박스 클릭 이벤트 핸들러
  const handleCheckboxClick = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level) // 이미 선택된 경우 제거
        : [...prev, level] // 새로 선택된 경우 추가
    );
  };

  // 팀 활동 시간
  const [selectedDayOptions, setSelectedDayOptions] = useState([]);
  const dayoptions = ['월', '화', '수', '목', '금', '토', '일'];

  const [selectedHourOptions, setSelectedHourOptions] = useState([]);
  const houroptions = ['오전\n06~10시', '낮\n10~18시', '저녁\n18~24시', '전체\n24시간'];

  //옵션 선택 클릭 이벤트 핸들러
  const handleDayCategoryClick = (option) => {
    setSelectedDayOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleTimeCategoryClick = (option) => {
    setSelectedHourOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // 팀 options
  const cityOptions = ["서울"];
  const locOptions = [
    "강서구", "양천구", "구로구",
    "영등포구", "금천구", "동작구",
    "관악구", "서초구", "강남구", "송파구",
    "강동구", "은평구", "서대문구",
    "마포구", "종로구", "중구", "용산구",
    "도봉구", "강북구", "노원구", "중랑구",
    "동대문구", "광진구", "성동구", "성북구", "강북구"
  ];

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("");

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedLoc(""); // 도시가 변경되면 지역을 초기화
  };

  const handleLocChange = (location) => {
    setSelectedLoc(location);
  };


  // 팀 나이대
  const [selectedAge, setSelectedAge] = useState([]); // 배열로 초기화
  const ageOptions = ['10대', '20대', '30대', '40대', '50대↑'];

  const handleAgeClick = (age) => {
    setSelectedAge((prev) =>
      prev.includes(age)  // 이미 선택된 나이대가 있으면 제거
        ? prev.filter((option) => option !== age)
        : [...prev, age]  // 없으면 추가
    );
  };

  // 팀 구성성별
  const [selectedGender, setSelectedGender] = useState([]); // 배열로 초기화
  const genderOptions = ['남성', '여성', '혼성'];

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  // 버튼 (이전, 다음단계, 모달 닫기)

  // 이전으로 돌아가기
  const handleBeforeButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };


  // 다음 단계로 이동
  const handleNextButtonClick = () => {
    if (currentStep === 1) {
      // 1단계: 팀 이름 및 코드 유효성 검사
      if (!teamNameError || !teamCodeError || !isCheckingCode) {
        if (!teamNameError) alert("팀 이름이 유효하지 않습니다.");
        if (!teamCodeError) alert("팀 코드가 유효하지 않습니다.");
        if (!isCheckingCode) alert("팀 코드가 중복됩니다.");
        return;
      }
    } else if (currentStep === 3) {
      // 3단계: 팀 소개글 유효성 검사
      if (!descriptionError) {
        alert("팀 소개글이 유효하지 않습니다. 300자 이하로 작성해주세요.");
        return;
      }
    } else if (currentStep === 4) {
      // 4단계: 팀 레벨 최소 하나 이상 선택
      if (selectedLevels.length === 0) {
        alert("최소 하나의 팀 레벨을 선택해주세요.");
        return;
      }
    } else if (currentStep === 5) {
      if (selectedDayOptions.length === 0 || selectedHourOptions.length === 0) {
        alert("최소 하나의 활동시간을 선택해주세요");
        return;
      }
    }

    // 유효성 검사 통과 시 다음 단계로 이동
    setCurrentStep(currentStep + 1);
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
        <TeamInformation
          levels={levels}
          handleCheckboxClick={handleCheckboxClick}
          selectedLevels={selectedLevels}
          handleBeforeButtonClick={handleBeforeButtonClick}
          handleNextButtonClick={handleNextButtonClick}
        />
      )
      }

      {currentStep === 5 && (
        <TeamTime
          handleBeforeButtonClick={handleBeforeButtonClick}
          handleNextButtonClick={handleNextButtonClick}
          dayoptions={dayoptions}
          selectedDayOptions={selectedDayOptions}
          handleDayCategoryClick={handleDayCategoryClick}
          houroptions={houroptions}
          selectedHourOptions={selectedHourOptions}
          handleTimeCategoryClick={handleTimeCategoryClick}
        />
      )
      }

      {currentStep === 6 && (
        <TeamLocation
          cityOptions={cityOptions}
          locOptions={locOptions}
          handleCityChange={handleCityChange}
          selectedCity={selectedCity}
          handleLocChange={handleLocChange}
          selectedLoc={selectedLoc}
          handleBeforeButtonClick={handleBeforeButtonClick}
          handleNextButtonClick={handleNextButtonClick}
        />
      )}

      {
        currentStep == 7 && (
          <TeamMemberGender
            ageOptions={ageOptions}
            genderOptions={genderOptions}
            selectedAge={selectedAge}
            selectedGender={selectedGender}
            handleAgeClick={handleAgeClick}
            handleGenderClick={handleGenderClick}
            handleBeforeButtonClick={handleBeforeButtonClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        )
      }

      {
        currentStep == 8 && (
          <TeamCreationEnd/>
        )
      }
    </Modal>
  );
}

export default TeamCreation;