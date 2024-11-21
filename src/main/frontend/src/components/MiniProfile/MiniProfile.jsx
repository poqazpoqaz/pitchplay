import ManagerLabel from "./ManagerLabel";
import CircleImg from "../CircleImg"
import TitleText from "../TitleText";
import styles from "./MiniProfile.module.css";
import dots from "./dots.svg"


function MiniProfile({ index, src, isManager }) {
    return (
        <div className={styles['mini-grid']}>
            <div className={styles['mini-img']}>
                <CircleImg src={src} />
            </div>
            <div className={styles['mini-name']}>
                <TitleText color={"#000000"} size={"small"}>네임</TitleText>
                {isManager && <ManagerLabel />}
            </div>
            <div className={styles['mini-menu']}>
                <a href="#">
                    <img src={dots} />
                </a>
            </div>
        </div>
    )
}

export default MiniProfile;