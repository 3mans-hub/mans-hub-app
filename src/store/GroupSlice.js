import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    // 유저가 상단 '로고'를 눌렀을때와 '그룹'을 눌렀을때의 상태값이
    // 전역적으로 사용될 것 같아서 redux에서 관리합니다
    // true : 그룹 접속 상태
    // false : 그룹 비접속 상태
    joinGroupStatus: false,

    // 접속 중인 그룹 (기본적으로 null로 설정)
    currentGroup: null,

    // 더미데이터입니다 (api에서 받아온 객체로 수정)
    groupList: ['그룹1', '그룹2'],

    // UI를 위해 현재 접속중인 그룹 내 채널 (채팅, 음성, 게시판 등등)
    joinChanel: "채팅" // 기본값
}

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        joinGroup: (state, action) => {
            state.joinGroupStatus = action.payload.status
            state.currentGroup = action.payload.group; // 현재 접속한 그룹 정보
            state.joinChanel = "채팅 채널" // 그룹 이동 시 채널 초기화
        },
        addGroup(state, action) {
            state.groupList = action.payload
        },
        changeJoinChanel(state, action) {
            state.joinChanel = action.payload
        }
    }
})


export const groupActions = groupSlice.actions;

export default groupSlice.reducer;