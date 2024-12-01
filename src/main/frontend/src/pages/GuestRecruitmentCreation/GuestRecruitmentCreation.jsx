import { useStore as ReservationStore } from "../../stores/ReservationStore/useStore";
import { useStore as CollectionStore } from "../../stores/CollectionStore/useStore";
import { useStore as TeamStore } from "../../stores/TeamStore/useStore";
import { useStore as StadiumStore } from "../../stores/StadiumStore/useStore";
import axios from "axios";

import { useState, useRef, useEffect } from "react";
import { postDescriptionPattern } from "../../utils/regExp";
import { useParams } from "react-router-dom";
import Alarm from "../../components/Alarm";
import styles from "./GuestRecruitmentCreation.module.css";
import ReservationDetail from "../../containers/ReservationDetail/ReservationDetail";
import Button from "../../components/Button";
import GuestRecruitmentCreationDetail from "../../containers/PostDetail/GuestRecruitmentCreationDetail";

function GuestRecruitmentCreation({ gridArea }) {
    const { state: collectionState, actions: collectionActions } = CollectionStore();
    const { state: stadiumState, actions: stadiumActions } = StadiumStore();
    const { state: reservationState, actions: reservationActions } = ReservationStore();
    const { state: teamStore, actions: teamActions } = TeamStore();

    // 해당하는 팀의 예약번호
    const { reservationNum } = useParams();

    // 알람 상태 관리
    const [isErrorAlarm, setIsErrorAlarmOpen] = useState(false); // 모집 인원 오류 알람
    const [isContentErrorAlarm, setContentErrorAlarmOpen] = useState(false); // 게시글 오류 알람
    const [isFirstAlarmOpen, setFirstAlarmOpen] = useState(false); // 첫 번째 알람
    const [isSecondAlarmOpen, setSecondAlarmOpen] = useState(false); // 두 번째 알람

    // Quill state
    const [editorContent, setEditorContent] = useState("");
    const quillRef = useRef(null); // Quill 인스턴스를 useRef로 관리

    // 예약 데이터, 팀, 모집, 구장 정보를 하나씩 불러옵니다.
    useEffect(() => {
        // 예약 데이터 불러오기
        axios.get("/data/reservationData.json")
            .then(response => {
                const reservationData = response.data.find(data => data.reservationNumber === reservationNum); // 예약번호로 데이터 찾기

                if (reservationData) {
                    // 예약 정보를 상태에 저장
                    reservationActions.changeCollectionNumber(reservationData.collectionNumber);
                    reservationActions.changeReservationDate(reservationData.reservationDate);
                    reservationActions.changeReservationNumber(reservationData.reservationNumber);
                    reservationActions.changeStadiumId(reservationData.stadiumId);
                    reservationActions.changeTeamCode(reservationData.teamCode);
                } else {
                    console.log("해당 예약을 찾을 수 없습니다.");
                }
            })
            .catch(error => {
                console.error("예약 데이터 로딩 실패:", error);
            });
    }, [reservationNum]);

    // 예약 데이터에서 추출한 collectionNumber로 모집 정보를 가져옵니다.
    useEffect(() => {
        if (reservationState.collectionNumber) {
            axios.get("/data/collectionsData.json")
                .then(response => {
                    const collectionData = response.data.find(data => data.collectionNumber === reservationState.collectionNumber);
                    if (collectionData) {
                        // 모집 정보 상태 업데이트
                        collectionActions.changeTeamCode(collectionData.teamCode);
                        collectionActions.changeCollectionDescription(collectionData.collectionDescription);
                        collectionActions.changeCollectionTime(collectionData.collectionTime);
                        collectionActions.changeCurrentMember(0);
                        collectionActions.changeTotalMember(collectionData.totalMember);
                        collectionActions.changeTeamName(collectionData.teamName);
                        collectionActions.changeTeamImg(collectionData.teamImg);
                        collectionActions.changeTeamCity(collectionData.teamCity);
                        collectionActions.changeTeamLoc(collectionData.teamLoc);
                        collectionActions.changeTeamGender(collectionData.teamGender);
                        collectionActions.changeViewCount(collectionData.viewCount);
                        collectionActions.changeActiveStatus(collectionData.activeStatus);
                        collectionActions.changeWrittenDate(collectionData.writtenDate);
                        collectionActions.changeTeamSize(collectionData.teamSize);
                        collectionActions.changeStadium(collectionData.stadiumId);
                    } else {
                        console.error("해당 모집 정보를 찾을 수 없습니다.");
                    }
                })
                .catch(error => {
                    console.error("모집 정보 로딩 실패:", error);
                });
        }
    }, [reservationState.collectionNumber]);

    // 예약 데이터에서 stadiumId로 구장 정보를 가져옵니다.
    useEffect(() => {
        if (reservationState.stadiumId) {
            axios.get("/data/stadiumData.json")
                .then(response => {
                    const stadiumData = response.data.find(stadium => stadium.SVCID === reservationState.stadiumId);
                    if (stadiumData) {
                        // 구장 정보 상태 업데이트
                        stadiumActions.changeStadiumName(stadiumData.SVCNM);
                        stadiumActions.changeStadiumImg(stadiumData.IMGURL);
                        stadiumActions.changeStadiumAddress(stadiumData.PLACENM);
                        stadiumActions.changeStadiumDescription(stadiumData.DTLCONT);
                        stadiumActions.changeStadiumX(stadiumData.X);
                        stadiumActions.changeStadiumY(stadiumData.Y);
                        stadiumActions.changeStadiumCost(stadiumData.PAYATNM);
                        stadiumActions.changeStadiumVmin(stadiumData.V_MIN);
                        stadiumActions.changeStadiumVmax(stadiumData.V_MAX);
                    } else {
                        console.error("해당 구장 정보를 찾을 수 없습니다.");
                    }
                })
                .catch(error => {
                    console.error("구장 데이터 로딩 실패:", error);
                });
        }
    }, [reservationState.stadiumId]);

    // 예약 데이터에서 teamCode로 팀 정보를 가져옵니다.
    useEffect(() => {
        if (reservationState.teamCode) {
            axios.get("/data/teamData.json")
                .then(response => {
                    const teamData = response.data.find(data => data.teamCode === reservationState.teamCode);
                    if (teamData) {
                        // 팀 정보 상태 업데이트
                        teamActions.changeTeamName(teamData.teamName);
                        teamActions.changeTeamCode(teamData.teamCode);
                        teamActions.changeTeamImg(teamData.teamImg);
                        teamActions.changeTeamDescription(teamData.teamDescription);
                        teamActions.changeTeamLevel(teamData.teamLevel);
                        teamActions.changeTeamDay(teamData.teamDay);
                        teamActions.changeTeamTime(teamData.teamTime);
                        teamActions.changeTeamCity(teamData.teamCity);
                        teamActions.changeTeamLoc(teamData.teamLoc);
                        teamActions.changeTeamAge(teamData.teamAge);
                        teamActions.changeTeamGender(teamData.teamGender);
                        teamActions.changeCurrentMember(teamData.currentMember);
                        teamActions.changeTotalMember(teamData.totalMember);
                    } else {
                        console.error("해당 팀 정보를 찾을 수 없습니다.");
                    }
                })
                .catch(error => {
                    console.error("팀 데이터 로딩 실패:", error);
                });
        }
    }, [reservationState.teamCode]);




    // 모집 멤버 수 변경
    const handleMemberChange = (e) => {
        const newMemberCount = +e.target.value;
        collectionActions.changeCurrentMember(newMemberCount);
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

        if (+collectionState.currentMember == null || +collectionState.currentMember <= 0 || +collectionState.currentMember > 11) {
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
            {console.log(collectionState)}
            <img src={stadiumState.stadiumImg} />
            <GuestRecruitmentCreationDetail
                quillRef={quillRef}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                stadiumContent={stadiumState}
                teamContent={teamStore}
                collectionContent={collectionState}
                handleMemberChange={handleMemberChange}
                gridArea="team"
            />
            <div style={{ gridArea: "reservation" }}>
                <ReservationDetail
                    reservationContent={reservationState}
                    stadiumContent={stadiumState} />
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