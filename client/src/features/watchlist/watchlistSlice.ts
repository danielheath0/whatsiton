/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios"
import { WatchlistItem, WatchlistState } from "../../interfaces/interfaces";

const initialState: WatchlistState = {
    items: [],
    status: "idle",
    error: null
}

export const addToWatchlist = createAsyncThunk<void, { showId: string, showTitle: string }>("watchlist/addToWatchlist", async ({ showId, showTitle }) => {
    const token = localStorage.getItem("token")
    const response = await axios.post(import.meta.env.VITE_BASE_URL + `/watchlist/${showId}`, { showTitle },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data.listItem
})

export const getWatchlist = createAsyncThunk("watchlist/getWatchlist", async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/watchlist",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("getWatchlist response:", response.data)

        return response.data
    } catch (error) {
        console.error("Error getting watchlist:", error);
        throw error;
    }
})

export const toggleWatched = createAsyncThunk("watchlist/toggleWatched", async ({ showId, watched }: { showId: string, watched: boolean }, { dispatch }) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.put(import.meta.env.VITE_BASE_URL + `/watchlist/${showId}`, { watched },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return {showId, watched: response.data.watched}
    } catch (error: any) {
        if (error.response && error.response.data.message === "Show not in watchlist") {
            dispatch(removeFromWatchlist(showId))
        }
    }
}
)

export const removeFromWatchlist = createAsyncThunk("watchlist/removeFromWatchlist", async (showId: string) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.delete(import.meta.env.VITE_BASE_URL + `/watchlist/${showId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        throw error;
    }
})

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToWatchlist.pending, (state) => { state.status = "loading" })
            .addCase(addToWatchlist.fulfilled, (state, action) => {
                state.status = "succeeded",
                    state.items.push(action.payload as unknown as WatchlistItem)
            })
            .addCase(addToWatchlist.rejected, (state, action) => {
                state.status = "failed"
                if (action.error.message !== undefined) {
                    state.error = action.error.message
                }
                else {
                    state.error = null
                }
            })
            .addCase(getWatchlist.pending, (state) => { state.status = "loading" })
            .addCase(getWatchlist.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.items = action.payload
            })
            .addCase(getWatchlist.rejected, (state, action) => {
                state.status = "failed"
                if (action.error.message !== undefined) {
                    state.error = action.error.message
                }
                else {
                    state.error = null
                }
            })
            .addCase(toggleWatched.pending, (state) => { state.status = "loading" })
         
            .addCase(toggleWatched.fulfilled, (state, action) => {
                const { showId, watched } = action.payload as { showId: string; watched: any; };
                const index = state.items.findIndex((item) => item.showId === showId);
                if (index !== -1) {
                    state.items[index].watched = watched;
                }
            })
            .addCase(toggleWatched.rejected, (state, action) => {
                state.status = "failed"
                if (action.error.message !== undefined) {
                    state.error = action.error.message
                }
                else {
                    state.error = null
                }
            })
            .addCase(removeFromWatchlist.pending, (state) => { state.status = "loading" })
            .addCase(removeFromWatchlist.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.items = state.items.filter((item: any) => item.show_id !== action.payload.show_id)
            })
            .addCase(removeFromWatchlist.rejected, (state, action) => {
                state.status = "failed"
                if (action.error.message !== undefined) {
                    state.error = action.error.message
                }
                else {
                    state.error = null
                }
            })
    }
})

export const allItems = (state: any) => state.watchlist.items

export default watchlistSlice.reducer