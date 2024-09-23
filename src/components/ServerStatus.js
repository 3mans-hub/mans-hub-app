import React from 'react';
import {useSelector} from "react-redux";
import styles from './styles/ServerStatus.module.scss'
import {MdKeyboardArrowDown} from "react-icons/md";

const ServerStatus = () => {

    const currentGroup = useSelector(state => state.group.currentGroup);

    return (
        <div>
            <div className={styles.groupName}>{currentGroup}</div>
            <div className={styles.menu}><MdKeyboardArrowDown />채팅 채널</div>
            <div className={styles.menu}><MdKeyboardArrowDown />음성 채널</div>
            <div className={styles.menu}><MdKeyboardArrowDown />게시판</div>
            <div className={styles.menu}><MdKeyboardArrowDown />캘린더</div>
            <div className={styles.menu}><MdKeyboardArrowDown />일정 추가</div>
        </div>
    );
};

export default ServerStatus;