import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Post.module.css";
import Navbar from "../../components/Navbar/Navbar";

function Post({ gridArea }) {
    const [isFiltered, setIsFiltered] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState(null);

    const applyFilters = () => {
        const criteria = JSON.parse(localStorage.getItem("TotalSet"));
        setFilterCriteria(criteria);
        setIsFiltered(true);
    };

    return (
        <div style={{ gridArea: gridArea }} className={styles["post-grid"]}>
            <Navbar gridArea="nav" onSearch={applyFilters} />
            <div style={{ gridArea: "posts" }}>
                <Outlet context={{ isFiltered, filterCriteria }} />
            </div>
        </div>
    );
}

export default Post;