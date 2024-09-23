import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    // 유저가 상단 '로고'를 눌렀을때와 '그룹'을 눌렀을때의 상태값이
    // 전역적으로 사용될 것 같아서 redux에서 관리합니다
    // true : 그룹 접속 상태
    // false : 그룹 비접속 상태
    joinGroupStatus: false,

    // 더미데이터입니다
    groupList: ['그룹1', '그룹2'],
}

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        joinGroup: (state, action) => {
            state.joinGroupStatus = action.payload
        },
        addGroup(state, action) {
            state.groupList = action.payload
        }
    }
})


export const groupActions = groupSlice.actions;

export default groupSlice.reducer;