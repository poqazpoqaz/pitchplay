package kosmo.pitchplay.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReservationInfo {
    // Getter and Setter methods
    private String dtlcont; // 상세 내용
    private String arenm;  // 지역명

    @Override
    public String toString() {
        return "ReservationInfo{" +
                "dtlcont='" + dtlcont + '\'' +
                ", arenm='" + arenm + '\'' +
                '}';
    }
}
