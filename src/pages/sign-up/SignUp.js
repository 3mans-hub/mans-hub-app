import React from 'react';
import SignUpBtn from "../../components/SignUpBtn";
import SignUpInput from "../../components/SignUpInput";
import styles from './SignUp.module.scss';

const SignUp = () => {





    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>로그인</h1>
                <SignUpInput type={'text'} content={'이메일을 입력해 주세요.'}/>
                <SignUpInput type={'password'} content={'비밀번호를 입력해 주세요.'}/>
                <SignUpBtn content={'로그인'}/>
            </div>
        </div>
    );
};

export default SignUp;