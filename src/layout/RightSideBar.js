import React, { useState } from 'react';
import styles from "./styles/ServerSideBar.module.scss";
import {Outlet, useNavigate} from "react-router-dom";

const RightSideBar = () => {

    const [view, setView] = useState('friends');

    const navigate = useNavigate();

    const logOutBtnClickHandler = () => {

        sessionStorage.removeItem('userData');
        localStorage.removeItem('userData');

        navigate("/sign-in");
    }

    return (
        <div className={styles.serverRightSidebar}>
            {/* 지금은 클릭할때마다 바뀌게 하고 나중에는 소켓 로그인 여부로 바꾸면 될듯? */}

            <div className={styles.logOutBtn} onClick={logOutBtnClickHandler}>로그 아웃</div>

            <p
                className={view === 'friends' ? styles.active : styles.serverRightName}
                onClick={() => setView('friends')}
            >
                내 친구 목록
            </p>
            <p
                className={view === 'participants' ? styles.active : styles.serverRightName}
                onClick={() => setView('participants')}
            >
                참여자 목록
            </p>
            <div className={styles}>
                {/* 이제 이걸 소켓 로그인여부에 따라 렌더링 바꾸면 될듯?  */}
                {view === 'friends' && <p>친구 목록이 비어있습니다.</p>}
                {view === 'participants' && <p>참여인원이 없습니다. </p>}
                <Outlet/> {/* 여기에 유저 정보 넣으면 될듯? */}
            </div>
        </div>
    );
};

export default RightSideBar;
