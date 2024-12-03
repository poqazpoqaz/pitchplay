import { useStore as StadiumStore } from "../../stores/StadiumStore/useStore";
import { useStore as SocialReservationStore } from "../../stores/SocialStore/useStore";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useEffect, useState } from "react";
import styles from "./SocialMatchingDetail.module.css";
import MatchingDetails from "../../components/MatchingDetails/MatchingDetails";
import MatchingStadiumDetails from "../../components/MatchingDetails/MatchingStadiumDetails";
import { useParams } from "react-router-dom";
import axios from "axios";
import MatchingPayment from "../../components/MatchingPayment";
import MatchingApplicationDetails from "../../components/MatchingDetails/MatchingApplicationDetails";
import SocialMember from "../../components/SocialMember";
import { formattedDate } from "../../utils/formattedDate";
import { formatCurrency } from "../../utils/formattedDate";


function SocialMatchingDetail({ gridArea }) {
    const { socialNumber } = useParams();

    const { state: stadiumState, actions: stadiumActions } = StadiumStore();
    const { state: socialState, actions: socialActions } = SocialReservationStore();
    const { state: userState, actions: userActions } = UserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);


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

    // 예약 데이터 불러오기
    useEffect(() => {
        axios.get("/data/socialData.json")
            .then(response => {
                const datas = response.data;
                const socialData = datas.find(data => data.socialNumber === socialNumber);

                if (socialData) {
                    socialActions.changeSocialNumber(socialData.socialNumber);
                    socialActions.changeUserId(socialData.id);
                    socialActions.changeStadiumId(socialData.stadiumId);
                    socialActions.changeSocialGender(socialData.socialGender);
                    socialActions.changeActiveStatus(socialData.activeStatus);
                    socialActions.changeSocialSize(socialData.socialSize);
                    socialActions.changeSocialLevel(socialData.socialLevel);
                    socialActions.changeSocialTime(socialData.socialTime);
                    socialActions.changeWrittenDate(socialData.writtenData);
                    socialActions.changeViewCount(socialData.viewCount);
                    socialActions.changeActiveStatus(socialData.activeStatus);
                    socialActions.changeCurrentMember(socialData.currentMember);
                    socialActions.changeTotalMember(socialData.totalMember);
                } else {
                    console.log("해당 예약을 찾을 수 없습니다.");
                }

            })
            .catch(error => {
                console.error("데이터 로딩 실패:", error);
            });
    }, [socialNumber])

    // 구장데이터불러오기 
    useEffect(() => {
        if (socialState.stadiumId) {
            axios.get("/data/stadiumData.json")
                .then(response => {
                    const datas = response.data;
                    const selectedStadium = datas.find(stadium => stadium.SVCID === socialState.stadiumId);
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
                })
                .catch(error => console.error('Error loading stadium data:', error));
        }
    }, [socialState.stadiumId]);


    // 팀 사이즈에 따른 경기장 비용 조정
    let divisor = 1;
    switch (socialState.socialSize) {
        case '4vs4':
            divisor = 8;
            break;
        case '5vs5':
            divisor = 10;
            break;
        case '6vs6':
            divisor = 12;
            break;
        case '7vs7':
            divisor = 14;
            break;
        case '11vs11':
            divisor = 22;
            break;
        default:
            divisor = 1; // 기본값 설정
            break;
    }

    // stadiumCost를 divisor로 나누기
    const adjustedStadiumCost = Math.round(+stadiumState.stadiumCost / divisor / 100) * 100;

    const formattedMatchingDate = formattedDate(socialState.socialTime);

    return (
        <div className={styles['social-detail-grid']} style={{ gridArea: gridArea }}>
            <img src={stadiumState.stadiumImg} />
            <MatchingDetails
                teamGender={socialState.socialGender}
                teamSize={socialState.socialSize}
                matchingLoc={stadiumState.stadiumName}
                matchingDate={formattedMatchingDate}
                gridArea="matchinginfo"
            />
            <SocialMember
                gridArea="teamMatching"
                socialMembers={socialState.currentMember}
            />
            <MatchingStadiumDetails
                stadiumState={stadiumState}
                gridArea="map" />
            <MatchingPayment
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                userCash={userState.userCash}
                stadiumCost={adjustedStadiumCost}
                to="/social"
            />
            <MatchingApplicationDetails
                matchingLoc={stadiumState.stadiumName}
                teamSize={socialState.socialSize}
                matchingDate={formattedMatchingDate}
                matchingCost={formatCurrency(adjustedStadiumCost)}
                onClick={() => setIsModalOpen(true)}
                gridArea="application"
            />

        </div>
    )
}

export default SocialMatchingDetail;