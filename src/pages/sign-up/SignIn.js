import React, {useEffect, useState} from 'react';
import styles from "./SignIn.module.scss";
import SignUpInput from "../../components/SignUpInput";
import SignUpBtn from "../../components/SignUpBtn";
import {useNavigate} from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [inputState, setInputState] = useState(false);

    let navigate = useNavigate();

    // 아직 조건 생성 X, 일단 이메일하고 비밀번호를 1글자 이상 입력할경우만 버튼 활성화
    useEffect(() => {

        if(email.length > 0 && password.length > 0) {
            setInputState(true);
        } else {
            setInputState(false);
        }

    }, [email, password]);

    const signUp = () => {
        navigate('/sign-up')
    }

    const findPassword = () => {
        navigate('/find-password')
    }

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>로그인</h1>
                <SignUpInput type={'text'} content={'이메일'} setValue={setEmail} status={true}/>
                <SignUpInput type={'password'} content={'비밀번호'} setValue={setPassword} status={true}/>
                <div className={styles.checkBox}>
                    <input type={"checkbox"}/>
                    자동로그인
                </div>
                <SignUpBtn content={'로그인'} type={inputState}/>
                <div className={styles.navLink}>
                <div className={styles.findPW} onClick={signUp}>회원가입</div>
                <div className={styles.findPW} onClick={findPassword}>비밀번호 찾기</div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;