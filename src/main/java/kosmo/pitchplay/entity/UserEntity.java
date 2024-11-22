package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(
        name = "user",
        indexes = {
                @Index(name = "idx_user_id", columnList = "id"),
                @Index(name = "idx_user_email", columnList = "email"),
                @Index(name = "idx_user_phone", columnList = "phone"),
                @Index(name = "idx_user_nickname", columnList = "nickname")
        })
public class UserEntity {

    @Id
    @Column(name = "user_id_num", nullable = false, updatable = false, length = 36)
    private UUID userIdNum; // Primary Key (PK)

    @Column(nullable = false)
    private Integer cash;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(nullable = false, unique = true, length = 20)
    private String id;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, unique = true, length = 15)
    private String phone;

    @Column(nullable = false)
    private LocalDate birthdate;

    @Column(name = "profile_image_url", nullable = false)
    private String profileImageUrl;

    @Column(name = "preferred_time", nullable = false)
    private List<String> preferredTime;

    @Column(name = "preferred_location", nullable = false, length = 100)
    private String preferredLocation;

    @Column(name = "preferred_day", nullable = false)
    private List<String> preferredDay;

    @Column(name = "team_information")
    private String teamInformation;

    @Column(name = "account_number", nullable = false, unique = true, length = 20)
    private String accountNumber;

    @Column(length = 300)
    private String introduction;

    @Column(nullable = false)
    private boolean deactivated;

    @Column(name = "admin_rights", nullable = false)
    private boolean adminRights;

    @Column(nullable = false, length = 10)
    private String gender;
}
