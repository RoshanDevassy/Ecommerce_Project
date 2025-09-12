import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const api_url = import.meta.env.VITE_API_URI;

export const addCartItem = createAsyncThunk('api/addcartitem', async ({ obj, token }) => {
    try {
        const response = await fetch(`${api_url}/addtocart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        })

        if (!response.ok) {
            const err = await response.json();

            if (err.error === "Item already inserted") {
                toast.error("Item already inserted")
                throw new Error(err.error)
            }

        }

        return await response.json();
    } catch (error) {
        console.warn(`Add cart item error :${error}`)
        throw new Error(error)
    }

})

export const getCartItem = createAsyncThunk("api/getcartitem", async (token) => {
    try {
        const response = await fetch(`${api_url}/getcartitems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            if (response.status === 401) {
                const errorData = await response.json()

                if (errorData.error === "TokenExpired") {
                    toast.info("Session Timeout Please Login")
                    localStorage.removeItem("clientToken")
                    localStorage.removeItem("clientRole")
                    localStorage.removeItem("clientname")

                    window.location.href = "/login"
                }
                else if (errorData.error === "noToken") {
                    toast.info("Please login to continue");

                    window.location.href = "/login"
                }
            }
        }



    } catch (error) {
        throw new Error(error)
    }
})


export const deleteCartItem = createAsyncThunk('api/deletecartitem', async ({ id, token }) => {

    const response = await fetch(`${api_url}/deletecartitem/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.ok) {
        return await response.json()
    }

    console.warn("Error", response)
})

const cartSlice = createSlice({
    name: "CartItems",
    initialState: {
        cartProducts: [],
        loading: null,
        status: null,
        cartError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCartItem.fulfilled, (state, action) => {
                console.info(`Cart item added : ${JSON.stringify(action.payload)}`)
                state.cartProducts = [state.cartProducts, action.payload]
                toast.success("Product Added to Cart")
            })
            .addCase(addCartItem.rejected, (state, action) => {

            })

            .addCase(getCartItem.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
                state.cartError = false
            })
            .addCase(getCartItem.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loading = false;
                state.cartProducts = action.payload
                state.cartError = false
            })
            .addCase(getCartItem.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false
                state.cartError = action.error.message;
            })

            .addCase(deleteCartItem.fulfilled, (state, action) => {
                console.info(`Deleted Item : ${JSON.stringify(action.payload)}`)
                state.cartProducts = state.cartProducts.filter(obj => obj._id != action.payload._id);
                toast.success("Product Deleted Successfully");
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                toast.error(`${action.error.message}`)
            })
    }
})

export default cartSlice.reducer;