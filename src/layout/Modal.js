import React from 'react';
import styles from "./styles/Modal.module.scss"

const Modal = ({title, children}) => {

    const loginUserData = sessionStorage.getItem("userData");




    return (
        <div className={styles.backGround}>
            <div className={styles.modal}>
                <div className={styles.title}>{title}</div>
                {children}
            </div>
        </div>
    );
};

export default Modal;