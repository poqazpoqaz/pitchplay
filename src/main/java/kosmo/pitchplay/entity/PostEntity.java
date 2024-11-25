package kosmo.pitchplay.entity;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(
        name = "post",
        indexes = {
                @Index(name = "idx_author", columnList = "author"),
        })
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false, length = 36)
    private String postId; // Primary Key (PK)

    @Column(name = "post_num", nullable = false, unique = true)
    private Integer postNum;

    @Column(name = "post_title")
    private String postTitle;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false)
    private String author;

    @Column
    private String content;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @Column(name = "view_number")
    private Integer viewNumber;

    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
    @Column(name = "post_info")
    private PostInfo postInfo;

    @Column(name = "user_id_num", nullable = false, length = 36)
    private String userIdNum; // Foreign Key (FK)

    @Override
    public String toString() {
        return "PostEntity{" +
                "postId='" + postId + '\'' +
                ", postNum=" + postNum +
                ", postTitle='" + postTitle + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", author='" + author + '\'' +
                ", content='" + content + '\'' +
                ", createAt=" + createAt +
                ", updateAt=" + updateAt +
                ", viewNumber=" + viewNumber +
                ", userIdNum=" + userIdNum +
                ", postInfo=" + postInfo +
                ", userIdNum=" + userIdNum +
                '}';
    }
}
