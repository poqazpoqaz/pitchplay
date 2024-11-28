import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StadiumDetail.module.css';
import KakaoMap from './KakaoMap';
import ReservationModal from '../../components/StadiumReservation/ReservationModal/ReservationModal';

function StadiumDetail() {
    const { id } = useParams();
    const [stadiumData, setStadiumData] = useState(null);
    const [isAddressCopied, setIsAddressCopied] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reservedTimeSlots, setReservedTimeSlots] = useState({});

    useEffect(() => {
        fetch('/data/stadiumData.json')
            .then(response => response.json())
            .then(data => {
                const selectedStadium = data.find(stadium => stadium.SVCID === id);
                setStadiumData(selectedStadium);
            })
            .catch(error => console.error('Error loading stadium data:', error));
    }, [id]);

    if (!stadiumData) {
        return <div>Loading...</div>;
    }

    const handleCopyAddress = () => {
        if (stadiumData && stadiumData.PLACENM) {
            navigator.clipboard.writeText(stadiumData.PLACENM)
                .then(() => setIsAddressCopied(true))
                .catch(() => setIsAddressCopied(false));
        }
    };

    const handleShowMap = () => {
        setShowMap((prev) => !prev);
    };

    const handleShowModal = () => {
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
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img src={stadiumData.IMGURL} alt={`${stadiumData.SVCNM} 이미지`} className={styles.stadiumImage} />
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.infoWrapper}>
                    <h2>{stadiumData.SVCNM}</h2>
                    <p><strong>구장 주소:</strong> {stadiumData.PLACENM}</p>
                    <div className={styles.dtlContentWrapper}>
                        <h3>구장 소개</h3>
                        {stadiumData.DTLCONT ? (
                            parseDetailContent(stadiumData.DTLCONT).map((item, index) => (
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
                        <li><strong>구장이름:</strong> {stadiumData.SVCNM}</li>
                        <li><strong>구장 주소:</strong> {stadiumData.PLACENM}</li>
                        <li><strong>이용 요금:</strong> {stadiumData.PAYATNM}</li>
                        <li><strong>운영 시간:</strong> {stadiumData.V_MIN} ~ {stadiumData.V_MAX}</li>
                    </ul>
                    <button className={styles.copyButton} onClick={handleCopyAddress}>
                        {isAddressCopied ? '주소가 복사되었습니다!' : '주소 복사'}
                    </button>
                    <button className={styles.copyButton} onClick={handleShowMap}>
                        지도 보기
                    </button>
                    {showMap && (
                        <div>
                            <KakaoMap lat={stadiumData.Y} lng={stadiumData.X} />
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
            />
        </div>
    );
}

export default StadiumDetail;
