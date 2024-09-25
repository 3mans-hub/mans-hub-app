import React from 'react';
import styles from './styles/FriendsMenu.module.scss';

const FriendsMenu = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <button className={styles.navBtn}>친구</button>
                <button className={styles.navBtn}>온라인</button>
                <button className={styles.navBtn}>모두</button>
                <button className={styles.navBtn}>대기 중</button>
                <button className={styles.navBtn}>차단 목록</button>
                <button className={styles.addFriendButton}>친구 추가하기</button>
            </nav>
            <div className={styles.character}>
                <img
                    src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1218478%2Fscreenshots%2F18592319%2Fwumpohug_4x.png&type=a340"
                    alt="Wumpus"
                    className={styles.image}
                />
                <p className={styles.text}>아무도 Wumpus와 놀고 싶지 않은가 봐요.</p>
                <p className={styles.text}>친구가 온라인일때의 UI 따로 작성해야 함</p>
            </div>
        </div>
    );
};

export default FriendsMenu;