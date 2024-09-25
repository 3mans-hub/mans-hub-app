import React from 'react';
import styles from './styles/UserStatus.module.scss';
import {BsCameraVideoOffFill} from "react-icons/bs";
import {MdCallEnd, MdDesktopAccessDisabled, MdTune} from "react-icons/md";
import {FaHeadphones} from "react-icons/fa";
import {IoMdSettings} from "react-icons/io";
import {HiMicrophone} from "react-icons/hi";
import {useSelector} from "react-redux";

const UserStatus = () => {

    // 그룹에 참가해있는 상태?
    const joinStatus = useSelector(state => state.group.joinGroupStatus);

    // 현재 참가한 그룹 정보
    const currentGroup = useSelector(state => state.group.currentGroup);

    // 참가해있는 채널 정보 (음성이냐 채팅이냐 등등)
    const joinChanel = useSelector(state => state.group.joinChanel);


    return (
        <div className={styles.userStatus}>
            {/* 음성 연결 상태 */}
            {joinStatus && joinChanel === "음성 채널" ?
                <div className={styles.voiceStatus}>
                    <p className={styles.connectionStatus}>음성 연결됨</p>
                    <p className={styles.projectInfo}>일반 / {currentGroup}</p>
                    <div className={styles.voiceControls}>
                        <BsCameraVideoOffFill className={styles.iconControl}/>
                        <MdDesktopAccessDisabled className={styles.iconControl}/>
                        <MdTune className={styles.iconControl}/>
                        <MdCallEnd className={styles.iconControl}/>
                    </div>
                </div>
            :
                <div></div>
            }

            {/* 사용자 정보 및 상태 */}
            <div className={styles.userInfo}>
                <div className={styles.avatar}></div>
                <div className={styles.userDetails}>
                    <p className={styles.userName}>유저1</p>
                    <p className={styles.userStatusText}>온라인</p>
                </div>
                <div className={styles.controls}>
                    <HiMicrophone className={styles.icon}/>
                    <FaHeadphones className={styles.icon}/>
                    <IoMdSettings className={styles.icon}/>
                </div>
            </div>
        </div>
    );
};

export default UserStatus;