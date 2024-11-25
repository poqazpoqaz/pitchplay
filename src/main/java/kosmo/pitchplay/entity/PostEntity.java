package kosmo.pitchplay.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "post",
        indexes = {}
)
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)  // uuid4 생성 전략을 사용
    @Column(name = "user_id", nullable = false, length = 36)
    private String postId; // Primary Key (PK)

    @Column(name = "post_num", nullable = false, unique = true)
    private Integer postNum;

    @Column(name = "post_title", nullable = false)
    private String postTitle;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String content;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @Column(name = "view_number", nullable = false)
    private Integer viewNumber;

    @Column
    private UUID userIdNum;
}
