import CircleImg from "../CircleImg";
import styles from "./TeamProfile.module.css";
import TeamProfileText from "./TeamProfileText";

function TeamProfile({ content, gridArea }) {
  // content가 없을 경우 로딩 중 처리
  if (!content) {
    return <div>로딩 중...</div>;
  }

  // 구조 분해 할당
  const {
    teamImg,
    teamName,
    currentMember,
    totalMember,
    teamCity,
    teamLoc,
    teamGender,
    teamLevel,
    teamDay,
  } = content;

  return (
    <div className={styles["teamprofile-grid"]} style={{ gridArea: gridArea }}>
      <CircleImg src={teamImg} gridArea="img" />
      <div className={styles["teamprofile-title"]}>
        <h3>{teamName}</h3>
        <h3>
          （{currentMember} / {totalMember}명）
        </h3>
      </div>
      <div className={styles["teamprofile-content"]}>
        <TeamProfileText content="활동 위치">
          {teamCity} {teamLoc}
        </TeamProfileText>
        <TeamProfileText content="활동 요일">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <p
              key={day}
              style={{
                color:
                  Array.isArray(teamDay) && teamDay.includes(day)
                    ? "#512DD3"
                    : "black", // teamDay가 배열일 때만 includes 사용
              }}
            >
              {day}
            </p>
          ))}
        </TeamProfileText>
        <TeamProfileText content="팀원 구성">{teamGender}</TeamProfileText>
        <TeamProfileText content="팀 레 벨">{teamLevel}</TeamProfileText>
      </div>
    </div>
  );
}

export default TeamProfile;
