import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './styles/ServerStatus.module.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { groupActions } from "../store/GroupSlice";
import VoiceChannel from './VoiceChannel';
import socketService from '../services/socketService'; // socketService를 통해 서버와 통신

const ServerStatus = () => {

    const dispatch = useDispatch();
    const currentGroup = useSelector(state => state.group.currentGroup);
    const joinChanel = useSelector(state => state.group.joinChanel); // 현재 접속한 채널
    const [activeMenu, setActiveMenu] = useState("채팅 채널"); // 기본값

    useEffect(() => {
        setActiveMenu("채팅 채널")
    }, [currentGroup]);

    // 메뉴 목록을 배열로 관리
    const menuItems = [
        { id: 1, name: '채팅 채널' },
        { id: 2, name: '음성 채널' },
        { id: 3, name: '게시판' },
        { id: 4, name: '캘린더' },
        { id: 5, name: '일정 추가' },
    ];

    const setActiveHandler = (menuName) => {
        setActiveMenu(menuName); // 클릭한 메뉴 이름으로 상태 업데이트
        dispatch(groupActions.changeJoinChanel(menuName));

        if (menuName === '음성 채널') {
            // 음성 채널을 선택하면 서버로 연결 요청
            socketService.connect();
            socketService.sendJoinVoiceChannel(currentGroup); // 현재 그룹의 음성 채널에 참여하는 요청을 보냄
        }
    };

    return (
        <div>
            <div className={styles.groupName}>{currentGroup}</div>

            {menuItems.map(menu => (
                <div
                    key={menu.id}
                    className={`${styles.menu} ${activeMenu === menu.name ? styles.active : ''}`}
                    onClick={() => setActiveHandler(menu.name)}
                >
                    <MdKeyboardArrowDown />{menu.name}
                </div>
            ))}

            {/* 음성 채널이 선택되면 VoiceChannel 컴포넌트를 렌더링 */}
            {joinChanel === '음성 채널' && <VoiceChannel />}
        </div>
    );
};

export default ServerStatus;