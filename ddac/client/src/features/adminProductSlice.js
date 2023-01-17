import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialProductDetails = {
    product_id: '',
    name: '',
    description: '',
    SKU: '',
    brand: '',
    price: '',
    quantity: '',
    category: ''
};

const initialState = {
    testUploadCount: 0,
    testProducts: [],
    products: [],
    currentProductDetails: {
        product_id: '',
        name: '',
        description: '',
        SKU: '',
        brand: '',
        price: '',
        quantity: '',
        category: ''
    },
    currentProductImages: [],
    uploading: false,
}

export const fetchProducts = createAsyncThunk('adminProduct/fetchProducts', async(_, thunkAPI) => {
    try {
        // TODO: GET MERCHANT ID FROM USER STATE
        const response = await axios.get(`http://localhost:8800/all-products/${1}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchProductDetails = createAsyncThunk('adminProduct/fetchProductDetails', async(pid, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:8800/single-product/${pid}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchProductImages = createAsyncThunk('adminProduct/fetchProductImages', async(pid, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:8800/product-images/${pid}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

// Note: this function is only used when editing existing product, not adding new product
export const addProductImages = createAsyncThunk('adminProduct/addProductImages', async(formData, thunkAPI) => {
    try {
        const imgRes = await axios.post('http://localhost:8800/upload-img', formData)   //form-data http
        return imgRes.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const addProduct = createAsyncThunk('adminProduct/addProduct', async(formData, thunkAPI) => {
    try {
        const {products, currentProductDetails: {name, description, SKU, brand, price, quantity, category}} = thunkAPI.getState().adminProduct;
        const merchant_id = 1 //products[0]['merchant_id']  // TODO: GET THIS FROM CURRENT MERCHANT STATE
        const productRes = await axios.post(`http://localhost:8800/add-product`, {merchant_id, name, description, SKU, brand, price, quantity, category})
        const insertId = productRes.data.insertId;
        formData.append("pid", insertId);
        const imgRes = await axios.post('http://localhost:8800/upload-img', formData)   //form-data http
        return imgRes.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const updateProductDetails = createAsyncThunk('adminProduct/updateProductDetails', async(_, thunkAPI) => {
    try {
        const {products, currentProductDetails: {product_id, name, description, SKU, brand, price, quantity, category}} = thunkAPI.getState().adminProduct;
        const merchant_id = products[0]['merchant_id']
        const response = await axios.put(`http://localhost:8800/update-product/${product_id}`, {merchant_id, name, description, SKU, brand, price, quantity, category})
        return response.data
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

// export const fetchProducts = createAsyncThunk('adminProduct/fetchProducts', async(_, thunkAPI) => {
//     try {
//         const response = await axios.get('http://localhost:8800/images')
//         return response.data;
//     } catch(error) {
//         thunkAPI.rejectWithValue(error.message);
//     }
// })

export const removeProductImage = createAsyncThunk('adminProduct/removeProductImage', async(id, thunkAPI) => {
    try {
        const response = await axios.delete(`http://localhost:8800/images/${id}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const removeProduct = createAsyncThunk('adminProduct/removeProduct', async(id, thunkAPI) => {
    try {
        const response = await axios.delete(`http://localhost:8800/remove-product/${id}`)
        return response.data;
    } catch(error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers: {
        updateFields: (state, {payload}) => {
            const { name, value } = payload
            return { ...state, currentProductDetails: { ...state.currentProductDetails, [name]: value } }
        },
        clearCurrentProduct: (state) => {
            return {...state, currentProductDetails: {...initialProductDetails}, currentProductImages: []}
        },

    },
    extraReducers: {
        [addProduct.pending]: (state) => {
            // state.uploading = true;
        },
        [addProduct.fulfilled]: (state) => {
            // state.uploading = true;
        },
        [addProduct.rejected]: (state, {payload}) => {
            // state.uploading = true;
        },
        [fetchProducts.pending]: (state) => {
            // state.productsFetching = true
        },
        [fetchProducts.fulfilled]: (state, {payload}) => {
            console.log(payload)
            // state.productsFetching = false
            state.products = payload;
        },
        [fetchProducts.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [removeProductImage.fulfilled]: (state, {payload}) => {
            console.log(payload)
        },
        [removeProductImage.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [fetchProductDetails.fulfilled]: (state, {payload}) => {
            state.currentProductDetails = payload[0];
        },
        [fetchProductDetails.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [fetchProductImages.fulfilled]: (state, {payload}) => {
            state.currentProductImages = payload;
        },
        [fetchProductImages.rejected]: (state, {payload}) => {
            console.log(payload);
        },
        [addProductImages.pending]: (state) => {
            state.uploading = true;
        },
        [addProductImages.fulfilled]: (state) => {
            state.uploading = false;
            // toast
        }
    }
})

export const {updateFields, clearCurrentProduct} = adminProductSlice.actions;
export default adminProductSlice.reducer;