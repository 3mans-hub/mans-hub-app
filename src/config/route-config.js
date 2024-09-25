import {createBrowserRouter} from "react-router-dom";
import MainPage from "../layout/MainPage";
import SignUp from "../pages/sign-up/SignUp";
import SignIn from "../pages/sign-up/SignIn";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path:'/sign-up',
        element: <SignUp />
    },
    {
        path:'/sign-in',
        element: <SignIn />
    }
])