import GuestPlayerRecruitmentItem from "./GuestPlayerRecruitmentItem";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CircleImg from "../CircleImg";
import Button from "../Button";
import DisabledButton from "../DisabledButton";
import styles from "./GuestPlayerRecruitment.module.css"

function GuestPlayerRecruitment({ content }) {
    const [isFull, setIsFull] = useState(false);

    // content 변경 시 isFull 상태를 업데이트
    useEffect(() => {
        if (content.currentMembers && content.totalMembers) {
            const isFullCapacity = content.currentMembers / content.totalMembers === 1;
            setIsFull(isFullCapacity);
        }
    }, [content]); // content가 변경될 때마다 실행

    // 날짜 포맷 함수
    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = {
            weekday: 'long', // 요일
            year: 'numeric', // 년도
            month: 'long',   // 월
            day: 'numeric',  // 일
            hour: '2-digit', // 시간
            minute: '2-digit' // 분
        };

        // 로컬 시간대에서 포맷한 날짜 문자열을 반환
        return date.toLocaleString('ko-KR', options);
    }

    // 날짜 포맷 적용
    const formattedDate = formatDate(content.date);

    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}  // Hover 시 확대와 그림자
            transition={{ type: "spring", stiffness: 300, damping: 20 }}  // 애니메이션 전환
            className={styles['guestplayer-grid']}
        >

            <CircleImg src={content.src} gridArea="img"/>

            <GuestPlayerRecruitmentItem
                date={formattedDate} // 포맷된 날짜 전달
                location={content.location}
                currentMembers={content.currentMembers}
                totalMembers={content.totalMembers}
                team={content.team}
                gender={content.gender}
                teamSize={content.teamSize}
                gridArea="text"
            />

            {!isFull ? (
                <Button color="var(--main-color)" size="medium" gridArea="btn">
                    지원하기
                </Button>
            ) : (
                <DisabledButton size="medium" gridArea="btn">
                    정원마감
                </DisabledButton>
            )}
        </motion.div>
    );
}

export default GuestPlayerRecruitment;