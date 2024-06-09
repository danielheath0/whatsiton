import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchShowsParams, RootState, ShowArray, ShowsState } from "../../interfaces/interfaces";
import axiosInstance from "../../helpers/axiosInstance"
import axios from "axios";


const initialState: ShowsState = {
    shows: [],
    status: "idle",
    error: null
}

export const fetchShows = createAsyncThunk<ShowArray, FetchShowsParams>("shows/fetchShows", async ({country, title}) => {
    console.log("country, title" ,country,title)
    const response = await axiosInstance.get("/shows/search/title", {
        params: {
            country,
            title,
            series_granularity: "show",
            show_type: "movie", 
            output_language:  "en"
        }
    })
    console.log("fetchShows response:", response.data)
    return response.data
})



const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShows.pending, (state) => { state.status = "loading" })
            .addCase(fetchShows.fulfilled, (state, action) => {
                console.log("fetchShows.fulfilled action.payload:", action.payload)
                state.status = "succeeded"
                state.shows = action.payload
            })
            .addCase(fetchShows.rejected, (state, action) => {
                state.status = "failed"
                if (action.error.message !== undefined) {
                    state.error = action.error.message
                }
                else {
                    state.error = null
                }
            })
            
    },
})

export const allState = (state: RootState) => state.shows
export const allStatus = (state: RootState) => state.shows.status
export const allShows = (state: RootState) => state.shows.shows
export const allError = (state: RootState) => state.shows.error

export default showsSlice.reducer