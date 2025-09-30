import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const api_url = import.meta.env.VITE_API_URI

export const signup = createAsyncThunk('auth/signup', async (obj) => {
    try {
        /* const response = await fetch("http://localhost:5500/signup/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }) */
        const response = await axios.post(`${api_url}/signup/user`, obj)


    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

export const login = createAsyncThunk("auth/login", async (obj) => {
    try {
        /* const response = await fetch('http://localhost:5500/login/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }) */

        const response = await axios.post(`${api_url}/login/user`, obj)
        
        return response.data;

    } catch (error) {
        console.info(`Error : ${error}`)
        throw new Error(error);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: localStorage.getItem("clientname") ?? null,
        token: localStorage.getItem("clientToken") ?? null,
        role: localStorage.getItem("clientRole") ?? null
    },
    reducers: {
        logout: (state, action) => {
            try {
                if (localStorage.getItem('clientToken')) {
                    localStorage.removeItem('clientToken')
                    toast.success("Successfully LoggedOut")
                } else {
                    toast.error("Signin to Logout!!!")
                }
                return { ...state, username: null, token: null, role: null }
            } catch (error) {
                console.warn("Error Logout : ", error)
                toast.error("Error During Logout!!!")
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                toast.success("Signed Up Successfully")
            })
            .addCase(signup.rejected,(state,action)=>{
                toast.info(action.error.message)
            })
            .addCase(login.fulfilled, (state, action) => {
                state.username = action.payload.user.name;
                state.token = action.payload.token;
                state.role = action.payload.user.role;

                localStorage.setItem("clientname", action.payload.user.name);
                localStorage.setItem("clientToken", action.payload.token);
                localStorage.setItem("clientRole", action.payload.user.role);
                toast.success("Logged in");
            })
            .addCase(login.rejected,(state,action)=>{
                toast.info(action.error.message)
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;