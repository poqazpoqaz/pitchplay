import axios from "axios";
import styles from "./TeamMatchingDetail.module.css";
import { useEffect, useState } from "react";
import { useStore as StadiumStore } from "../../stores/StadiumStore/useStore";
import { useStore as MatchingStore } from "../../stores/MatchingStore/useStore";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useParams } from "react-router-dom";
import MatchingDetails from "../../components/MatchingDetails/MatchingDetails";
import MatchingTeamDetails from "../../components/MatchingDetails/MatchingTeamDetails";
import MatchingStadiumDetails from "../../components/MatchingDetails/MatchingStadiumDetails";
import MatchingApplicationDetails from "../../components/MatchingDetails/MatchingApplicationDetails";
import MatchingPayment from "../../components/MatchingPayment";
import { formattedDate } from "../../utils/formattedDate";
import { formatCurrency } from "../../utils/formattedDate";

function TeamMatchingDetail({ gridArea }) {
    const { matchingNum } = useParams();
    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 user가져옴

    const { state: matchingState, actions: matchingActions } = MatchingStore();
    const { state: stadiumState, actions: stadiumActions } = StadiumStore();
    const { state: userState, actions: userActions } = UserStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    //매칭데이터불러오기
    useEffect(() => {
        axios.get("/data/matchingData.json")
            .then(response => {
                const datas = response.data;
                const selectedMatchingData = datas.find(data => data.matchingNum == matchingNum)
                if (selectedMatchingData) {
                    matchingActions.updateAllFields(selectedMatchingData);
                }
            })
    }, [matchingNum])

    // 구장데이터불러오기
    useEffect(() => {
        if (matchingState.stadiumId) {
            axios.get("/data/stadiumData.json")
                .then(response => {
                    const datas = response.data;
                    const selectedStadium = datas.find(data => data.SVCID === matchingState.stadiumId);
                    if (selectedStadium) {
                        stadiumActions.changeStadiumId(selectedStadium.SVCID);
                        stadiumActions.changeStadiumName(selectedStadium.SVCNM);
                        stadiumActions.changeStadiumImg(selectedStadium.IMGURL)
                        stadiumActions.changeStadiumAddress(selectedStadium.PLACENM);
                        stadiumActions.changeStadiumDescription(selectedStadium.DTLCONT);
                        stadiumActions.changeStadiumX(selectedStadium.X);
                        stadiumActions.changeStadiumY(selectedStadium.Y);
                        stadiumActions.changeStadiumCost(selectedStadium.PAYATNM);
                        stadiumActions.changeStadiumVmin(selectedStadium.V_MIN);
                        stadiumActions.changeStadiumVmax(selectedStadium.V_MAX);
                    }
                })
                .catch(error => console.error('Error loading stadium data:', error));
        }
    }, [matchingState.stadiumId]);

    // 유저 데이터 불러오기
    useEffect(() => {
        if (user) {
            axios.get("/data/userData.json")
                .then(response => {
                    const datas = response.data;
                    const selectedUser = datas.find(data => data.userNumber === user.userNumber);
                    if (selectedUser) {
                        userActions.changeUserNumber(selectedUser.userNumber);
                        userActions.changeUserCash(selectedUser.userCash);
                    }
                });
        }
    }, [user.userNumber]);


    // 신청하기 클릭 시 유저 로그인 여부 확인
    const handleApplicationClick = () => {
        if (!user) {
            // 유저 정보가 없으면 로그인 페이지로 리디렉션
            window.location.href = "/login";
        } else {
            // 유저가 로그인되어 있다면 모달 열기
            setIsModalOpen(true);
        }
    };

    // stadiumCost를 2로 나누어 전달
    const adjustedStadiumCost = Math.round(+stadiumState.stadiumCost / 2 / 100) * 100;

    // 날짜 변환
    const formattedMatchingDate = formattedDate(matchingState.matchingDate);

    return (
        <div className={styles['matchingdetail-grid']} style={{ gridArea: gridArea }}>
            <img src={stadiumState.stadiumImg} />
            <MatchingDetails
                teamGender={matchingState.gender}
                teamSize={matchingState.teamSize}
                matchingLoc={matchingState.location}
                matchingDate={formattedMatchingDate}
                gridArea="matchinginfo" />
            <MatchingTeamDetails
                teams={matchingState.teams || []} // 기본값 빈 배열
                gridArea="teamMatching"
            />
            <MatchingStadiumDetails stadiumState={stadiumState} gridArea="map" />
            <MatchingApplicationDetails
                matchingLoc={matchingState.location}
                teamSize={matchingState.teamSize}
                matchingDate={formattedMatchingDate}
                matchingCost={formatCurrency(adjustedStadiumCost)}
                gridArea="application"
                onClick={handleApplicationClick} />
            <MatchingPayment
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                userCash={user.userCash}
                stadiumCost={adjustedStadiumCost}
                to={"/team"} />
        </div>
    )
}

export default TeamMatchingDetail;
