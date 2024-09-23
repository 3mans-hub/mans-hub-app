import React, { useState } from 'react';
import styles from './styles/FriendsMenu.module.scss';

const FriendsMenu = () => {
    const [addFriends, setAddFriends] = useState(false);

    const handleViewAllFriends = () => {
        setAddFriends(false);
    };

    const handleAddFriends = () => {
        setAddFriends(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={handleViewAllFriends} className={styles.viewAllFriendsButton}>
                    전체 친구목록 보기
                </button>
                <button onClick={handleAddFriends} className={styles.addButton}>
                    친구 추가하기
                </button>
            </div>
            {addFriends ? (
                <div className={styles.content}>
                    <p>3Mans 사용자명을 사용하여 친구를 추가할 수 있습니다.</p>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="사용자명#0000" className={styles.friendInput}/>
                        <button className={styles.addFriendButton}>친구 요청 보내기</button>
                    </div>
                </div>
            ) : (
                <div className={styles.friendsList}>
                    {/* 여기에 전체 친구 목록 컴포넌트 또는 리스트를 렌더링 */}
                    <p>친구가 없어 임마.</p>
                </div>
            )}
        </div>
    );
};

export default FriendsMenu;
