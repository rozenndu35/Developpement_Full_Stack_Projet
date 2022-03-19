import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        messageInfo : "",
        openInfo: false,
        severityInfo: "success"
    },
    reducers: {
        openInfoAction: (state, action) =>{
            state.openInfo = action.payload.openInfo;
            state.messageInfo = action.payload.messageInfo;
            state.severityInfo = action.payload.severityInfo;
        },
        handleCloseInfoAction: (state) =>{
            state.openInfo = false;
            state.messageInfo = "";
        }
    }
})

export const {openInfoAction, handleCloseInfoAction} = messageSlice.actions

export default messageSlice.reducer