import React, { useState } from 'react';
import styles from './styles/MainPage.module.scss';
import { Outlet } from 'react-router-dom';
import ServerSideBar from "./ServerSideBar";
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";
import ChatInterface from "../components/ChatInterface";
import FriendsMenu from "../components/FriendsMenu";

const MainPage = () => {
    const [activeComponent, setActiveComponent] = useState('friendsMenu');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'chatInterface':
                return <ChatInterface />;
            case 'friendsMenu':
            default:
                return <FriendsMenu />;
        }
    };

    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <ServerSideBar />
            <div className={styles.contentArea}>
                {renderComponent()} {/* 현재 활성화된 컴포넌트를 렌더링 */}
            </div>
            <RightSideBar />
        </div>
    );
};

export default MainPage;
