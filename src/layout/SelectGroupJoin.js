import React from 'react';
import styles from "./styles/SelectGroupJoin.module.scss";
import {useModal} from "../Context/useModalContext";
import CreateGroup from "./CreateGroup";


const SelectGroupJoin = () => {

    const {openModal, closeModal} = useModal();

    const selectCreateGroup = () => {
        closeModal();

        openModal(
            "그룹 생성",
            <CreateGroup />
        );
    };


    return (
        <div className={styles.container}>
            <button onClick={selectCreateGroup} className={styles.createGroupBtn} >그룹 생성하기</button>
            <button className={styles.joinGroupBtn}>그룹 참여하기</button>
        </div>
    );
};

export default SelectGroupJoin;