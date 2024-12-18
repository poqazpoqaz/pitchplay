import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import styles from './StadiumDetail.module.css';
import KakaoMap from './KakaoMap';
import ReservationModal from '../../components/StadiumReservation/ReservationModal/ReservationModal';
import { useStore } from "../../stores/StadiumStore/useStore";

function StadiumDetail({ gridArea }) {
    const { stadiumId } = useParams();
    const { state, actions } = useStore();
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reservedTimeSlots, setReservedTimeSlots] = useState({});
    const [isAddressCopied, setIsAddressCopied] = useState(false);

    useEffect(() => {
        fetch('/data/stadiumData.json')
            .then(response => response.json())
            .then(data => {
                const selectedStadium = data.find(stadium => stadium.SVCID === stadiumId);
                actions.changeStadiumName(selectedStadium.SVCNM);
                actions.changeStadiumImg(selectedStadium.IMGURL)
                actions.changeStadiumAddress(selectedStadium.PLACENM);
                actions.changeStadiumDescription(selectedStadium.DTLCONT);
                actions.changeStadiumX(selectedStadium.X);
                actions.changeStadiumY(selectedStadium.Y);
                actions.changeStadiumCost(selectedStadium.PAYATNM);
                actions.changeStadiumVmin(selectedStadium.V_MIN);
                actions.changeStadiumVmax(selectedStadium.V_MAX);
            })
            .catch(error => console.error('Error loading stadium data:', error));
    }, [stadiumId]);

    if (!state) {
        return <div>Loading...</div>;
    }

    const handleCopyAddress = () => {
        if (state.stadiumAddress) {
            navigator.clipboard.writeText(state.stadiumAddress)
                .then(() => setIsAddressCopied(true))
                .catch(() => setIsAddressCopied(false));
        }
    };

    const handleShowMap = () => {
        setShowMap((prev) => !prev);
    };

    const handleShowModal = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // DTLCONT 분석 및 분리
    const parseDetailContent = (dtlContent) => {
        if (typeof dtlContent === 'string') {
            // 문자열을 줄 단위로 분리
            const lines = dtlContent.split('\n').map(line => line.trim()).filter(Boolean);
            return [
                {
                    title: '구장 소개',
                    content: lines
                }
            ];
        } else if (Array.isArray(dtlContent)) {
            // JSON 포맷인 경우, 적절히 제목과 내용을 나누어 반환
            return dtlContent.map(item => ({
                title: item.title || '제목 없음',
                content: item.content || []
            }));
        } else {
            return [
                {
                    title: '구장 소개',
                    content: []
                }
            ];
        }
    };

    return (
        <div className={styles.container} style={{ gridArea: gridArea }}>
            <div className={styles.imageSection}>
                <img src={state.stadiumImg} alt={`${state.stadiumName} 이미지`} className={styles.stadiumImage} />
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.infoWrapper}>
                    <h2>{state.stadiumName}</h2>
                    <p><strong>구장 주소:</strong> {state.stadiumAddress}</p>
                    <div className={styles.dtlContentWrapper}>
                        <h3>구장 소개</h3>
                        {state.stadiumDescription ? (
                            parseDetailContent(state.stadiumDescription).map((item, index) => (
                                <div key={index} className={styles.dtlContentSection}>
                                    <h4 className={styles.dtlTitle}>{item.title}</h4>
                                    <ul className={styles.dtlContentList}>
                                        {item.content.map((line, idx) => (
                                            <li key={idx} className={styles.dtlContentItem}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>구장에 대한 정보가 없습니다.</p>
                        )}
                    </div>
                </div>

                <div className={styles.rightSidebar}>
                    <h3>구장 정보</h3>
                    <ul>
                        <li><strong>구장이름:</strong> {state.stadiumName}</li>
                        <li><strong>구장 주소:</strong> {state.stadiumAddress}</li>
                        <li><strong>이용 요금:</strong> {state.stadiumCost}</li>
                        <li><strong>운영 시간:</strong> {state.stadiumVmin} ~ {state.stadiumVmax}</li>
                    </ul>
                    <button className={styles.copyButton} onClick={handleCopyAddress}>
                        {isAddressCopied ? '주소가 복사되었습니다!' : '주소 복사'}
                    </button>
                    <button className={styles.copyButton} onClick={handleShowMap}>
                        지도 보기
                    </button>
                    {showMap && (
                        <div>
                            <KakaoMap lat={state.stadiumY} lng={state.stadiumX} />
                        </div>
                    )}
                    <button className={styles.reserveButton} onClick={handleShowModal}>
                        예약하기
                    </button>
                </div>
            </div>

            <ReservationModal
                isOpen={showModal}
                closeModal={handleCloseModal}
                reservedTimeSlots={reservedTimeSlots}
                setReservedTimeSlots={setReservedTimeSlots}
                stadiumCost={state.stadiumCost} // 수정한거임
            />
        </div>
    );
}

export default StadiumDetail;
