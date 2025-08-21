import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { toast } from "react-toastify";

const api_url = import.meta.env.VITE_API_URI;

export const fetchProducts = createAsyncThunk('api/fetchproducts', async () => {
    try {
        const response = await fetch(`${api_url}/getproducts`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
            throw new Error("Failed")
        }
        return (await response.json());

    } catch (err) {
        console.warn(err)
    }
})

export const addProduct = createAsyncThunk('api/addproduct', async (obj) => {
    try {
        const response = await axios.post(`${api_url}/admin/addproduct`, obj);

        return response.data

    } catch (error) {
        throw new Error(error)
    }
})

export const deleteProduct = createAsyncThunk('api/deleproduct', async (id) => {
    try {
        const response = await fetch(`${api_url}/admin/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return id;
    } catch (error) {
        throw new Error(error)
    }
})

export const updateproduct = createAsyncThunk('api/updateproduct', async ({ plainFormData, id }, thunkAPI) => {

    try {
        const response = await fetch(`${api_url}/admin/updateproduct/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plainFormData)
        })

        if (!response.ok) {
            throw new Error("Failed to Update product :", response)
        }

        return { plainFormData, id }

    } catch (error) {
        console.warn(error)
        throw new Error(error)
    }
})

const productSlice = createSlice({
    name: "ecommerce_products",
    initialState: {
        products: [],
        loading: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                toast.success("Product fetch Failed", action.error)
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                toast.success("Product Added Successfully")
                state.products = [...state.products, action.payload]
            })
            .addCase(addProduct.rejected, (state, action) => {
                toast.error("Product Not Added Successfully")

            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(obj => obj._id != action.payload);

                toast.success("Product Deleted Successfully")
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                toast.error("Product Not Deleted")
            })

            .addCase(updateproduct.fulfilled, (state, action) => {
                state.products = state.products.map(obj => obj._id == action.payload.id ? { _id: action.payload.id, ...action.payload.plainFormData } : obj)
                toast.success("Product Updated Successfully")

            })

    }
})

export default productSlice.reducer;