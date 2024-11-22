package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
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
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "match_num", nullable = false, updatable = false, length = 36)
    private UUID matchNum;  // Primary Key (PK)

    @Column(name = "reservation_num", nullable = false, updatable = false, unique = true)
    private String reservationNum;

    @Column(name = "stadium_name", nullable = true, length = 50)
    private String stadiumName;

    @Column(name = "reservation_date", nullable = true)
    private LocalDateTime reservationDate;

    @Column(name = "match_date")
    private LocalDateTime matchDate;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "personnel")
    private String personnel;

    @Column(name = "stadium_information")
    private String stadiumInformation;

    @Column(name = "views_number", nullable = false)
    private Integer viewsNumber;
}