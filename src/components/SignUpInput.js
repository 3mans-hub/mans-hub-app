import React from 'react';
import styles from './styles/SignUpInput.module.scss'



const SignUpInput = ({content, type, setValue}) => {

    const inputValue= (e) => {
        setValue(e.target.value);
    }


    return (
        <div>
            <input className={styles.signUpInput} type={type} placeholder={content} onChange={inputValue}/>
        </div>
    );
};

export default SignUpInput;