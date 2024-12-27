package kosmo.pitchplay.entity;


import jakarta.persistence.*;
import kosmo.pitchplay.enums.NoticeType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(
        name = "notice",
        indexes = {
                @Index(name = "idx_notice_type", columnList = "notice_type") // notice_type에 인덱스 추가
        })


public class NoticeEntity {

    /**
     * 공지사항 엔티티 클래스
     * - 공지사항과 자주 묻는 질문 데이터를 저장
     */


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String noticeId; // UUID로 고유 식별자 생성

    @Enumerated(EnumType.STRING) // Enum을 String으로 매핑
    @Column(name = "notice_type", nullable = false)
    private NoticeType noticeType;

    @Column(name = "notice_title", nullable = false, length = 255)
    private String title;

    @Lob
    @Column(name = "notice_content", nullable = false)
    private String noticeContent;
    //columnDefinition = "text" 는 @Lob과 충돌 가능성이 있어서 Lob사용선택 후 columnDefinition = "text" 사용하지 않았습니다.


}
