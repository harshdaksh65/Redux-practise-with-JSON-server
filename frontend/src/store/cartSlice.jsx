import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadcart : (state,action)=>{
            state.carts = action.payload;
        },
    },
});

export const {loadcart} = CartSlice.actions;
export default CartSlice.reducer