import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import filterSlice from "./features/filterSlice";
import productsSlice from "./features/productsSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        products: productsSlice
    },
})

