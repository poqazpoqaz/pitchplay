package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table
public class TotalSearchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "search_id", nullable = false, length = 36)
    private String searchId; // Primary Key (PK)

    @Column(length = 10)
    private String region;

    @Column(name = "detail_region", length = 20)
    private String detailRegion;

    @Column(length = 20)
    private List<String> gender;

    @Column(length = 100)
    private List<String> personnel;

    @Column(name = "active_date", length = 20)
    private List<String> activeDate;

    @Column(name = "active_time", length = 50)
    private List<String> activeTime;

    @Column(name = "age_range", length = 50)
    private List<String> ageRange;

    @Column(name = "user_id_num", nullable = false, length = 36)
    private String userIdNum; // Foreign Key (FK)

    @Override
    public String toString() {
        return "TotalSearchEntity{" +
                "searchId='" + searchId + '\'' +
                ", region='" + region + '\'' +
                ", detailRegion='" + detailRegion + '\'' +
                ", gender=" + gender +
                ", personnel=" + personnel +
                ", activeDate=" + activeDate +
                ", activeTime=" + activeTime +
                ", ageRange=" + ageRange +
                ", userIdNum=" + userIdNum +
                '}';
    }
}
