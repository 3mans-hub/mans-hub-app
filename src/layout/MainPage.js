import React, {useEffect, useState} from 'react';
import styles from './styles/MainPage.module.scss';
import {Outlet, useNavigate} from 'react-router-dom';
import ServerSideBar from "./ServerSideBar";
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";
import ChatInterface from "../components/ChatInterface";
import FriendsMenu from "../components/FriendsMenu";
import {useSelector} from "react-redux";


const MainPage = () => {
    const [activeComponent, setActiveComponent] = useState('chatInterface');

    // 그룹에 접속 유무
    const joinStatus = useSelector(state => state.group.joinGroupStatus)
    // 현재 접속한 그룹
    const currentGroup = useSelector(state => state.group.currentGroup);

    const navigate = useNavigate();

    useEffect( () => {

        autoLogin();

    }, []);

    const autoLogin = async () => {
        const token = localStorage.getItem("userData");

        if(token !== null) {
            sessionStorage.setItem('userData', token);
        }

        const sessionToken = sessionStorage.getItem('userData');

        if (sessionToken) {
            // 4. 토큰 유효성 검사 API 호출
            const response = await fetch('http://localhost:6969/sign_in/autoLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken.token}`
                },
            });

            if (response.ok) {
                // 토큰이 유효하면 유저 정보를 불러오고, 로그인 상태 유지
                console.log('Token is valid');
            } else {
                // 토큰이 유효하지 않으면 로그아웃 처리
                console.log('Token is invalid or expired');
                sessionStorage.removeItem('userData');
                localStorage.removeItem('userData'); // 자동 로그인 설정한 경우도 지우기
                navigate('/sign-in');
            }
        } else {
            navigate('/sign-in');
        }
    }

    useEffect(() => {
        if (joinStatus) setActiveComponent('chatInterface');
        else setActiveComponent('friendsMenu');
    }, [joinStatus]);


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
