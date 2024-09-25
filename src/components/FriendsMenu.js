import React, { useState } from 'react';
import styles from './styles/FriendsMenu.module.scss';

const FriendsMenu = () => {

    // 버튼 목록을 배열로 정의 (active 클래스 부여하기 쉽게)
    const buttons = ['친구', '온라인', '모두', '대기 중', '차단 목록'];
    const [activeButton, setActiveButton] = useState(buttons[0]); // '친구'가 디폴트값

    // 액티브 부여 함수
    const setActiveHandler = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                {buttons.map((button) => (
                    <button
                        key={button}
                        className={`${styles.navBtn} ${activeButton === button ? styles.active : ''}`}
                        onClick={() => setActiveHandler(button)}
                    >
                        {button}
                    </button>
                ))}
                <button
                    className={styles.addFriendButton}
                    onClick={() => setActiveHandler('친구 추가하기')}
                >
                    친구 추가하기
                </button>
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