import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './styles/ServerStatus.module.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import {groupActions} from "../store/GroupSlice";

const ServerStatus = () => {

    const dispatch = useDispatch();
    const currentGroup = useSelector(state => state.group.currentGroup);
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
        if (menuName === '음성 채널') {
            dispatch(groupActions.changeJoinChanel("음성 채널"))
        } else {
            dispatch(groupActions.changeJoinChanel(menuName));
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
        </div>
    );
};

export default ServerStatus;