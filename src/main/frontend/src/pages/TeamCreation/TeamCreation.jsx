import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import TeamNameCodeInput from "../../components/TeamCreationItem/TeamNameCodeInput";
import TeamImageInput from "../../components/TeamCreationItem/TeamImageInput";
import TeamDescriptionInput from "../../components/TeamCreationItem/TeamDescriptionInput";
import TeamLevel from "../../components/TeamCreationItem/TeamLevel";
import TeamTime from "../../components/TeamCreationItem/TeamTime";
import TeamLocation from "../../components/TeamCreationItem/TeamLocation";
import TeamMemberGender from "../../components/TeamCreationItem/TeamMemberGender";
import TeamCreationEnd from "../../components/TeamCreationItem/TeamCreationEnd";
import Button from "../../components/Button";
import { useStore } from "../../stores/TeamStore/useStore";
import { useNavigate } from "react-router-dom";
import { TeamCodePattern, TNamePattern, TeamDescriptionPattern } from "../../utils/regExp";

function TeamCreation() {
  const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 user 가져옴
  const { state, actions } = useStore();
  const navigate = useNavigate();

  const initialState = {
    teamName: "",
    teamCode: "",
    teamImg: null,
    teamDescription: "",
    teamLevel: [],
    teamDay: [],
    teamTime: [],
    teamCity: "",
    teamLoc: "",
    teamAge: [],
    teamGender: [],
    currentMember: 0,
    totalMember: 0,
    collectionTitle: "",
    teamMember: [],
    teamOwner: "",
    pendingMembers: [],
  };

  useEffect(() => {
    actions.updateAllFields(initialState);
  }, []);

  // 모달창 오픈
  const [isOpen, setIsOpen] = useState(true);

  // 모달창 이동
  const [currentStep, setCurrentStep] = useState(1);

  // 유효성 검사 상태
  const [errors, setErrors] = useState({
    teamName: "",
    teamCode: "",
    teamDescription: "",
  });

  const validateFields = () => {
    const newErrors = {};

    if (!TNamePattern.test(state.teamName)) {
      newErrors.teamName = "팀 이름은 1~15자의 한글, 영문, 숫자, 특수문자만 허용됩니다. 첫글자는 한글과 영어만 가능합니다.";
    }

    if (!TeamCodePattern.test(state.teamCode)) {
      newErrors.teamCode = "팀 코드는 1~20자의 영문, 숫자만 허용됩니다. 첫글자는 영문만 가능합니다.";
    }

    if (!TeamDescriptionPattern.test(state.teamDescription)) {
      newErrors.teamDescription = "팀 설명은 300자 미만으로 작성해주세요. (한글, 영문, 숫자, 특수문자, 공백 허용)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && validateFields()) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2 && validateFields()) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3 && validateFields()) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep > 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const closeTeamModal = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleCategoryClick = (item, type) => {
    let updatedItems;

    switch (type) {
      case "day":
        updatedItems = state.teamDay.includes(item)
          ? state.teamDay.filter((i) => i !== item)
          : [...state.teamDay, item];
        actions.changeTeamDay(updatedItems);
        break;
      case "time":
        updatedItems = state.teamTime.includes(item)
          ? state.teamTime.filter((i) => i !== item)
          : [...state.teamTime, item];
        actions.changeTeamTime(updatedItems);
        break;
      case "level":
        updatedItems = state.teamLevel.includes(item)
          ? state.teamLevel.filter((i) => i !== item)
          : [...state.teamLevel, item];
        actions.changeTeamLevel(updatedItems);
        break;
      case "age":
        updatedItems = state.teamAge.includes(item)
          ? state.teamAge.filter((i) => i !== item)
          : [...state.teamAge, item];
        actions.changeTeamAge(updatedItems);
        break;
      default:
        break;
    }
  };

  const levels = ["비기너", "아마추어", "세미프로", "프로"];
  const dayoptions = ["월", "화", "수", "목", "금", "토", "일"];
  const timeoptions = ["06~10시", "10~18시", "18~24시", "모든 시간"];
  const cityoptions = ["서울"];
  const locoptions = [
    "강서구", "양천구", "구로구", "영등포구", "금천구", "동작구", "관악구", "서초구", "강남구", "송파구",
    "강동구", "은평구", "서대문구", "마포구", "종로구", "중구", "용산구", "도봉구", "강북구", "노원구", "중랑구",
    "동대문구", "광진구", "성동구", "성북구", "강북구",
  ];
  const ageoptions = ["10대", "20대", "30대", "40대", "50대↑"];
  const genderoptions = ["남성", "여성", "혼성"];

  if (!user) {
    return (
      <Modal isOpen={isOpen} closeModal={closeTeamModal}>
        <h2>로그인이 필요합니다.</h2>
        <p>팀 생성을 위해 먼저 로그인해주세요.</p>
        <Button color="var(--main-color)" size="large" to="/login">
          로그인 페이지로 이동
        </Button>
      </Modal>
    );
  }

  return (
    <>
      {user.myTeam ? (
        <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
          <h2>{user.myTeam}팀에 가입되어 있습니다.</h2>
          <p style={{ marginBottom: "1rem" }}>팀 생성을 위해 팀을 탈퇴해주세요.</p>
          <Button color="var(--main-color)" size="large" to="/team">
            확인
          </Button>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} closeModal={closeTeamModal}>
          {currentStep === 1 && (
            <TeamNameCodeInput
              teamName={state.teamName}
              teamCode={state.teamCode}
              setTeamName={actions.changeTeamName}
              setTeamCode={actions.changeTeamCode}
              teamNameError={errors.teamName}
              teamCodeError={errors.teamCode}
            />
          )}
          {currentStep === 2 && <TeamImageInput teamImg={state.teamImg} setTeamImg={actions.changeTeamImg} />}
          {currentStep === 3 && (
            <TeamDescriptionInput
              teamDescription={state.teamDescription}
              setTeamDescription={actions.changeTeamDescription}
              teamDescriptionError={errors.teamDescription}
            />
          )}
          {currentStep === 4 && (
            <TeamLevel
              levels={levels}
              teamLevel={state.teamLevel}
              handleCategoryClick={handleCategoryClick}
            />
          )}
          {currentStep === 5 && (
            <TeamTime
              dayoptions={dayoptions}
              timeoptions={timeoptions}
              teamDay={state.teamDay}
              teamTime={state.teamTime}
              handleCategoryClick={handleCategoryClick}
            />
          )}
          {currentStep === 6 && (
            <TeamLocation
              cityoptions={cityoptions}
              locoptions={locoptions}
              teamCity={state.teamCity}
              teamLoc={state.teamLoc}
              setTeamCity={actions.changeTeamCity}
              setTeamLoc={actions.changeTeamLoc}
            />
          )}
          {currentStep == 7 && (
            <TeamMemberGender
              ageoptions={ageoptions}
              genderoptions={genderoptions}
              teamAge={state.teamAge}
              teamGender={state.teamGender}
              setTeamGender={actions.changeTeamGender}
              handleCategoryClick={handleCategoryClick}
            />
          )}
          {currentStep == 8 && <TeamCreationEnd />}
          <div
            style={{
              marginTop: "20px",
              display: currentStep > 1 && currentStep < 8 ? "flex" : "block",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {currentStep > 1 && currentStep < 8 && (
              <Button color="var(--main-color)" size="large" onClick={handlePrev}>
                이전
              </Button>
            )}
            {currentStep < 8 ? (
              <Button color="var(--main-color)" size="large" onClick={handleNext}>
                다음
              </Button>
            ) : (
              <Button color="var(--main-color)" size="large" to="/">
                돌아가기
              </Button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default TeamCreation;
