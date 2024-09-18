import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../slices/counterSlice";
import { userAuthSlice } from "../slices/user-auth-slice";

export const store = configureStore({

reducer:{
    counter: counterSlice.reducer,
    userAuth: userAuthSlice.reducer
},

});