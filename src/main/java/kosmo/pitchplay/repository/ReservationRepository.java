package kosmo.pitchplay.repository;

import kosmo.pitchplay.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReservationRepository extends JpaRepository<ReservationEntity, UUID> {
    // ReservationEntity에 대한 CRUD 작업을 제공
    // 필요한 추가적인 메서드는 여기서 정의 가능합니다.
}
