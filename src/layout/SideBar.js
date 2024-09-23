import React, { useEffect, useState } from 'react';
import styles from './styles/SideBar.module.scss';
import { PiPlus } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../store/GroupSlice";

const Sidebar = () => {
    const [active, setActive] = useState(null);
    const dispatch = useDispatch();
    const groups = useSelector(state => state.group.groupList);
    const joinStatus = useSelector(state => state.group.joinGroupStatus);

    // 클릭 이벤트 핸들러
    const groupClickHandler = (index) => {
        dispatch(groupActions.joinGroup(true));  // 그룹 접속 상태로 변경
        setActive(index);
    };

    const logoClickHandler = () => {
        dispatch(groupActions.joinGroup(false));  // 그룹 접속 해제 (로고 활성화)
        setActive(null);
    };

    // 새 그룹 추가 핸들러
    const addGroupHandler = () => {
        const newGroup = `그룹${groups.length + 1}`;  // 새로운 그룹 이름
        dispatch(groupActions.addGroup([...groups, newGroup]));  // 기존 그룹에 새 그룹 추가
    };

    return (
        <div className={styles.sidebar}>
            {/* 로고 클릭 시 그룹 접속 해제, 로고 활성화 */}
            <div className={`${styles.mainIcon} ${!joinStatus ? styles.active : ''}`}
                 onClick={logoClickHandler}>
                로고
            </div>
            <div className={styles.line}></div>

            {/* 그룹 클릭 시 해당 그룹 활성화 */}
            {groups.map((group, index) => (
                <div
                    key={index}
                    className={`${styles.icon} ${active === index ? styles.active : ''}`}
                    onClick={() => groupClickHandler(index)}
                >
                    {group}
                </div>
            ))}

            <div className={styles.addGroup}>
                <PiPlus onClick={addGroupHandler} />
            </div>
        </div>
    );
};

export default Sidebar;