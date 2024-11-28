import { Outlet } from "react-router-dom";
import styles from "./NoticePost.module.css";
import Navbar from "../FAQNavbar/FAQNavbar"

function NoticePost({ gridArea }) {
    return (
        <div style={{ gridArea: gridArea }} className={styles['post-grid']}>
            <Navbar gridArea="nav" />
            <div style={{gridArea: "posts"}}>
                <Outlet />
            </div>
        </div>
    )
}

export default NoticePost;