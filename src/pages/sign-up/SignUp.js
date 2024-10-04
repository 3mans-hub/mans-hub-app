import React, {useEffect, useState} from 'react';
import SignUpBtn from "../../components/SignUpBtn";
import SignUpInput from "../../components/SignUpInput";
import styles from './SignUp.module.scss';
import {useNavigate} from "react-router-dom";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [emailVerification, setEmailVerification] = useState(false)
    const [verificationCode, setVerificationCode] = useState("");
    const [validateVerificationCode, setValidateVerificationCode] = useState(false)
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [step, setStep] = useState(1);
    let navigate = useNavigate();

    const validateEmail = (email) => {
        // 이메일 형식을 확인하는 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isVerificationCode = (verificationCode) => {

        const verificationCodeRegex = /^\d{4}$/;

        return verificationCodeRegex.test(verificationCode);
    }


    useEffect(() => {

        if(isVerificationCode(verificationCode)) {
            setValidateVerificationCode(true);
        } else {
            setValidateVerificationCode(false);
        }

    }, [verificationCode]);

    useEffect(() => {

       if(validateEmail(email)) {
           setEmailVerification(true);
       } else {
           setEmailVerification(false);
       }
    }, [email]);

    const nextStep = async () => {

        if(step === 1) {
            const availableEmail =await checkEmail();

            if(availableEmail) setStep(step + 1);

        } else if (step === 2) {

           const verification =await checkVerificationCode();

           if(verification) setStep(step + 1);

        } else if (step === 3) {

            if(userInput()) setStep(step + 1);
        } else if (step === 4) {

            if(userInput()) setStep(step + 1);

        }


    }

    const checkEmail = async () => {
        const response = await fetch('http://localhost:6969/sign_up/email', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email
            }),
        });

        const data =await response.text();

        console.log(data);

        if(data === "registered") {
            alert("이미 가입중인 유저입니다!!");

            return false;
        }

        return true;
    }

    const checkVerificationCode = async () => {
        const response = await fetch('http://localhost:6969/sign_up/check_verificationCode', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                verificationCode:verificationCode
            }),
        });

        const data =await response.text();

        console.log(data);

        if(data === "인증 성공") {

            return true;
        }

        alert(data);

        return false;
    }

    const signUpHandler = async () => {
        const response = await fetch('http://localhost:6969/sign_up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                nickName:nickName,
                password:password
            }),
        });

        const data =await response.text();

        console.log(data);

        if(data !== null) {

            alert("가입이 완료되었습니다.")

            navigate("/sign-in")
        }

    }

    const validateNickName = (nickName) => {
        return nickName.length >= 3;
    }

    const validatePassword = (password) => {
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    }

    const validatePasswordConfirm = (password, passwordConfirm) => {
        return password === passwordConfirm;
    }

    const userInput = () => {
        if (step === 3) {
            return validateNickName(nickName);
        } else if (step === 4) {
            return validatePassword(password)
        } else {
            return validateNickName(nickName) && validatePassword(password) && validatePasswordConfirm(password, passwordConfirm);
        }
    }

    return (

            <div className={styles.container}>
                <h1 className={styles.title}>회원가입</h1>
                <SignUpInput value={email} type={'text'} content={'이메일'} setValue={setEmail} disable={step > 1}
                             status={emailVerification}
                             errorMessage={"이메일 형식이 아닙니다."}
                />
                {step > 1 && <SignUpInput value={verificationCode} type={'text'} content={'이메일 인증번호'} setValue={setVerificationCode} disable={step > 2}
                                          errorMessage={"4자리 숫자 형식의 인증번호를 입력해 주세요."}
                                          status={validateVerificationCode}
                />}
                {step > 2 && <SignUpInput value={nickName} type={'text'} content={'닉네임'} setValue={setNickName}
                                          errorMessage={"3글자 이상의 닉네임을 입력해주세요."}
                                          status={validateNickName(nickName)}
                />}
                {step > 3 && <SignUpInput value={password} type={'password'} content={'비밀번호'} setValue={setPassword}
                                          errorMessage={"특수문자, 대소문자가 최소 1개 이상 들어간 8~12자의 비밀번호를 입력해 주세요."}
                                          status={validatePassword(password)}
                />}
                {step > 4 && <SignUpInput value={passwordConfirm} type={'password'} content={'비밀번호'} setValue={setPasswordConfirm}
                                          errorMessage={"비밀번호가 일치하지 않습니다."}
                                          status={validatePasswordConfirm(password, passwordConfirm)}
                />}

                {step === 1 && <SignUpBtn content={'인증번호 요청'} type={emailVerification} eventHandler={nextStep}/>}
                {step === 2 && <SignUpBtn content={'인증번호 확인'} type={validateVerificationCode} eventHandler={nextStep} />}
                {( 2 < step && step < 5 ) && <SignUpBtn content={'다음'} type={userInput()} eventHandler={nextStep}/>}
                {step === 5 && <SignUpBtn content={'회원가입'} type={userInput()} eventHandler={signUpHandler}/>}
            </div>

    );

};

export default SignUp;