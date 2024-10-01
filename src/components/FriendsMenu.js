import React, { useState } from 'react';
import styles from './styles/FriendsMenu.module.scss';

const FriendsMenu = () => {

    // 버튼 목록을 배열로 정의 (active 클래스 부여하기 쉽게)
    const buttons = ['친구', '온라인', '모두', '대기 중', '차단 목록'];
    const [activeButton, setActiveButton] = useState(buttons[0]); // '친구'가 디폴트값
    const [addFriends, setAddFriends] = useState(false); // 친구 추가 모드 상태

    // 액티브 부여 함수
    const setActiveHandler = (buttonName) => {
        setActiveButton(buttonName);
    };

    // 친구 추가하기 버튼 토글 핸들러
    const handleAddFriends = () => {
        setAddFriends((prevState) => !prevState); // 친구 추가 모드 토글
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
                {/* 친구 추가하기 버튼 토글 기능 적용 */}
                <button
                    className={`${styles.addFriendButton} ${addFriends ? styles.active : ''}`}
                    onClick={handleAddFriends}
                >
                    {addFriends ? '친구 추가 취소' : '친구 추가하기'}
                </button>
            </nav>

            {/* addFriends 상태에 따라 Wumpus 그림? 뭐라그래 얘랑 친구 추가 UI 중 하나를 렌더링 */}
            {addFriends ? (
                <div className={styles.content}>
                    <p>3Mans 사용자명을 사용하여 친구를 추가할 수 있습니다.</p>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="사용자명#0000" className={styles.friendInput}/>
                        <button className={styles.addFriendButton}>친구 요청 보내기</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.friendsList}>
                        <p>친구 목록이 비어 있습니다. 친구를 추가해보세요!</p>
                    </div>

                    <div className={styles.character}>
                        <img
                            src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1218478%2Fscreenshots%2F18592319%2Fwumpohug_4x.png&type=a340"
                            alt="Wumpus"
                            className={styles.image}
                        />
                        <p className={styles.text}>아무도 Wumpus와 놀고 싶지 않은가 봐요.</p>
                        <p className={styles.text}>친구가 온라인일 때의 UI는 따로 작성해야 합니다.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default FriendsMenu;
