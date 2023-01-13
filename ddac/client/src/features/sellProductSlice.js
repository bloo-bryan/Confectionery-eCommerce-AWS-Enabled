import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    testUploadCount: 0,
    testProducts: []
}

export const addProduct = createAsyncThunk('products/addProduct', async(formData, thunkAPI) => {
    try {
        const name = formData.get("title");
        const productRes = await axios.post('http://localhost:8800/add-product', {name})
        const insertId = productRes.data.insertId;
        formData.append("id", insertId);
        const imgRes = await axios.post('http://localhost:8800/upload-img', formData)   //form-data http
        return imgRes.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:8800/images')
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const removeProducts = createAsyncThunk('products/removeProducts', async(id, thunkAPI) => {
    try {
        const response = await axios.delete(`http://localhost:8800/images/${id}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

const sellProductSlice = createSlice({
    name: 'sellProduct',
    initialState,
    reducers: {

    },
    extraReducers: {
        [addProduct.fulfilled]: (state, {payload}) => {
            // console.log(payload);
            state.testUploadCount += payload.rowsAffected;
        },
        [addProduct.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [fetchProducts.fulfilled]: (state, {payload}) => {
            state.testUploadCount = payload.length;
            state.testProducts = payload;
        },
        [fetchProducts.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [removeProducts.fulfilled]: (state, {payload}) => {
            // console.log(payload)
            state.testUploadCount -= payload.rowsAffected;
        },
        [removeProducts.rejected]: (state, {payload}) => {
            console.log(payload);
        },
    }
})

export default sellProductSlice.reducer;