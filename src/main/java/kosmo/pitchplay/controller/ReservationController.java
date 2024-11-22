package kosmo.pitchplay.controller;

import kosmo.pitchplay.dto.ReservationInfo;
import kosmo.pitchplay.entity.ReservationEntity;
import kosmo.pitchplay.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    // 생성자 주입 방식으로 ReservationService 주입
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // 예약 정보를 모두 조회하는 GET 요청 처리
    @GetMapping("/reservation")
    public ResponseEntity<List<ReservationInfo>> getAllReservations() {
        List<ReservationInfo> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);  // 200 OK 응답과 함께 예약 리스트 반환
    }

    // 예약 정보 저장 API
    @PostMapping("/save")
    public String saveReservations(@RequestBody List<ReservationEntity> reservations) {
        reservationService.saveReservations(reservations);
        return "Reservations saved successfully!";
    }
}
