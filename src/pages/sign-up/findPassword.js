import React from 'react';
import styles from "./SignIn.module.scss";
import SignUpInput from "../../components/SignUpInput";


const FindPassword = () => {
    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>비밀번호 찾기</h1>
                <SignUpInput type={'text'} content={'이메일'}/>
            </div>
        </div>
    );
};

export default FindPassword;