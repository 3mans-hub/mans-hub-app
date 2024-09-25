import React from 'react';
import styles from './styles/SignUpInput.module.scss'



const SignUpInput = ({content, type, setValue, disable}) => {

    const inputValue= (e) => {
        setValue(e.target.value);
    }


    return (
        <div>
            <input className={!disable ? styles.signUpInput : styles.disabledInput} type={type} placeholder={content} onChange={inputValue} disabled={disable}/>
        </div>
    );
};

export default SignUpInput;