import React from 'react';
import styles from './styles/SignUpBtn.module.scss'

const SignUpBtn = ({content, type, eventHandler}) => {

    return (
        <div>
            <button className={type? styles.signBtn : styles.disabledBtn} disabled={!type} onClick={eventHandler}>
                {content}
            </button>
        </div>
    );
};

export default SignUpBtn;