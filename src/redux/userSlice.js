import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoggingIn: true,
    isLoggedIn: false,
    user: {},
    status: "idle",
    error: null
}

export const login = createAsyncThunk("user/login", async (userCredentials, thunkAPI) => {
    try {
        const { isLoggingIn } = thunkAPI.getState().user
        const user = await axios.post(`/api/user/${isLoggingIn ? "login" : "register"}`, userCredentials)

        return user.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.request.response)
    }
})

export const getUserSession = createAsyncThunk("user/getUserSession", async () => {
    const user = await axios.post("/api/user/session")
    return user.data
})

export const logout = createAsyncThunk("user/logout", async () => {
    await axios.post("/api/user/logout")
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeIsLoggingIn: state => {
            state.isLoggingIn = !state.isLoggingIn
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.status = "success"
            state.user = action.payload
        },
        [login.pending]: state => {
            state.status = "pending"
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload
            state.status = "rejected"
        },
        [logout.fulfilled]: () => initialState,
        [getUserSession.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.status = "success"
            state.user = action.payload
        },
        [getUserSession.pending]: state => {
            state.status = "pending"
        },
        [getUserSession.rejected]: () => initialState
    }
})

export const { changeIsLoggingIn } = userSlice.actions
export default userSlice.reducer