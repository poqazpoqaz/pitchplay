import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import { useStore as CollectionStore } from "../../stores/CollectionStore/useStore";
import { useStore as TeamStore } from "../../stores/TeamStore/useStore";
import { useState, useRef, useEffect } from "react";
import { postDescriptionPattern } from "../../utils/regExp";
import { useParams } from "react-router-dom";
import Alarm from "../../components/Alarm";
import styles from "./GuestRecruitmentCreation.module.css";
import ReservationDetail from "../../containers/ReservationDetail/ReservationDetail";
import Button from "../../components/Button";
import GuestRecruitmentCreationDetail from "../../containers/PostDetail/GuestRecruitmentCreationDetail";

function GuestRecruitmentCreation({ gridArea }) {
    const { state: collectionStore, actions: collectionActions } = CollectionStore();
    const { state: recruitState, actions: recruitActions } = ReservationStore();
    const { state: teamStore, actions: teamActions } = TeamStore();

    // 해당하는 팀 번호의 새 게시물 작성
    const { teamNumber } = useParams();

    // collectionStore에서 teamNumber에 해당하는 데이터 필터링
    const [collectionData, setCollectionData] = useState("");

    // 알람 상태 관리
    const [isErrorAlarm, setIsErrorAlarmOpen] = useState(false); // 모집 인원 오류 알람
    const [isContentErrorAlarm, setContentErrorAlarmOpen] = useState(false); // 게시글 오류 알람
    const [isFirstAlarmOpen, setFirstAlarmOpen] = useState(false); // 첫 번째 알람
    const [isSecondAlarmOpen, setSecondAlarmOpen] = useState(false); // 두 번째 알람

    // Quill state
    const [editorContent, setEditorContent] = useState("");
    const quillRef = useRef(null); // Quill 인스턴스를 useRef로 관리

    useEffect(() => {
        const data = collectionStore.find((team) => team.teamNumber === teamNumber);
        setCollectionData(data);
    }, [teamNumber, collectionStore]);


    // 모집 멤버 수 변경
    const handleMemberChange = (e) => {
        const newMemberCount = +e.target.value;
        collectionActions.changeCurrentMember(teamNumber, newMemberCount);
    };

    // 퀼 저장
    const saveToFile = (editorContent) => {
        console.log(editorContent);

        //   // blob형식의 html파일로 editorContent 저장
        //   const file = new Blob([editorContent], { type: 'text/html' });

        //   // 파일업로드요청
        //   const formData = new FormData();
        //   formData.append('file', file);

        //   fetch('http://localhost:8080/saveFile', { method: 'POST', body: formData })
        //     .then(response => console.log(response)).
        //     then(() => { alert('파일 업로드 완료!'); })
        //     .catch(error => console.error('업로드 실패:', error));
    }

    // 첫 번째 알람에서 확인 버튼 클릭 시
    const handleFirstAlarmConfirm = () => {
        setFirstAlarmOpen(false);
        setSecondAlarmOpen(true); // 두 번째 알람 표시
    };

    // 두 번째 알람에서 확인 버튼 클릭 시
    const handleSecondAlarmConfirm = () => {
        setSecondAlarmOpen(false);
    };


    // 게시글 유효성 검사
    const validateContent = (content) => {
        return postDescriptionPattern.test(content); // 정규표현식 검사
    };

    const handleSave = () => {
        const isContentValid = validateContent(editorContent);
        if (!isContentValid) {
            setContentErrorAlarmOpen(true); // 게시글 유효성 검사 실패 시 오류 알람 표시
            return;
        }

        if (+collectionData.currentMember <= 0 || +collectionData.currentMember > 11) {
            setIsErrorAlarmOpen(true); // 모집 인원 유효성 검사
            return;
        }

        if (quillRef.current) {
            saveToFile(editorContent);
            setFirstAlarmOpen(true); // 작성 완료 알람 표시
        }
    };

    return (
        <div className={styles["recruitment-creation-grid"]} style={{ gridArea: gridArea }}>
            <img src={recruitState.stadiumImg} />
            <GuestRecruitmentCreationDetail
                quillRef={quillRef}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                recruitContent={recruitState}
                teamContent={teamStore}
                collectionContent={collectionData}
                handleMemberChange={handleMemberChange}
                gridArea="team"
            />
            <div style={{ gridArea: "reservation" }}>
                <ReservationDetail content={recruitState} />
                <Button
                    gridArea="btn"
                    color="var(--main-color)"
                    size="xlarge"
                    onClick={handleSave}
                >
                    작성완료
                </Button>
            </div>

            {/* 모집 인원 오류 알람 */}
            <Alarm
                isOpen={isErrorAlarm}
                closeAlarm={() => setIsErrorAlarmOpen(false)}
                onClick={() => setIsErrorAlarmOpen(false)}
                btntext="확인"
            >
                모집인원은 1명 이상 11명 이하로 설정해주세요.
            </Alarm>

            {/* 게시글 오류 알람 */}
            <Alarm
                isOpen={isContentErrorAlarm}
                closeAlarm={() => setContentErrorAlarmOpen(false)}
                onClick={() => setContentErrorAlarmOpen(false)}
                btntext="확인"
            >
                게시물은 100자 이상 2000자 미만으로 작성해주세요.
            </Alarm>

            {/* 첫 번째 알람 */}
            <Alarm
                isOpen={isFirstAlarmOpen}
                closeAlarm={() => setFirstAlarmOpen(false)}
                btntext="확인"
                onClick={handleFirstAlarmConfirm}
            >
                용병 공고 작성을 완료하시겠습니까?
            </Alarm>

            {/* 두 번째 알람 */}
            <Alarm
                isOpen={isSecondAlarmOpen}
                closeAlarm={() => setSecondAlarmOpen(false)}
                btntext="확인"
                onClick={handleSecondAlarmConfirm}
                to={"/team/guestplayer"}
            >
                용병 공고가 작성되었습니다.
            </Alarm>
        </div>
    );
}

export default GuestRecruitmentCreation;
