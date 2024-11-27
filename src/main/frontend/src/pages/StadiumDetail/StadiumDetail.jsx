import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StadiumDetail.module.css';

// 아코디언 컴포넌트
function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.accordionItem}>
            <button className={styles.accordionButton} onClick={() => setIsOpen(!isOpen)}>
                {title}
            </button>
            {isOpen && <div className={styles.accordionContent}>{content}</div>}
        </div>
    );
}

function StadiumDetail() {
    const { id } = useParams();
    const [stadiumData, setStadiumData] = useState(null);
    const [isAddressCopied, setIsAddressCopied] = useState(false);

    // JSON 데이터를 배열 형태로 변환하는 함수
    function convertToArray(jsonData) {
        if (Array.isArray(jsonData)) {
            return jsonData.map(item => convertToArray(item));
        }
    
        if (jsonData && typeof jsonData === 'object') {
            const newObj = {};
            for (let key in jsonData) {
                if (key === 'DTLCONT' && typeof jsonData[key] === 'string') {
                    // DTLCONT 문자열을 객체 배열로 변환
                    newObj[key] = splitContentIntoSections(jsonData[key]);
                } else {
                    newObj[key] = convertToArray(jsonData[key]);
                }
            }
            return newObj;
        }
    
        return jsonData;
    }
    // DTLCONT 문자열을 'title'과 'content' 객체 배열로 분리
function splitContentIntoSections(content) {
    const sections = content.split(/\d+\.\s+/).slice(1); // 숫자로 시작하는 제목 기준으로 분리
    return sections.map(section => {
        const [title, ...rest] = section.split(/\r?\n/); // 첫 줄을 'title', 나머지를 'content'로 구분
        return {
            title: title.trim(),
            content: rest.filter(line => line.trim() !== '').map(line => line.trim()), // 빈 줄 제거
        };
    });
}

    // 데이터 불러오기
    useEffect(() => {
        fetch('/data/stadiumData.json')
            .then(response => response.json())
            .then(data => {
                const selectedStadium = data.find(stadium => stadium.SVCID === id);
                const convertedStadium = convertToArray(selectedStadium);
                setStadiumData(convertedStadium);
            })
            .catch(error => console.error('Error loading stadium data:', error));
    }, [id]);

    // 주소 복사 기능
    const handleCopyAddress = () => {
        if (stadiumData && stadiumData.PLACENM) {
            navigator.clipboard.writeText(stadiumData.PLACENM)
                .then(() => setIsAddressCopied(true))
                .catch(() => setIsAddressCopied(false));
        }
    };

    // 구글 지도 열기
    const openGoogleMap = () => {
        if (stadiumData && stadiumData.PLACENM) {
            const googleMapUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(stadiumData.PLACENM)}`;
            window.open(googleMapUrl, '_blank');
        }
    };

    // 로딩 처리
    if (!stadiumData) {
        return <div>Loading...</div>;
    }

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
    {stadiumData.DTLCONT && Array.isArray(stadiumData.DTLCONT) ? (
        stadiumData.DTLCONT.map((item, index) => (
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
                    <button className={styles.copyButton} onClick={openGoogleMap}>
                        지도 보기
                    </button>
                    <button className={styles.reserveButton}>
                        예약하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StadiumDetail;
