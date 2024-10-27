import React, {useEffect} from 'react';
import {RouterProvider, useNavigate} from "react-router-dom";
import {router} from "./config/route-config";
import {ModalProvider} from "./Context/useModalContext";

const App = () => {
    return (
        <div>
            <ModalProvider>
                <RouterProvider router={router}/>
            </ModalProvider>
        </div>
    );
};

export default App;