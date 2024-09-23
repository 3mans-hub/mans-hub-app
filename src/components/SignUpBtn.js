import React from 'react';
import styles from './styles/SignUpBtn.module.scss'

const SignUpBtn = ({content}) => {



    return (
        <div>
            <button className={styles.signBtn}>
                {content}
            </button>
        </div>
    );
};

export default SignUpBtn;