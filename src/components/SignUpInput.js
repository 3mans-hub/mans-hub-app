import React from 'react';
import styles from './styles/SignUpInput.module.scss'



const SignUpInput = ({content, type}) => {
    return (
        <div>
            <input className={styles.signUpInput} type={type} placeholder={content}/>
        </div>
    );
};

export default SignUpInput;