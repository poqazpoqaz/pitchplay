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

function TeamMatchingDetail({ gridArea }) {
    const { matchingNum } = useParams();
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
                    matchingActions.changeMatchingNumber(selectedMatchingData.matchingNum);
                    // 첫번째 팀 저장
                    matchingActions.changeTeamName('team1', selectedMatchingData.teams.team1.name);
                    matchingActions.changeTeamImg('team1', selectedMatchingData.teams.team1.src);

                    //두번째 팀 저장
                    matchingActions.changeTeamName('team2', selectedMatchingData.teams.team2.name);
                    matchingActions.changeTeamImg('team2', selectedMatchingData.teams.team2.src);

                    //팀 구성
                    matchingActions.changeTeamGender(selectedMatchingData.gender);
                    matchingActions.changeMatchingDate(selectedMatchingData.matchingDate);
                    matchingActions.changeTeamSize(selectedMatchingData.teamSize);

                    //매칭하는 경기장이름 & ID
                    matchingActions.changeMatchingLoc(selectedMatchingData.location);
                    matchingActions.changeStadiumId(selectedMatchingData.stadiumId);
                    matchingActions.changeTeamLevel(selectedMatchingData.level);
                    matchingActions.changeViewCount(selectedMatchingData.views);
                    matchingActions.changeWrittenDate(selectedMatchingData.writtenDate);
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

    // 유저 데이터 불러오기 (임의로 값 설정해놓음 나중에는 해당하는 유저 불러오게 해야함 )
    useEffect(() => {
        axios.get("/data/userData.json")
            .then(response => {
                const datas = response.data;
                const selectedUser = datas.find(data => data.userNumber = "123123");
                userActions.changeUserNumber(selectedUser.userNumber);
                userActions.changeUserCash(selectedUser.userCash);
            })
    }, [])

    // stadiumCost를 2로 나누어 전달
    const adjustedStadiumCost =  Math.round(+stadiumState.stadiumCost / 2  / 100) * 100;

   

    // 매칭 날짜 포맷 (yyyy-MM-dd 형식으로)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줌
        const day = String(date.getDate()).padStart(2, '0'); // 일 부분도 두 자릿수로 맞춤
        return `${year}-${month}-${day}`; // 년-월-일 형식으로 반환
    };

    const formattedMatchingDate = formatDate(matchingState.matchingDate);

    return (
        <div className={styles['matchingdetail-grid']} style={{ gridArea: gridArea }}>
            <img src={stadiumState.stadiumImg} />
            <MatchingDetails
                teamGender={matchingState.gender}
                teamSize={matchingState.teamSize}
                matchingLoc={matchingState.location}
                matchingDate={formattedMatchingDate}
                gridArea="matchinginfo" />
            <MatchingTeamDetails teams={matchingState.teams} gridArea="teamMatching" />
            <MatchingStadiumDetails stadiumState={stadiumState} gridArea="map" />
            <MatchingApplicationDetails
                matchingLoc={matchingState.location}
                teamSize={matchingState.teamSize}
                matchingDate={formattedMatchingDate}
                matchingCost={adjustedStadiumCost}
                gridArea="application"
                onClick={() => setIsModalOpen(true)} />
            <MatchingPayment 
            isOpen={isModalOpen} 
            closeModal={() => setIsModalOpen(false)} 
            userCash={userState.userCash} 
            stadiumCost={adjustedStadiumCost}
            to={"/team"}/>
        </div>
    )
}

export default TeamMatchingDetail;
