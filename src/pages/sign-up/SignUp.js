import React from 'react';
import SignUpBtn from "../../components/SignUpBtn";
import SignUpInput from "../../components/SignUpInput";
import styles from './SignUp.module.scss';

const SignUp = () => {





    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>로그인</h1>
                <SignUpInput type={'text'} content={'이메일'}/>
                <SignUpInput type={'password'} content={'비밀번호'}/>
                <div className={styles.checkBox}>
                    <input type={"checkbox"}/>
                    자동로그인
                </div>
                <SignUpBtn content={'로그인'}/>
                <div className={styles.findPW}>비밀번호 찾기</div>
            </div>
        </div>
    );
};

export default SignUp;