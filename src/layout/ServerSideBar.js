import React from 'react';
import styles from './styles/ServerSideBar.module.scss';
import UserStatus from '../components/UserStatus'
import {useDispatch, useSelector} from "react-redux";
import ServerStatus from "../components/ServerStatus";
import SideBarMain from "../components/SideBarMain";

const ServerSidebar = () => {

    const dispatch = useDispatch();
    const joinStatus = useSelector(state => state.group.joinGroupStatus)


    return (
        <div className={styles.serverSidebar}>
            {joinStatus ?
                <>
                    <ServerStatus/>
                    <UserStatus/>
                </>
                :
                <SideBarMain/>
            }
        </div>
    );
};

export default ServerSidebar;