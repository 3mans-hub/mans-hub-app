import React from 'react';
import styles from './styles/ServerSideBar.module.scss';
import UserStatus from './UserStatus'
import {useDispatch, useSelector} from "react-redux";

const ServerSidebar = () => {

    const dispatch = useDispatch();
    const joinStatus = useSelector(state => state.group.joinGroupStatus)


    return (
        <div className={styles.serverSidebar}>
            <p className={styles.serverName}>서버 이름</p>
            {/*
                여기에 서버 관련 내용은 다른 디렉터리에서
                컴포넌트화 하고 넣으면 좋을 것 같습니다 - 기범
             */}

            <UserStatus />
        </div>
    );
};

export default ServerSidebar;