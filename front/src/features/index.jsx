import { configureStore } from '@reduxjs/toolkit'
import { pastryApi } from './pastry'

export const store = configureStore({
    reducer: {
        [pastryApi.reducerPath]: pastryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pastryApi.middleware),
})
