import React, { useState, useEffect } from 'react';
import styles from './StadiumDetail.module.css';

function StadiumDetail() {
    const [stadiumData, setStadiumData] = useState(null); // JSON 데이터 상태
    const [isAddressCopied, setIsAddressCopied] = useState(false); // 주소 복사 여부 상태

    // stadiumData.json 파일을 불러옴
    useEffect(() => {
        fetch('/data/stadiumData.json')
            .then((response) => response.json())
            .then((data) => setStadiumData(data))
            .catch((error) => console.error('Error loading stadium data:', error));
    }, []);

    // 주소 복사 기능
    const handleCopyAddress = () => {
        if (stadiumData && stadiumData.PLACENM) {
            navigator.clipboard.writeText(stadiumData.PLACENM)
                .then(() => setIsAddressCopied(true))
                .catch(() => setIsAddressCopied(false));
        }
    };

    // 데이터가 로딩 중일 경우 처리
    if (!stadiumData) {
        return <div>Loading...</div>; // 로딩 중일 때 "Loading..." 메시지를 보여줌
    }

    // 구장 주소로 구글 지도 열기
    const openGoogleMap = () => {
        if (stadiumData && stadiumData.PLACENM) {
            // 구장 주소로 구글 지도 열기
            const googleMapUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(stadiumData.PLACENM)}`;
            window.open(googleMapUrl, '_blank');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img src={stadiumData.IMGURL} alt={`${stadiumData.SVCNM} 이미지`} className={styles.stadiumImage} />
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoSection}>
                        <h2>{stadiumData.SVCNM}</h2>
                        <div className={styles.rulesText}>
                            <p><strong>구장 주소:</strong> {stadiumData.PLACENM}</p>
                            <p><strong>구장 소개:</strong></p>
                            <div className={styles.dtlContentWrapper}>
                                {stadiumData.DTLCONT.map((item, index) => (
                                    <div key={index}>
                                        <h4 className={styles.dtlTitle}>{item.title}</h4>
                                        <ul className={styles.dtlContentList}>
                                            {item.content.map((line, idx) => (
                                                <li key={idx} className={styles.dtlContent}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.rulesSection}>
                        <h3>시설 및 이용 규칙</h3>
                        <div className={styles.rulesText}>
                            {stadiumData.DTLCONT.map((item, index) => (
                                <div key={index} className={styles.dtlContentWrapper}>
                                    <h4 className={styles.dtlTitle}>{item.title}</h4>
                                    <ul className={styles.dtlContentList}>
                                        {item.content.map((line, idx) => (
                                            <li key={idx} className={styles.dtlContent}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.rulesSection}>
                        <h3>주의사항</h3>
                        <div className={styles.rulesText}>
                            <p>■ 전화 문의: {stadiumData.TELNO}</p>
                        </div>
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

                    {/* 주소 복사 기능 */}
                    <button className={styles.copyButton} onClick={handleCopyAddress}>
                        {isAddressCopied ? '주소가 복사되었습니다!' : '주소 복사'}
                    </button>

                    {/* 지도 보기 버튼 */}
                    <button className={styles.copyButton} onClick={openGoogleMap}>
                        지도 보기
                    </button>
                    {/* 예약하기 버튼 */}
                    <button className={styles.reserveButton}>
                        예약하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StadiumDetail;
