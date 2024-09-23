import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    groupList: ['그룹1', '그룹2'], // 더미데이터입니다
}

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        addGroup(state, action) {
            state.groupList = action.payload
        }
    }
})


export const groupActions = groupSlice.actions;

export default groupSlice.reducer;