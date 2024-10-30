import React, {useEffect, useState} from 'react';
import styles from "./styles/CreateGroup.module.scss";
import {API_BASE_URL} from "../config/host-config";
import {useModal} from "../Context/useModalContext";
import {groupActions} from "../store/GroupSlice";
import {useDispatch, useSelector} from "react-redux";


const CreateGroup = () => {

    const {closeModal} = useModal();

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const dispatch = useDispatch();

    const groups = useSelector(state => state.group.groupList);

    const [groupName, setGroupName] = useState("");

    const userInputGroupName = (e) => {
        setGroupName(e.target.value);
    }

    const createGroup = async () => {
        const response = await fetch(`${API_BASE_URL}/group/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            },
            body: JSON.stringify(
                {
                    groupName: groupName,
                    email: userData.email
                }
            )
        });

        closeModal();

        dispatch(groupActions.addGroup([...groups, groupName]));  // 기존 그룹에 새 그룹 추가

    }




    return (
        <div className={styles.container}>
            <input onChange={userInputGroupName} className={styles.groupInput} type="text" placeholder={userData.nickname + "님의 서버"}/>
            <button onClick={createGroup} className={styles.creatGroupBtn}>그룹 만들기 </button>
        </div>
    );
};

export default CreateGroup;