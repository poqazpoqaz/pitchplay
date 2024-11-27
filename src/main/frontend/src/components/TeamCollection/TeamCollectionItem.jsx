import styles from "./TeamCollectionItem.module.css";

function TeamCollectionItem({ gridArea, title, currentMember, totalMember, city, loc, gender, views }) {
    return (
        <div style={{ gridArea: gridArea }} className={styles['collectionItem-flex']}>
            <div>
                <h3>{title}</h3>
                <h3>（{currentMember} / {totalMember}명）</h3>
            </div>
            <div>
                <p>{city} {loc}</p>
                <p>{gender}</p>
            </div>
            <div>
                <p> 조회수 : {views} </p>
            </div>
        </div>
    )
}

export default TeamCollectionItem;