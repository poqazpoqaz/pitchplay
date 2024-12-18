import DisabledButton from "../DisabledButton";
import Button from "../Button";
import CircleImg from "../CircleImg";
import styles from "./SocialMatching.module.css";
import SocialMatchingItem from "./SocialMatchingItem";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SocialMatching({ content, openModal }) {
    const navigate = useNavigate();  // useNavigate 훅 사용

    // localStorage에서 user 데이터를 안전하게 가져오기
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // user가 null인 경우 userCash에 안전하게 접근
    const userCash = user?.userCash || 0; // userCash가 없으면 0을 기본값으로 사용

    const currentCount = content.social.currentMember.length || 0;

    // '자세히 보기' 버튼 클릭 시 처리
    const handleViewDetailsClick = () => {
        if (!user) {
            // 로그인되지 않은 경우, 로그인 페이지로 이동
            navigate("/login");
        } else {
            // 로그인된 경우, 해당 소셜 매칭 상세 페이지로 이동
            navigate(`/social/${content.social.socialNumber}`);
        }
    };

    // 날짜 포맷 함수
    function formatDateWithDay(dateString) {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, "0");
        const dayOfWeek = daysOfWeek[date.getDay()]; // 요일 가져오기

        return `${year}-${month}-${day}(${dayOfWeek})`;
    }

    return (
        <motion.div
            className={styles['socialmatching-grid']}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}  // Hover 시 확대와 그림자
            transition={{ type: "spring", stiffness: 300, damping: 20 }}  // 애니메이션 전환
        >
            <CircleImg src={content.user.profileImg} gridArea="img" />
            <SocialMatchingItem
                gridArea="text"
                stadiumName={content.stadium.name}
                stadiumLoc={content.stadium.loc}
                currentCount={currentCount}
                totalMember={content.social.totalMember}
                gender={content.social.socialGender}
                views={content.social.viewCount}
                socialTime={formatDateWithDay(content.social.socialTime)}
            />

            {content.social.activeStatus === "false" ? (
                <Button color="var(--main-color)" size="medium" gridArea="btn1" onClick={openModal}>
                    신청하기
                </Button>
            ) : (
                <DisabledButton size="medium" gridArea="btn1">
                    정원마감
                </DisabledButton>
            )}

            <Button
                onClick={handleViewDetailsClick}  // 디테일 페이지로 이동
                color="var(--main-color)" size="medium" gridArea="btn2">
                자세히 보기
            </Button>
        </motion.div>
    );
}

export default SocialMatching;
