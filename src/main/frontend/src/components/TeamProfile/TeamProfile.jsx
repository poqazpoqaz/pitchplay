import CircleImg from "../CircleImg";
import styles from "./TeamProfile.module.css"
import TeamProfileText from "./TeamProfileText";

function TeamProfile({ content, gridArea }) {
    return (
        <div className={styles['teamprofile-grid']} style={{ gridArea: gridArea }}>
            <CircleImg src={content.teamImg} gridArea="img" />
            <div className={styles['teamprofile-title']}>
                <h3>{content.teamName}</h3>
                <h3>（{content.currentMember} / {content.totalMember}명）</h3>
            </div>
            <div className={styles['teamprofile-content']}>
                <TeamProfileText content="활동 위치">{content.teamCity} {content.teamLoc}</TeamProfileText>
                <TeamProfileText content="활동 요일">
                    {/* 요일마다 색깔을 다르게 표시 */}
                    {["월", "화", "수", "목", "금", "토", "일"].map(day => (
                        <p key={day} style={{ color: content.teamDay.includes(day) ? '#512DD3' : 'black' }}>
                            {day}
                        </p>
                    ))}
                </TeamProfileText>
                <TeamProfileText content="팀원 구성">{content.teamGender}</TeamProfileText>
                <TeamProfileText content="팀 레 벨">{content.teamLevel}</TeamProfileText>
            </div>
        </div>
    );
}

export default TeamProfile;