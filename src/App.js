import React, {useEffect} from 'react';
import {RouterProvider, useNavigate} from "react-router-dom";
import {router} from "./config/route-config";
import {ModalProvider} from "./Context/useModalContext";

const App = () => {
    return (
        <div>

                <RouterProvider router={router}/>

        </div>
    );
};

export default App;