import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./logSlice";


const store = configureStore  ({reducer : {
    login : logSlice.reducer
}})


export default store;