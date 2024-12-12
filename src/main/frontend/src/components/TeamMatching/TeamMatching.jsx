import TeamMatchingItem from "./TeamMatchingItem";
import CircleImg from "../CircleImg";
import Button from "../Button";
import styles from "./TeamMatching.module.css";
import { motion } from "framer-motion";

function TeamMatching({ content }) {
    const { teams, matchingDate, locDetail, location,gender, level, views } = content;
    const team1 = teams.team1; // 팀 1 정보
    const team2 = teams.team2; // 팀 2 정보

    return (
        <div className={styles["matching-box"]}>
            {/* 상태 텍스트 */}
            <div className={styles["matching-top"]}>
                {team2.name && team2.name !== "null" ? "매칭완료" : "신청가능"}
            </div>
            <motion.div
                className={styles["matching-grid"]}
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* 팀 1 이미지 */}
                <CircleImg src={team1.src} alt={`${team1.name} 이미지`} gridArea="team1" />

                {/* 매칭 아이템 */}
                <TeamMatchingItem
                    team1={team1.name}
                    team2={team2.name !== "null" ? team2.name : null}
                    date={matchingDate}
                    location={location}
                    locDetail={locDetail}
                    gender={gender}
                    level={level}
                    views={views}
                    gridArea="text"
                />
                {/* 팀 2 이미지 또는 버튼 */}
                {team2.name && team2.name !== "null" ? (
                    <CircleImg src={team2.src} alt={`${team2.name} 이미지`} gridArea="team2" />
                ) : (
                
                    <Button color="var(--main-color)" gridArea="team2" to={`/matching/${content.matchingNum}`}>
                        신청하기
                    </Button>
                )}
            </motion.div>
        </div>
    );
}

export default TeamMatching;