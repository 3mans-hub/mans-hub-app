import React from 'react';
import styles from './styles/MainPage.module.scss';
import { Outlet } from 'react-router-dom';
import ServerSideBar from "./ServerSideBar";
import SideBar from "./SideBar";

const MainPage = () => {
    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <ServerSideBar />
            <div className={styles.contentArea}>
                <Outlet /> {/* 이 부분에서 다른 컴포넌트 교체 */}
            </div>
        </div>
    );
};

export default MainPage;