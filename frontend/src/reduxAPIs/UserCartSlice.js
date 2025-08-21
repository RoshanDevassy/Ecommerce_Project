import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const api_url = import.meta.env.VITE_API_URI;

export const addCartItem = createAsyncThunk('api/addcartitem', async ({ obj, token }) => {
    console.info("Add to cart obj :",obj)
    try {
        const response = await fetch(`${api_url}/addtocart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        })

        if (response.ok) {
            alert("Product Added to Cart")
        }
    } catch (error) {
        console.warn("Add cart item error : ", error)
    }

})

export const getCartItem = createAsyncThunk("api/getcartitem", async (token) => {
    const response = await fetch(`${api_url}/getcartitems`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
    })

    return await response.json();
})


export const deleteCartItem = createAsyncThunk('api/deletecartitem', async ({ id, token }) => {

    console.info("redux delete id :", id)
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
        status: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCartItem.fulfilled, (state, action) => {
            })

            .addCase(getCartItem.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(getCartItem.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loading = false;
                state.cartProducts = action.payload
            })
            .addCase(getCartItem.rejected, (state, action) => {
                state.status = 'rejected';
            })

            .addCase(deleteCartItem.fulfilled, (state, action) => {
                console.info("delete fulfilled payload :", action.payload.userID)
                state.cartProducts = state.cartProducts.filter(obj => obj.userID != action.payload.userID && obj._id != action.payload._id)
                console.info(state.cartProducts)
                alert("Product Deleted Successfully");
            })
    }
})

export default cartSlice.reducer;