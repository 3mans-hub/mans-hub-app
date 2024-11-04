import React, {useState} from 'react';
import styles from "./styles/CreateGroup.module.scss";
import {useModal} from "../Context/useModalContext";
import {useDispatch, useSelector} from "react-redux";
import {API_BASE_URL} from "../config/host-config";
import {groupActions} from "../store/GroupSlice";



const JoinGroup = () => {

    const {closeModal} = useModal();

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const groups = useSelector(state => state.group.groupList);

    const dispatch = useDispatch();

    const [joinCode, setJoinCode] = useState("")

    const userInputJoinCode = (e) => {
        setJoinCode(e.target.value);
    }

    const joinGroup = async () => {
        const response = await fetch(`${API_BASE_URL}/group/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            },
            body: JSON.stringify(
                {
                    joinCode: joinCode,
                    email: userData.email
                }
            )
        });

        const data = await response.json();

        closeModal();

        dispatch(groupActions.addGroup({...groups, data}));  // 기존 그룹에 새 그룹 추가

    }


    return (
        <div className={styles.container}>
            <input onChange={userInputJoinCode} className={styles.groupInput} type="text"
                   placeholder={"참여 코드 입력"}/>
            <button onClick={joinGroup} className={styles.creatGroupBtn}>그룹 만들기</button>
        </div>
    );
};

export default JoinGroup;