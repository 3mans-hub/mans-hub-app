import {configureStore} from "@reduxjs/toolkit";
import groupReducer from './GroupSlice'

const store = configureStore({
    reducer: {
        group: groupReducer,
    }
})

export default store;