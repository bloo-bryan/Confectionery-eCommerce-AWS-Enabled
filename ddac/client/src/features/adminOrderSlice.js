import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import customFetch from "../utils/axios";

const initialState = {
    orders: [],
    currentOrderDetails: []
}

export const fetchOrders = createAsyncThunk('adminOrder/fetchOrders', async(_, thunkAPI) => {
    try {
        // TODO: GET MERCHANT ID FROM USER STATE
        const response = await customFetch.get(`/all-orders/${1}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchOrderDetails = createAsyncThunk('adminOrder/fetchOrderDetails', async(oid, thunkAPI) => {
    try {
        const response = await customFetch.get(`/single-order/${oid}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const updateOrderStatus = createAsyncThunk('adminOrder/updateOrderStatus', async(data, thunkAPI) => {
    try {
        const {oid, status} = data;
        const response = await customFetch.put(`/update-status/${oid}`, {status})
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})


const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchOrders.fulfilled]: (state, {payload}) => {
            state.orders = payload;
        },
        [fetchOrders.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [fetchOrderDetails.fulfilled]: (state, {payload}) => {
            state.currentOrderDetails = payload;
        },
        [fetchOrderDetails.rejected]: (state, {payload}) => {
            console.log(payload);
        }
    }
})

export default adminOrderSlice.reducer;