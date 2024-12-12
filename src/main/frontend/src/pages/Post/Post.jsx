import { Outlet } from "react-router-dom";
import styles from "./Post.module.css";
import Navbar from "../../components/Navbar/Navbar"
import { createContext, useState } from "react";

function Post({ gridArea }) {
    const MyContext = createContext();
    const [state, setState] = useState("초기값");

    return (
        <MyContext.Provider value={{ state, setState }}>
            <div style={{ gridArea: gridArea }} className={styles['post-grid']}>
                <Navbar gridArea="nav" />
                <div style={{ gridArea: "posts" }}>
                    <Outlet />
                </div>
            </div>
        </MyContext.Provider>
    )
}

export default Post;