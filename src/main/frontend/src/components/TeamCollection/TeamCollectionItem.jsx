import styles from "./TeamCollectionItem.module.css";

function TeamCollectionItem({ gridArea, title, currentMembers, totalMembers, location, gender, views }) {
    return (
        <div style={{ gridArea: gridArea }} className={styles['collectionItem-flex']}>
            <div>
                <h3>{title}</h3>
                <h3>（{currentMembers} / {totalMembers}명）</h3>
            </div>
            <div>
                <p>{location}</p>
                <p>{gender}</p>
            </div>
            <div>
                <p> 조회수 : {views} </p>
            </div>
        </div>
    )
}

export default TeamCollectionItem;