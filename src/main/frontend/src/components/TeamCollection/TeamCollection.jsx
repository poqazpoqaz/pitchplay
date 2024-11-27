import DisabledButton from "../DisabledButton";
import Button from "../Button";
import CircleImg from "../CircleImg";
import styles from "./TeamCollection.module.css";
import TeamCollectionItem from "./TeamCollectionItem";
import { motion } from "framer-motion";
import { useState } from "react";
import JoinRequestModal from "../JoinRequestModal";

function TeamCollection({ content }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기/닫기 함수
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <motion.div
            className={styles['teamcollection-grid']}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}  // Hover 시 확대와 그림자
            transition={{ type: "spring", stiffness: 300, damping: 20 }}  // 애니메이션 전환
        >

            <CircleImg src={content.teamImg} gridArea="img" />
            <TeamCollectionItem
                title={content.collectionTitle}
                currentMember={content.currentMember}
                totalMember={content.totalMember}
                city={content.teamCity}
                loc={content.teamLoc}
                gender={content.teamGender}
                views={content.viewCount}
                gridArea="text"
            />
            {content.activeStatus == "false" ? (
                <Button color="var(--main-color)" size="medium" gridArea="btn1" onClick={openModal}>
                    신청하기
                </Button>
            ) : (
                <DisabledButton size="medium" gridArea="btn1">
                    정원마감
                </DisabledButton>
            )}
            <Button color="var(--main-color)" size="medium" gridArea="btn2" to="/team/application">
                자세히 보기
            </Button>

            {isModalOpen && <JoinRequestModal isOpen={isModalOpen} closeModal={closeModal}/>}
        </motion.div>
    );
}

export default TeamCollection;