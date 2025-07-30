import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const CartSlices = createSlice({
    name: 'cartSlice',
    initialState: { productData: [] },
    reducers: {
        addProduct: (state, action) => {
            console.log("Added Product to Cart :", action.payload)
            return { ...state, productData: [...state.productData, action.payload] }
        },
        removeProduct: (state, action) => {
            const newProducts = state.productData.filter(obj => obj.id !== action.payload)
            return ({ ...state, productData: [...newProducts] })
        }
    }
})

export const { addProduct, removeProduct } = CartSlices.actions;
export default CartSlices.reducer;