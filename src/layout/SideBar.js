import React, { useState } from 'react';
import styles from './styles/SideBar.module.scss';
import { PiPlus } from "react-icons/pi";

const Sidebar = () => {
    // 클릭된 그룹의 인덱스를 저장하는 state
    const [active, setActive] = useState(null);

    const groups = ['그룹1', '그룹2'];

    // 클릭 이벤트 핸들러 (클릭된 그룹의 인덱스를 저장)
    const handleGroupClick = (index) => {
        setActive(index);
    };

    return (
        <div className={styles.sidebar}>
            <div className={`${styles.mainIcon} ${active === null ? styles.active : ''}`}>로고</div>
            <div className={styles.line}></div>

            {groups.map((group, index) => (
                <div
                    key={index}
                    className={`${styles.icon} ${active === index ? styles.active : ''}`}
                    onClick={() => handleGroupClick(index)}
                >
                    {group}
                </div>
            ))}

            <div className={styles.addGroup}>
                <PiPlus />
            </div>
        </div>
    );
};

export default Sidebar;