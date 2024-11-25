import styles from "./GuestPlayerRecruitmentItem.module.css"
import guest from "./guest.svg"

function GuestPlayerRecruitmentItem({ gridArea, date, location, currentMembers, totalMembers, team, gender, teamSize }) {
    return (
        <div style={{ gridArea: gridArea }} className={styles['guestitem-flex']}>
            <div>
                <h3>{date}</h3>
            </div>
            <div>
                <p>{location}</p>
                <p><img src={guest} /> {currentMembers} / {totalMembers} 명</p>
            </div>
            <div>
                <p>{team} - {gender}, {teamSize}</p>
            </div>
        </div>
    )
}

export default GuestPlayerRecruitmentItem;