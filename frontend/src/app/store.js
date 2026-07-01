import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import rootReducer from "./rootReducer"
import { authApi } from "@/features/api/authapi"
import { courseApi } from "@/features/api/courseApi"
import { purchaseApi } from "@/features/api/purchaseApi"

export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware)
})


//Keeping user after refresh
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();