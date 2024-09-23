import React from 'react';
import styles from './styles/SideBar.module.scss';
import {PiPlus} from "react-icons/pi";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.icon}>그룹1</div>
            <div className={styles.icon}>그룹2</div>
            <div className={styles.addGroup}><PiPlus></PiPlus></div>
        </div>
    );
};

export default Sidebar;