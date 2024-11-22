import { Outlet } from "react-router-dom";
import styles from "./Post.module.css";
import Navbar from "../../components/Navbar/Navbar"

function Post({ gridArea }) {
    return (
        <div style={{ gridArea: gridArea }} className={styles['post-grid']}>
            <Navbar gridArea="nav" />
            <div style={{gridArea: "posts"}}>
                <Outlet />
            </div>
        </div>
    )
}

export default Post;