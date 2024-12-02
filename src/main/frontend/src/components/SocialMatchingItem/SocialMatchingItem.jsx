import styles from "./SocialMatchingItem.module.css";

function SocialMatchingItem({ gridArea, socialTime, stadiumName, stadiumLoc, currentCount, totalMember, gender, views }) {
    return (
        <div style={{ gridArea: gridArea }} className={styles['social-item-flex']}>
            <div>
                <h3>{stadiumName} 소셜매치</h3>
                <h3>（{currentCount} / {totalMember}명）</h3>
            </div>
            <div>
                <p>{stadiumLoc}</p>
                <p>{gender}</p>
            </div>
            <div>
                <p>{socialTime}</p>
            </div>
            <div>
                <p> 조회수 : {views} </p>
            </div>
        </div>
    )
}

export default SocialMatchingItem;