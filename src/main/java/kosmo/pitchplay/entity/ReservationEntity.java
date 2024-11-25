package kosmo.pitchplay.entity;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "reservation",
        indexes = {
                @Index(name = "idx_stadium_region", columnList = "stadium_region"),
                @Index(name = "idx_mach_date", columnList = "mach_date"),
        })
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "match_num", nullable = false, updatable = false, length = 36)
    private UUID matchNum;  // Primary Key (PK)

    @Column(name = "reservation_num", nullable = false, updatable = false, unique = true, length = 20)
    private String reservationNum;

    @Column(name = "stadium_name", length = 50)
    private String stadiumName;

    @Column(name = "stadium_state", length = 10)
    private String stadiumState;

    @Column(precision = 17, scale = 14)
    private BigDecimal latitude;

    @Column(precision = 17, scale = 14)
    private BigDecimal longitude;

    @Column(name = "stadium_region", length = 6)
    private String stadiumRegion;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "stadium_text", length = 500)
    private String stadiumText;

    @Column
    private Integer price;

    @Column(name = "personnel")
    private String personnel;

    @Column(name = "views_number", nullable = false)
    private Integer viewsNumber;

    @Column(name = "match_date")
    private LocalDateTime matchDate;

    @Column(name = "reservation_date")
    private LocalDateTime reservationDate;

    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
    @Column(name = "match_info")
    private MatchInfo postInfo;

    @Column(name = "user_id_num", nullable = false, length = 36)
    private String userIdNum; // Foreign Key (FK)

    @Override
    public String toString() {
        return "ReservationEntity{" +
                "matchNum=" + matchNum +
                ", reservationNum='" + reservationNum + '\'' +
                ", stadiumName='" + stadiumName + '\'' +
                ", stadiumState='" + stadiumState + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", stadiumRegion='" + stadiumRegion + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", stadiumText='" + stadiumText + '\'' +
                ", price=" + price +
                ", personnel='" + personnel + '\'' +
                ", viewsNumber=" + viewsNumber +
                ", matchDate=" + matchDate +
                ", reservationDate=" + reservationDate +
                ", userIdNum=" + userIdNum +
                '}';
    }
}