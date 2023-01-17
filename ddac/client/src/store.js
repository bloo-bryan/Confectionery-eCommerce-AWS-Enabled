import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import filterSlice from "./features/filterSlice";
import productsSlice from "./features/productsSlice";
import userSlice from "./features/userSlice";
import adminProductSlice from "./features/adminProductSlice";
import adminOrderSlice from "./features/adminOrderSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        products: productsSlice,
        user: userSlice,
        adminProduct: adminProductSlice,
        adminOrder: adminOrderSlice
    },
})

