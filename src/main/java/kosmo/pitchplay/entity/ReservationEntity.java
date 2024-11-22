package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(
        name = "reservation",
        indexes = {
                @Index(name = "idx_reservation_num", columnList = "reservation_num"),
                @Index(name = "idx_mach_date", columnList = "mach_date"),
                @Index(name = "idx_stadium_information", columnList = "stadium_information"),
                @Index(name = "idx_stadium_information_mach_date", columnList = "stadium_information, mach_date")
        })
public class ReservationEntity {

    @Id
    @Column(name = "match_num", nullable = false, updatable = false, length = 36)
    private UUID matchNum;  // Primary Key (PK)

    @Column(name = "reservation_num", nullable = false, updatable = false, unique = true)
    private String reservationNum;

    @Column(name = "stadium_name", nullable = false, length = 50)
    private String stadiumName;

    @Column(name = "reservation_date", nullable = false)
    private LocalDateTime reservationDate;

    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "personnel", nullable = false)
    private String personnel;

    @Column(name = "stadium_information", nullable = false)
    private String stadiumInformation;

    @Column(name = "views_number", nullable = false)
    private Integer viewsNumber;
}