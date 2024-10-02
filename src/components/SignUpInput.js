import React from 'react';
import styles from './styles/SignUpInput.module.scss'



const SignUpInput = ({errorMessage, status, value, content, type, setValue, disable}) => {

    const inputValue= (e) => {
        setValue(e.target.value);
    }



    return (
        <div>
            <input className={!disable ? (value === "" ? styles.signUpInput : (status ? styles.signUpInput : styles.errorInput)) : styles.disabledInput}
                   type={type} placeholder={content} onChange={inputValue} disabled={disable}
            />
            {value !== "" && !status && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

export default SignUpInput;