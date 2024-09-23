import React, {useEffect, useState} from 'react';
import styles from './styles/SideBar.module.scss';
import { PiPlus } from "react-icons/pi";
import {useDispatch, useSelector} from "react-redux";
import {groupActions} from "../store/GroupSlice";

const Sidebar = () => {
    // 클릭된 그룹의 인덱스를 저장하는 state
    const [active, setActive] = useState(null);
    const dispatch = useDispatch();
    const groups = useSelector(state => state.group.groupList);

    useEffect(() => {

    }, [groups]);

    // 클릭 이벤트 핸들러 (클릭된 그룹의 인덱스를 저장)
    const groupClickHandler = (index) => {
        setActive(index);
    };

    const logoClickHandler = () => {
        setActive(null);
    }

    // 새 그룹 추가 핸들러
    const addGroupHandler = () => {
        const newGroup = `그룹${groups.length + 1}`;  // 새로운 그룹 이름
        dispatch(groupActions.addGroup([...groups, newGroup]));  // 기존 그룹에 새 그룹 추가
    }

    return (
        <div className={styles.sidebar}>
            <div className={`${styles.mainIcon} ${active === null ? styles.active : ''}`}
                 onClick={logoClickHandler}>
                로고</div>
            <div className={styles.line}></div>
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
                <PiPlus onClick={addGroupHandler}/>
            </div>
        </div>
    );
};

export default Sidebar;