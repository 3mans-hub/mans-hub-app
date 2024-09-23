import {createBrowserRouter} from "react-router-dom";
import MainPage from "../layout/MainPage";
import SignUp from "../pages/sign-up/SignUp";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path:'/sign-up',
        element: <SignUp />
    }
])