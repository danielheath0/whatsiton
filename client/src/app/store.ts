import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import showsReducer from "../features/shows/showsSlice"
import usersReducer from "../features/users/usersSlice"
import watchlistReducer from "../features/watchlist/watchlistSlice"

export const store = configureStore({
    reducer:{
        shows: showsReducer,
        users: usersReducer,
        watchlist: watchlistReducer

    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
