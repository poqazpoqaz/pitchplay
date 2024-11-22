import styles from "./TeamMatchingItem.module.css";

function TeamMatchingItem({team1, team2, date, location, gender, level, views, gridArea})
{
    return (
        <div className={styles['matchingItem-flex']} style={{gridArea: gridArea}}>
            {/* 매칭 정보 */}
            <div>
                <h3>{`${team1} vs ${team2 || "미정"}`}</h3>
            </div>

            {/* 추가 정보 */}
            <div>
                <p>{date}</p>
                <p>{gender}</p>
                <p>{level}</p>
            </div>

            {/* 위치 및 조회수 */}
            <div>
                <p>{location}</p>
                <p>조회수: {views}</p>
            </div>
        </div>
    );
}

export default TeamMatchingItem;