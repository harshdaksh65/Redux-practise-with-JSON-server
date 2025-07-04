import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUser : (state,action)=>{
            state.users = action.payload;
        },
        removeUser : (state,action)=>{
            state.users = null
        }
    },
});

export const {loadUser , removeUser} = UserSlice.actions;
export default UserSlice.reducer;