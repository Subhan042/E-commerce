import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../Slices/cartSlice'
import userReducer from '../Slices/userSlice'

const store = configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer
    }
})

export default store;