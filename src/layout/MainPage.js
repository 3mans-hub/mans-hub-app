import React, {useEffect, useState} from 'react';
import styles from './styles/MainPage.module.scss';
import {Outlet, useNavigate} from 'react-router-dom';
import ServerSideBar from "./ServerSideBar";
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";
import ChatInterface from "../components/ChatInterface";
import FriendsMenu from "../components/FriendsMenu";
import {useDispatch, useSelector} from "react-redux";
import {API_BASE_URL} from "../config/host-config";
import {ModalProvider} from "../Context/useModalContext";
import {groupActions} from "../store/GroupSlice";


const MainPage = () => {
    const [activeComponent, setActiveComponent] = useState('chatInterface');

    // 그룹에 접속 유무
    const joinStatus = useSelector(state => state.group.joinGroupStatus)
    // 현재 접속한 그룹
    const currentGroup = useSelector(state => state.group.currentGroup);

    const loginUser = JSON.parse(sessionStorage.getItem("userData"));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect( async () => {

        await autoLogin();

        await fetchGroupList();


    }, []);


    const fetchGroupList = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/group`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginUser.token}`
                },
                body: JSON.stringify(
                    {
                        email: loginUser.email
                    }
                )
            });

            const data = await response.json();

            dispatch(groupActions.addGroup(data)); // 가져온 데이터로 업데이트

            console.log("그룹 업데이트!!")

        } catch (error) {
            console.error("Error fetching group list:", error);
        }
    };



    const autoLogin = async () => {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        const token = userData.token || null;

        if (!token){
            if(!sessionStorage.getItem("userData")) {
                navigate("/sign-in");
                return;
            }
        }

        if(token) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }

        const sessionToken = JSON.parse(sessionStorage.getItem('userData'));
        console.log(sessionToken)

        if (sessionToken) {
            // 4. 토큰 유효성 검사 API 호출
            const response = await fetch(`${API_BASE_URL}/sign_in/autoLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken.token}`
                },
            });

            console.log(response.text());

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
            <ModalProvider>
            <SideBar />
            <ServerSideBar />
            <div className={styles.contentArea}>
                {renderComponent()} {/* 현재 활성화된 컴포넌트를 렌더링 */}
            </div>
            <RightSideBar />
            </ModalProvider>
        </div>

    );
};

export default MainPage;
