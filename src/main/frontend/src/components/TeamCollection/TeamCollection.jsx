// 나중에 데이터 연동할때 변수명 바꿔야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

import { useState, useEffect } from "react";
import DisabledButton from "../DisabledButton";
import Button from "../Button";
import CircleImg from "../CircleImg";
import styles from "./TeamCollection.module.css";
import TeamCollectionItem from "./TeamCollectionItem";
import { motion } from "framer-motion";

function TeamCollection({ src, content }) {
    const [isFull, setIsFull] = useState(false);

    // content 변경 시 isFull 상태를 업데이트
    useEffect(() => {
        if (content.currentMembers && content.totalMembers) {
            const isFullCapacity = content.currentMembers / content.totalMembers === 1;
            setIsFull(isFullCapacity);
        }
    }, [content]); // content가 변경될 때마다 실행

    return (
        <motion.div
            className={styles['teamcollection-grid']}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}  // Hover 시 확대와 그림자
            transition={{ type: "spring", stiffness: 300, damping: 20 }}  // 애니메이션 전환
        >

            <CircleImg src={src} gridArea="img" />
            <TeamCollectionItem
                title={content.title}
                currentMembers={content.currentMembers}
                totalMembers={content.totalMembers}
                location={content.location}
                gender={content.gender}
                views={content.views}
                gridArea="text"
            />
            {!isFull ? (
                <Button color="var(--main-color)" size="medium" gridArea="btn1">
                    신청하기
                </Button>
            ) : (
                <DisabledButton size="medium" gridArea="btn1">
                    정원마감
                </DisabledButton>
            )}
            <Button color="var(--main-color)" size="medium" gridArea="btn2">
                자세히 보기
            </Button>
        </motion.div>
    );
}

export default TeamCollection;