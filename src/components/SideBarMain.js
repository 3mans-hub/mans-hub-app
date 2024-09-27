import React from 'react';
import styles from './styles/SideBarMain.module.scss';
import { FaDiscord } from 'react-icons/fa';
import UserStatus from "./UserStatus"; // Discord 아이콘 사용 예시

// 더미 데이터: 다이렉트 메시지 목록
const directMessages = [
    { id: 1, name: '유저1', status: 'online' },
    { id: 2, name: '유저2', status: 'offline' },
    { id: 3, name: '유저3', status: 'online' },
];

// 그룹에 접속해있지 않은 상태에서 렌더링될 ui
const SideBarMain = () => {
    return (
        <div className={styles.sidebarMain}>
            {/* 상단 검색 바 */}
            <div className={styles.topWrap}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="대화 찾기 또는 시작하기"/>
                </div>

                <div className={styles.menuItem}>
                    <FaDiscord className={styles.icon}/>
                    <span>친구</span>
                </div>

                {/* 다이렉트 메시지 섹션 */}
                <div className={styles.sectionTitle}>
                    다이렉트 메시지
                    <button className={styles.addButton}>+</button>
                </div>

                <div className={styles.directMessages}>
                    {directMessages.slice(0, 3).map(message => (
                        <div key={message.id} className={styles.directMessage}>
                            <FaDiscord className={styles.icon}/>
                            <span>{message.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 유저 상태 */}
            <UserStatus/>
        </div>
    );
};

export default SideBarMain;