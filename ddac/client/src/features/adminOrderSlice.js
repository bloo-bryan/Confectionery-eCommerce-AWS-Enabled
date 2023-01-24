import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    orders: [],
    currentOrderDetails: []
}

export const fetchOrders = createAsyncThunk('adminOrder/fetchOrders', async(_, thunkAPI) => {
    try {
        const {userDetails} = thunkAPI.getState().user;
        const response = await axios.get(`/all-orders/${userDetails.userId}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchOrderDetails = createAsyncThunk('adminOrder/fetchOrderDetails', async(oid, thunkAPI) => {
    try {
        const response = await axios.get(`/single-order/${oid}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const updateOrderStatus = createAsyncThunk('adminOrder/updateOrderStatus', async(data, thunkAPI) => {
    try {
        const {oid, status} = data;
        const response = await axios.put(`/update-status/${oid}`, {status})
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
        },
        [updateOrderStatus.fulfilled]: () => {
            toast.success('Order status changed!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
        [updateOrderStatus.rejected]: () => {
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
})

export default adminOrderSlice.reducer;