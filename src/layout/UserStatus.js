import React from 'react';
import styles from './styles/UserStatus.module.scss';
import {BsCameraVideoOffFill} from "react-icons/bs";
import {MdCallEnd, MdDesktopAccessDisabled, MdTune} from "react-icons/md";
import {FaHeadphones} from "react-icons/fa";
import {IoMdSettings} from "react-icons/io";
import {HiMicrophone} from "react-icons/hi";

const UserStatus = () => {
    return (
        <div className={styles.userStatus}>
            {/* 음성 연결 상태 */}
            <div className={styles.voiceStatus}>
                <p className={styles.connectionStatus}>음성 연결됨</p>
                <p className={styles.projectInfo}>일반 / 사이드프로젝트</p>
                <div className={styles.voiceControls}>
                    <BsCameraVideoOffFill />
                    <MdDesktopAccessDisabled />
                    <MdTune />
                    <MdCallEnd />
                </div>
            </div>

            {/* 사용자 정보 및 상태 */}
            <div className={styles.userInfo}>
                <div className={styles.icon}></div>
                <div>
                    <p className={styles.userName}>user1</p>
                    <p className={styles.userStatusText}>온라인</p>
                </div>
                <div className={styles.controls}>
                    <HiMicrophone />
                    <FaHeadphones />
                    <IoMdSettings />
                </div>
            </div>
        </div>
    );
};

export default UserStatus;