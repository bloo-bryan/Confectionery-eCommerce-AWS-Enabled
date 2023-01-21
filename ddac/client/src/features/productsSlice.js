import axios from 'axios'
import React from 'react'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async(_, thunkAPI) => {
    try {
        const response = await axios.get("/all-products")
        return response.data
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProduct', async(pid, thunkAPI) => {
    try {
        const detailRes = await axios.get(`/single-product/${pid}`)
        const imagesRes = await axios.get(`/product-images/${pid}`)
        const res = detailRes.data[0];
        res['url'] = imagesRes.data.map((img) => img.url)
        console.log(res)
        return res;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        openSidebar: (state) => {
            return { ...state, isSidebarOpen: true }
        },
        closeSidebar: (state) => {
            return { ...state, isSidebarOpen: false }
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.products_loading = true;
        },
        [fetchProducts.fulfilled]: (state, {payload}) => {
            const featured_products = payload.filter(
                (product) => product.featured === true
            )
            return {
                ...state,
                products_loading: false,
                products: payload,
                featured_products,
            }
        },
        [fetchProducts.rejected]: (state, {payload}) => {
            console.log(payload);
            state.products_loading = false;
            state.products_error = true;
        },
        [fetchSingleProduct.pending]: (state) => {
            state.single_product_loading = true;
            state.single_product_error = false;
        },
        [fetchSingleProduct.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                single_product_loading: false,
                single_product: payload,
            }
        },
        [fetchSingleProduct.rejected]: (state, {payload}) => {
            console.log(payload);
            state.single_product_loading = false;
            state.single_product_error = true;
        }
    }
})

export const {openSidebar, closeSidebar} = productsSlice.actions;
export default productsSlice.reducer;

    // useEffect(() => {
    //     fetchProducts(url)
    // }, [])
