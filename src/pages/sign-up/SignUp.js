import React, {useEffect, useState} from 'react';
import SignUpBtn from "../../components/SignUpBtn";
import SignUpInput from "../../components/SignUpInput";
import styles from './SignUp.module.scss';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [emailVerification, setEmailVerification] = useState(false)
    const [verificationCode, setVerificationCode] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [step, setStep] = useState(1);

    const validateEmail = (email) => {
        // 이메일 형식을 확인하는 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {

       if(validateEmail(email)) {
           setEmailVerification(true)
       }
    }, [email]);

    const nextStep = async () => {

        if(step === 1) {

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
                return;
            }

        }


        setStep(step + 1);
    }

    const userInput = () => {
        if (step === 3) {
            return nickName;
        } else if (step === 4) {
            return password;
        }
    }

    return (

            <div className={styles.container}>
                <h1 className={styles.title}>회원가입</h1>
                <SignUpInput type={'text'} content={'이메일'} setValue={setEmail} disable={step > 1}/>
                {step > 1 && <SignUpInput type={'text'} content={'이메일 인증번호'} setValue={setVerificationCode} disable={step > 2}/>}
                {step > 2 && <SignUpInput type={'text'} content={'닉네임'} setValue={setNickName} />}
                {step > 3 && <SignUpInput type={'password'} content={'비밀번호'} setValue={setPassword}/>}
                {step > 4 && <SignUpInput type={'password'} content={'비밀번호'} setValue={setPasswordConfirm}/>}

                {step === 1 && <SignUpBtn content={'인증번호 요청'} type={emailVerification} eventHandler={nextStep}/>}
                {step === 2 && <SignUpBtn content={'인증번호 확인'} type={verificationCode !== ""} eventHandler={nextStep} />}
                {( 2 < step && step < 5 ) && <SignUpBtn content={'다음'} type={userInput() !== ""} eventHandler={nextStep}/>}
                {step === 5 && <SignUpBtn content={'회원가입'} type={passwordConfirm !== ""}/>}
            </div>

    );

};

export default SignUp;