package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "team",
        indexes = {
                @Index(name = "idx_team_name", columnList = "team_name"),
                @Index(name = "idx_team_region", columnList = "team_region")
        })
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "team_id_num", nullable = false, length = 36)
    private String teamIdNum; // Primary Key (PK)

    @Column(name = "team_code", nullable = false, length = 10, unique = true)
    private String teamCode;

    @Column(name = "team_name", nullable = false)
    private String teamName;

    @Column(name = "team_leader", nullable = false)
    private String teamLeader;

    @Column(name = "team_level", length = 6)
    private String teamLevel;

    @Column(name = "team_region", length = 10)
    private String teamRegion;

    @Column(name = "play_time")
    private List<String> playTime;

    @Column(name = "team_image_url")
    private String teamImageUrl;

    @Column(name = "team_member")
    private List<String> teamMember;

    @Column(name = "team_member_count")
    private Integer teamMemberCount;

    @Column(name = "team_introduce")
    private String teamIntroduce;

    @Column(name = "team_by_age")
    private List<String> teamByAge;

    @Override
    public String toString() {
        return "TeamEntity{" +
                "teamIdNum='" + teamIdNum + '\'' +
                ", teamCode='" + teamCode + '\'' +
                ", teamName='" + teamName + '\'' +
                ", teamLeader='" + teamLeader + '\'' +
                ", teamLevel='" + teamLevel + '\'' +
                ", teamRegion='" + teamRegion + '\'' +
                ", playTime=" + playTime +
                ", teamImageUrl='" + teamImageUrl + '\'' +
                ", teamMember=" + teamMember +
                ", teamMemberCount=" + teamMemberCount +
                ", teamIntroduce='" + teamIntroduce + '\'' +
                ", teamByAge=" + teamByAge +
                ", userIdNum=" + userIdNum +
                '}';
    }
}
