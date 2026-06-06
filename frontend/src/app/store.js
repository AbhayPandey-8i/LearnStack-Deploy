import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import rootReducer from "./rootReducer"
import { authApi } from "@/features/api/authapi"

export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
})