import TeamProfile from "../../components/TeamProfile/TeamProfile";
import RefundPolicy from "../../components/RefundPolicy";
import PostDetailCard from "../../components/PostDetailCard";
import EditorItem from "../../components/EditorItem/EditorItem";
import styles from "./GuestRecruitmentCreationDetail.module.css";
import LabelInput from "../../components/LabelInput";


function GuestRecruitmentCreationDetail({ editorContent, setEditorContent, quillRef, stadiumContent, teamContent, gridArea, handleMemberChange, isValid, collectionContent }) {
    return (
        <div style={{ gridArea: gridArea }}>
            <PostDetailCard color="#267815" title={stadiumContent.stadiumName}>
                <div className={styles['recruitment-creation-grid']}>
                    <h1 style={{ gridArea: "title" }}>용병모집 글 작성</h1>
                    <TeamProfile content={teamContent} gridArea="profile" />
                    <div style={{ gridArea: "text" }}>
                        <EditorItem
                            quillRef={quillRef}
                            editorContent={editorContent}
                            setEditorContent={setEditorContent} />
                    </div>
                    <LabelInput
                        gridArea="inp"
                        id="count"
                        text="모집인원"
                        type="number"
                        placeholder="모집인원을 작성해주세요."
                        onChange={handleMemberChange}
                        isValid={isValid}
                        value={collectionContent.currentValue}
                        min={0}
                        max={11}
                    />
                    <RefundPolicy gridArea="policy" />
                </div>
            </PostDetailCard>
        </div>
    );
}

export default GuestRecruitmentCreationDetail;