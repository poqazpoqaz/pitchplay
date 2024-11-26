import Button from "../../components/Button";
import TeamDescription from "../../components/TeamProfile/TeamDescription";
import TeamProfile from "../../components/TeamProfile/TeamProfile";
import styles from "./TeamApplication.module.css"


function TeamApplication({contents}){
    return(
        <div className={styles['teamapplication-grid']}>
            <TeamProfile contents={contents} gridArea="teamprofile"/>
            <TeamDescription contents={contents} gridArea="teamIntro"/>
            <Button color="var(--main-color)" gridArea="btn">가입신청</Button>
        </div>
    );
}

export default TeamApplication;