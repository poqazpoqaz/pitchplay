package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
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

    @Column(length = 50)
    private String nickname;

    @Column(nullable = false, unique = true, length = 20)
    private String id;

    @Column(nullable = false, length = 16)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, unique = true, length = 15)
    private String phone;

    @Column(nullable = false)
    private LocalDate birthdate;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "account_bank", length = 10)
    private String accountBank;

    @Column(name = "account_number", unique = true, length = 20)
    private Integer accountNumber;

    @Column(length = 300)
    private String introduction;

    @Column(nullable = false)
    private boolean deactivated;

    @Column(name = "admin_rights", nullable = false)
    private boolean adminRights;

    @Column(name = "social_Id", unique = true, length = 50)
    private String socialId;

    @Column(length = 20)
    private String provider;

    @Column(length = 10)
    private String gender;

    @Column(name = "user_created_at", nullable = false)
    private LocalDateTime userCreateAt;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "team_code", unique = true, nullable = false)
    private String teamCode; // Foreign Key (FK)

    @Override
    public String toString() {
        return "UserEntity{" +
                "userIdNum=" + userIdNum +
                ", cash=" + cash +
                ", nickname='" + nickname + '\'' +
                ", id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", birthdate=" + birthdate +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", accountBank='" + accountBank + '\'' +
                ", accountNumber=" + accountNumber +
                ", introduction='" + introduction + '\'' +
                ", deactivated=" + deactivated +
                ", adminRights=" + adminRights +
                ", socialId='" + socialId + '\'' +
                ", provider='" + provider + '\'' +
                ", gender='" + gender + '\'' +
                ", userCreateAt=" + userCreateAt +
                ", lastLoginAt=" + lastLoginAt +
                ", teamCode='" + teamCode + '\'' +
                '}';
    }
}
