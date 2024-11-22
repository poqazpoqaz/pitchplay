import TeamMatchingItem from "./TeamMatchingItem";
import CircleImg from "../CircleImg";
import Button from "../Button";
import styles from "./TeamMatching.module.css";
import { motion } from "framer-motion";

function TeamMatching({ content }) {
    return (
        <motion.div
            className={styles['matching-box']}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}  // Hover 시 확대와 그림자
            transition={{ type: "spring", stiffness: 300, damping: 20 }}  // 애니메이션 전환
        >
            {/* 상태 텍스트 */}
            <div className={styles['matching-top']}>
                {content.team2 ? "매칭완료" : "신청가능"}
            </div>
            <div className={styles['matching-grid']}>
                {/* 팀 1 이미지 */}
                <CircleImg src={content.team1src} alt={`${content.team1} 이미지`} gridArea="team1" />

                {/* 매칭 아이템 */}
                <TeamMatchingItem
                    team1={content.team1}
                    team2={content.team2}
                    date={content.date}
                    location={content.location}
                    gender={content.gender}
                    level={content.level}
                    views={content.views}
                    gridArea="text"
                />

                {/* 팀 2 이미지 또는 버튼 */}
                {content.team2 ? (
                    <CircleImg src={content.team2src} alt={`${content.team2} 이미지`} gridArea="team2" />
                ) : (
                    <Button color="var(--main-color)" gridArea="team2">신청하기</Button>
                )}
            </div>
        </motion.div>
    );
}

export default TeamMatching;