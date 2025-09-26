import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"

const store = configureStore({
    reducer : {
        auth: authSlice
        // TODO: need to add posts slice to avoid web requests
    }
})

export default store
