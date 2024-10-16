import React, {useEffect, useState} from 'react';
import styles from "./FindPassword.module.scss";
import SignUpInput from "../../components/SignUpInput";
import SignUpBtn from "../../components/SignUpBtn";


const FindPassword = () => {

    const [email, setEmail] = useState("");

    const [verificationCode, setVerificationCode] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isEmail, setIsEmail] = useState(false);

    const [step, setStep] = useState(1);

    const validateEmail = (email) => {
        // 이메일 형식을 확인하는 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        setIsEmail(validateEmail(email))
    }, [email]);

    const nextStep = () => {
        setStep(step + 1);
    }

    const emailVerified = async() => {

        const response = await fetch('http://localhost:6969/find_password/email', {
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

    }



    return (
        <div>
            <div className={styles.container}>
                {(step === 1 || step === 2 ) && <h1 className={styles.title}>비밀번호 찾기</h1> }
                {(step >= 3) && <h1 className={styles.title}>비밀번호 변경</h1> }
                {(step === 1 || step === 2 ) && <SignUpInput type={'text'} content={'이메일'} setValue={setEmail} disable={step !== 1}
                                                             errorMessage={"이메일 형식이 아닙니다."} status={isEmail} value={email}/> }
                {( step === 2 ) && <SignUpInput type={'text'} content={'인증번호'} setValue={setVerificationCode}  status={true}/> }

                {step === 1 && <SignUpBtn type={isEmail} content={'인증번호 요청'} eventHandler={emailVerified}/>}
                {step === 2 && <SignUpBtn type={verificationCode !== ""} content={'인증번호 인증'} eventHandler={email}/>}

                {( step >= 3 ) && <SignUpInput type={'password'} content={'비밀번호'} setValue={setNewPassword}  status={true}/> }
                {( step === 4 ) && <SignUpInput type={'password'} content={'비밀번호 확인'} setValue={setConfirmPassword}/> }

                {step === 3 && <SignUpBtn type={newPassword !== ""} content={'다음'} eventHandler={nextStep}/>}
                {step === 4 && <SignUpBtn type={confirmPassword === newPassword} content={'비밀번호 변경'}/>}
            </div>
        </div>
    );
};

export default FindPassword;