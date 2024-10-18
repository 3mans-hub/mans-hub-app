import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './styles/ServerStatus.module.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { groupActions } from "../store/GroupSlice";
import VoiceChannel from './VoiceChannel';
import socketService from '../services/socketService';

const ServerStatus = () => {
    const dispatch = useDispatch();
    const currentGroup = useSelector(state => state.group.currentGroup);
    const joinChanel = useSelector(state => state.group.joinChanel);
    const [activeMenu, setActiveMenu] = useState("채팅 채널");

    useEffect(() => {
        setActiveMenu("채팅 채널");
    }, [currentGroup]);

    const setActiveHandler = (menuName) => {
        setActiveMenu(menuName);
        dispatch(groupActions.changeJoinChanel(menuName));

        if (menuName === '음성 채널') {
            socketService.connect(() => {
                socketService.sendJoinVoiceChannel(currentGroup);
            });
        }
    };

    return (
        <div>
            <div className={styles.groupName}>{currentGroup}</div>

            {['채팅 채널', '음성 채널', '게시판', '캘린더', '일정 추가'].map(menu => (
                <div
                    key={menu}
                    className={`${styles.menu} ${activeMenu === menu ? styles.active : ''}`}
                    onClick={() => setActiveHandler(menu)}
                >
                    <MdKeyboardArrowDown /> {menu}
                </div>
            ))}

            {joinChanel === '음성 채널' && <VoiceChannel />}
        </div>
    );
};

export default ServerStatus;