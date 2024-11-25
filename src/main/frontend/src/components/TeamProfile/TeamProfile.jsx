import CircleImg from "../CircleImg";
import styles from "./TeamProfile.module.css"
import TeamProfileText from "./TeamProfileText";

function TeamProfile({ contents, gridArea }) {
    return (
        <div className={styles['teamprofile-grid']} style={{ gridArea: gridArea }}>
            <CircleImg src={contents[2].src} gridArea="img" />
            <div className={styles['teamprofile-title']}>
                <h3>{contents[2].title}</h3>
                <h3>（{contents[2].currentMembers} / {contents[2].totalMembers}명）</h3>
            </div>
            <div className={styles['teamprofile-content']}>
                <TeamProfileText content="활동 위치">{contents[2].location}</TeamProfileText>
                <TeamProfileText content="활동 요일">
                    {/* 요일마다 색깔을 다르게 표시 */}
                    {["월", "화", "수", "목", "금", "토", "일"].map(day => (
                        <p key={day} style={{ color: contents[2].teamDay.includes(`${day}요일`) ? '#512DD3' : 'black' }}>
                            {day}
                        </p>
                    ))}
                </TeamProfileText>
                <TeamProfileText content="팀원 구성">{contents[2].gender}</TeamProfileText>
                <TeamProfileText content="팀 레 벨">{contents[2].level}</TeamProfileText>
            </div>
        </div>
    );
}

export default TeamProfile;