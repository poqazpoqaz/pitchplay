import PostDetailCard from "../../components/PostDetailCard";
import styles from "./ReservationDetail.module.css";



function ReservationDetail({ content, gridArea}) {
    // 날짜 포맷 변환
    const formattedDate = new Date(content.reservationDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\.$/, ''); 

    return (
            <div style={{gridArea: gridArea}} className={styles['reservation-detail-flex']}>
                <PostDetailCard color="#1B4510" title="예약정보">
                    <p className={styles['reservation-detail-subtitle']}>경기일자</p>
                    <p className={styles['reservation-detail-text']}>{formattedDate}</p>
                    <p className={styles['reservation-detail-subtitle']}>구장이름</p>
                    <p className={styles['reservation-detail-text']}>{content.stadium}</p>
                    <p className={styles['reservation-detail-subtitle']}>구장주소</p>
                    <p className={styles['reservation-detail-text']}>{content.stadiumAddress}</p>
                </PostDetailCard>
            </div>
    );
}

export default ReservationDetail;