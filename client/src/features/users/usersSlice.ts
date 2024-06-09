import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState, User } from "../../interfaces/interfaces";
import axios from "axios";
import { RootState } from "../../app/store";

const initialState: UsersState = {
    user: {
        fName: "",
        lName: "",
        email: "",
        uName: "",
        password: "",
        countryCode: "",
    },
    status: "idle",
    error: null
}

export const registerUser = createAsyncThunk<User, { user: User }>("users/register", async (user, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/register", { user })
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

        return thunkAPI.rejectWithValue(error.message)
    }
})

export const loginUser = createAsyncThunk<User, { user: User }>("users/loginUser", async (user, thunkAPI) => {
    try {
        console.log("user:",user)
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", { user })
        localStorage.setItem("token", response.data.token)

        if (response.status === 200) {

            return response.data.user
        }
        else { thunkAPI.rejectWithValue(response.data.message) }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

        return thunkAPI.rejectWithValue(error.message)
    }
})


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.status = "loading" })

            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("registerUser.fulfilled action.payload:", action.payload)
                state.status = "succeeded"
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("registerUser.rejected action.payload:", action.payload)

                state.status = "failed"
                state.error = action.payload
                console.log(state);
            })
            .addCase(loginUser.pending, (state) => { state.status = "loading" })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("State before update:", state.user) // Log the state before it is updated
                state.status = "succeeded"
                state.user = action.payload
                console.log("State after update:", state.user)
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("loginUser.rejected action.payload:", action.payload)
                state.status = "failed"
                state.error = action.payload
                console.log(state);
            });

    }
})
export const allUser = (state: RootState) => state.users.user
export const userCountry = (state: RootState) => state.users.user.countryCode
export default usersSlice.reducer

