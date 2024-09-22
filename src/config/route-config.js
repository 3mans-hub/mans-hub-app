import {createBrowserRouter} from "react-router-dom";
import MainPage from "../layout/MainPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>
    }
])