import React from 'react';
import SignUpBtn from "../components/SignUpBtn";


const CreateGroup = () => {

    const userData = sessionStorage.getItem("userData")
    return (
        <div>
            <input type="text" placeholder={userData.nickName}/>
            <SignUpBtn  />
        </div>
    );
};

export default CreateGroup;