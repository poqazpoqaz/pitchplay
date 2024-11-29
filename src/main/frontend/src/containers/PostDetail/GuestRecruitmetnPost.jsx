import TeamProfile from "../../components/TeamProfile/TeamProfile";
import RefundPolicy from "../../components/RefundPolicy";
import PostDetailCard from "../../components/PostDetailCard";
import styles from "./GuestRecruitmentPost.module.css";

function GuestRecruitmentPost({ stadiumContent, teamContent, collectionContent, gridArea }) {
    return (
        <div style={{ gridArea: gridArea }}>
            <PostDetailCard color="#267815" title={stadiumContent.stadiumName}>
                <div className={styles['recruitment-post-grid']}>
                    <h1 style={{ gridArea: "title" }}>용병모집</h1>
                    <TeamProfile content={teamContent} gridArea="profile" />
                    <div className={styles['recruitment-post']}>
                        {collectionContent.collectionDescription}
                    </div>
                    <RefundPolicy gridArea="policy" />
                </div>
            </PostDetailCard>
        </div>
    );
}

export default GuestRecruitmentPost;