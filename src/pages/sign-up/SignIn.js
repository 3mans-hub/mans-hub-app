import React, {useEffect, useState} from 'react';
import styles from "./SignIn.module.scss";
import SignUpInput from "../../components/SignUpInput";
import SignUpBtn from "../../components/SignUpBtn";
import {useNavigate} from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [inputState, setInputState] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const [autoLogin, setAutoLogin] = useState(false);

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

    const autoLoginHandler = () => {
        setAutoLogin(prevState => !prevState)
    }

    const loginBtnEventHandler = async () => {

        const response = await fetch('http://localhost:6969/sign_in', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                password:password,
                autoLogin: autoLogin
            }),
        });

        const data = await response.json();

        console.log(data);

        if(!data.isLogin) {

            if(data.signInStatus === "EMAIL") {
                setErrorMessage("가입되지 않은 이메일 입니다.")
            } else if (data.signInStatus === "PASSWORD") {
                setErrorMessage("비밀번호가 일치하지 않습니다.")
            }
        } else {
            if(autoLogin) {
                localStorage.setItem('userData', JSON.stringify(data));
            }

            sessionStorage.setItem ('userData', JSON.stringify(data));

            navigate("/");
        }





    }


    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>로그인</h1>
                <SignUpInput type={'text'} content={'이메일'} setValue={setEmail} status={true}/>
                <SignUpInput type={'password'} content={'비밀번호'} setValue={setPassword} status={true}/>
                <div className={styles.checkBox}>
                    <input type={"checkbox"} onChange={autoLoginHandler}/>
                    자동로그인
                </div>
                <div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <SignUpBtn content={'로그인'} type={inputState} eventHandler={loginBtnEventHandler}/>
                </div>
                <div className={styles.navLink}>
                <div className={styles.findPW} onClick={signUp}>회원가입</div>
                <div className={styles.findPW} onClick={findPassword}>비밀번호 찾기</div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;