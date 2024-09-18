import { createSlice } from "@reduxjs/toolkit";


export const userAuthSlice = createSlice({
name:'userAuth',
initialState:{
 isAppReady: false,

},
reducers:{
    setIsAppReady: (state, action)=>{
        state.isAppReady = action.payload;
    }

}

});


export const { setIsAppReady } = userAuthSlice.actions;