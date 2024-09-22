import React from 'react';
import styles from './styles/ServerSideBar.module.scss';

const ServerSidebar = () => {
    return (
        <div className={styles.serverSidebar}>
            <p className={styles.serverName}>서버 이름</p>
        </div>
    );
};

export default ServerSidebar;