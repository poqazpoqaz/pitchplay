package kosmo.pitchplay.service;

import kosmo.pitchplay.dto.ReservationInfo;
import kosmo.pitchplay.entity.ReservationEntity;
import kosmo.pitchplay.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    // 생성자를 통해 ReservationRepository 주입
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // 예약 정보를 데이터베이스에서 가져오는 예시 메소드
    public List<ReservationInfo> getAllReservations() {
        List<ReservationEntity> entities = reservationRepository.findAll();
        return entities.stream()
                .map(this::convertToReservationInfo) // 수동 변환
                .collect(Collectors.toList());
    }

    // 엔티티를 DTO로 변환하는 메소드 (수동 변환)
    private ReservationInfo convertToReservationInfo(ReservationEntity entity) {
        ReservationInfo reservationInfo = new ReservationInfo();
        // 수동으로 각 필드 설정
        reservationInfo.setDtlcont(entity.getStadiumInformation()); // stadiumInformation -> dtlcont
        reservationInfo.setArenm(entity.getStadiumName()); // stadiumName -> arenm
        return reservationInfo;
    }

    // 예약 정보 저장
    public void saveReservations(List<ReservationEntity> reservations) {
        reservationRepository.saveAll(reservations);  // 여러 개의 예약을 저장
    }


    public ReservationEntity createReservation(String reservationNum, String stadiumName, LocalDateTime reservationDate,
                                               LocalDateTime matchDate, Integer amount, String personnel,
                                               String stadiumInformation, Integer viewsNumber) {
        // ReservationEntity 객체 생성
        ReservationEntity reservationEntity = new ReservationEntity();

        // UUID 값 수동으로 생성 (여기서 UUID 생성)
        UUID matchNum = UUID.randomUUID();  // UUID 값 생성
        reservationEntity.setMatchNum(matchNum);  // 생성된 UUID를 예약 엔티티에 설정

        // 필드 값 설정
        reservationEntity.setReservationNum(reservationNum);
        reservationEntity.setStadiumName(stadiumName);
        reservationEntity.setReservationDate(reservationDate);
        reservationEntity.setMatchDate(matchDate);
        reservationEntity.setAmount(amount);
        reservationEntity.setPersonnel(personnel);
        reservationEntity.setStadiumInformation(stadiumInformation);
        reservationEntity.setViewsNumber(viewsNumber);

        // reservationRepository를 사용하여 엔티티를 DB에 저장
        return reservationRepository.save(reservationEntity);
    }
}
