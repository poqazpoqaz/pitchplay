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
        name = "payment",
        indexes = {
                @Index(name = "idx_pay_id", columnList = "pay_id"),
                @Index(name = "idx_approval_state", columnList = "approval_state")
        })
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "pay_num", nullable = false, length = 36)
    private String payNum; // Primary Key (PK)

    @Column(name = "pay_id", nullable = false)
    private String payId;

    @Column
    private Integer price;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "approval_state")
    private String approvalState;

    @Column(name = "user_id_num", nullable = false, length = 36)
    private String userIdNum; // Foreign Key (FK)

    @Override
    public String toString() {
        return "PaymentEntity{" +
                "payNum='" + payNum + '\'' +
                ", payId='" + payId + '\'' +
                ", price=" + price +
                ", paymentDate=" + paymentDate +
                ", approvalState='" + approvalState + '\'' +
                ", userIdNum=" + userIdNum +
                '}';
    }
}
