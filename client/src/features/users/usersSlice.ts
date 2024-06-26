/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState, User, } from "../../interfaces/interfaces";
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

export const registerUser = createAsyncThunk<User, User>("users/register", async (user, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/register", { user })
        // console.log("Response from registerUser:", response.data)
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

        return thunkAPI.rejectWithValue(error.message)
    }
})

export const loginUser = createAsyncThunk<any,any>("users/loginUser", async (user, thunkAPI) => {
    // console.log("loginUser thunk, user:", user);
    try {
      // console.log("user:", user);
      // console.log("Making login request to:", import.meta.env.VITE_BASE_URL + "/users/login", "with user:", user);
    //   const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", {user});
      const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", user);
      localStorage.setItem("token", response.data.token);
  
      if (response.status === 200) {
        return { user: response.data.user, token: response.data.token };
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error: any) {
        // console.log("Error in loginUser thunk:", error);
      if (error.response && error.response.data && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An error occurred while logging in");
    }
  });


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.status = "loading" })

            .addCase(registerUser.fulfilled, (state, action) => {
                // console.log("registerUser.fulfilled action.payload:", action.payload)
                state.status = "succeeded"
                state.user = action.payload
                // console.log("State after update:", state.user)
            })
            .addCase(registerUser.rejected, (state, action) => {
                // console.log("registerUser.rejected action.payload:", action.payload)

                state.status = "failed"
                state.error = action.payload as string
                // console.log(state);
            })
            .addCase(loginUser.pending, (state) => { state.status = "loading" })
            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("State before update:", state.user)
                state.status = "succeeded"
                state.user = { ...state.user, ...action.payload.user }
                // console.log("State after update:", state.user)
            })
            .addCase(loginUser.rejected, (state, action) => {
                // console.log("loginUser.rejected action.payload:", action.payload)
                state.status = "failed"
                state.error = action.payload as string
                // console.log(state);
            });

    }
})
export const allUser = (state: RootState) => state.users.user
export const userCountry = (state: RootState) => state.users.user.countryCode
export default usersSlice.reducer

