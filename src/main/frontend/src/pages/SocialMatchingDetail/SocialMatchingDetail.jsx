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
    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 user가져옴

    const { state: stadiumState, actions: stadiumActions } = StadiumStore();
    const { state: socialState, actions: socialActions } = SocialReservationStore();
    const { state: userState, actions: userActions } = UserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);


    // 유저 데이터 불러오기 (소셜매칭 신청할 때 캐시)
    useEffect(() => {
        if (user) { // Only fetch user data if user exists
            axios.get("/data/userData.json")
                .then(response => {
                    const datas = response.data;
                    const selectedUser = datas.find(data => data.userNumber === user.userNumber);

                    if (selectedUser) {
                        userActions.updateAllFields(selectedUser);
                    } else {
                        console.log("로그인이 되어 있지 않습니다.");
                    }
                });
        }
    }, []);

    // 예약 데이터 불러오기
    useEffect(() => {
        axios.get("/data/socialData.json")
            .then(response => {
                const datas = response.data;
                const socialData = datas.find(data => data.socialNumber === socialNumber);

                if (socialData) {
                    socialActions.updateAllFields(socialData)
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

        // 지원하기 클릭 시 유저 로그인 여부 확인
    const handleApplicationClick = () => {
            if (!user) {
                // 유저 정보가 없으면 로그인 페이지로 리디렉션
                window.location.href = "/login";
            } else {
                // 유저가 로그인되어 있다면 모달 열기
                setIsModalOpen(true);
            }
   };

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
                socialMembers={socialState.currentMember || []} // 기본값으로 빈 배열 제공
            />
            <MatchingStadiumDetails
                stadiumState={stadiumState}
                gridArea="map" />
            <MatchingPayment
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                userCash={user.userCash}
                stadiumCost={adjustedStadiumCost}
                to="/social"
            />
            <MatchingApplicationDetails
                matchingLoc={stadiumState.stadiumName}
                teamSize={socialState.socialSize}
                matchingDate={formattedMatchingDate}
                matchingCost={formatCurrency(adjustedStadiumCost)}
                onClick={handleApplicationClick}
                gridArea="application"
            />

        </div>
    )
}

export default SocialMatchingDetail;