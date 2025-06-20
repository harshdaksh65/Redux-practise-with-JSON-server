import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice'
import CartSlice from './cartSlice'
import ProductSlice from './ProductSlice'

export const store = configureStore({
  reducer: {
    userReducer: UserSlice,
    productReducer: ProductSlice,
    cartReducer: CartSlice
  },
});