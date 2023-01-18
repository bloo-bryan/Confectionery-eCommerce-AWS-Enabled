import React from 'react'
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        brand: 'all',
        category: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setGridView: (state) => {
            return { ...state, grid_view: true }
        },
        setListView: (state) => {
            return { ...state, grid_view: false }
        },
        updateSort: (state, {payload}) => {
            return { ...state, sort: payload }
        },
        updateFilters: (state, {payload}) => {
            const { name, value } = payload
            return { ...state, filters: { ...state.filters, [name]: value } }
        },
        clearFilters: (state) => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    brand: 'all',
                    category: 'all',
                    price: state.filters.max_price,
                    shipping: false,
                },
            }
        },
        filterProducts: (state) => {
            const { text, category, brand, price, shipping } = state.filters

            let tempProducts = [...state.all_products]
            // filtering
            // text
            if (text) {
                tempProducts = tempProducts.filter((product) => {
                    return product.name.toLowerCase().startsWith(text)
                })
            }
            // category
            if (category !== 'all') {
                tempProducts = tempProducts.filter(
                    (product) => product.category === category
                )
            }
            // brand
            if (brand !== 'all') {
                tempProducts = tempProducts.filter(
                    (product) => product.brand === brand
                )
            }
            // price
            tempProducts = tempProducts.filter((product) => product.price <= price)
            // shipping
            if (shipping) {
                tempProducts = tempProducts.filter((product) => product.shipping === true)
            }

            return { ...state, filtered_products: tempProducts }
        },
        sortProducts: (state) => {
            let tempProducts = [...state.filtered_products]
            if (state.sort === 'price-lowest') {
                tempProducts = tempProducts.sort((a, b) => {
                    if (a.price < b.price) {
                        return -1
                    }
                    if (a.price > b.price) {
                        return 1
                    }
                    return 0
                })
            }
            if (state.sort === 'price-highest') {
                tempProducts = tempProducts.sort((a, b) => b.price - a.price)
            }
            if (state.sort === 'name-a') {
                tempProducts = tempProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            if (state.sort === 'name-z') {
                tempProducts = tempProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
            }
            return { ...state, filtered_products: tempProducts }
        },
        loadProducts: (state, {payload}) => {
            let maxPrice = payload.map((p) => p.price)
            maxPrice = Math.max(...maxPrice)

            return {
                ...state,
                all_products: [...payload],
                filtered_products: [...payload],
                filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
            }
        }
    }
})

export const {setGridView, setListView, updateSort, updateFilters, clearFilters, filterProducts, sortProducts, loadProducts} = filterSlice.actions;
export default filterSlice.reducer;

    // const { products } = useProductsContext()

    // useEffect(() => {
    //     dispatch({ type: LOAD_PRODUCTS, payload: products })
    // }, [products])
    //
    // useEffect(() => {
    //     dispatch({ type: FILTER_PRODUCTS })
    //     dispatch({ type: SORT_PRODUCTS })
    // }, [products, state.sort, state.filters])

