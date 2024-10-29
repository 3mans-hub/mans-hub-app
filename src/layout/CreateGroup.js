import React, {useEffect, useState} from 'react';
import SignUpBtn from "../components/SignUpBtn";


const CreateGroup = () => {

    const userData = JSON.parse(sessionStorage.getItem("userData"));


    return (
        <div >
            <input type="text" placeholder={userData.nickname + "님의 서버"}/>
            <button>그룹 만들기 </button>
        </div>
    );
};

export default CreateGroup;