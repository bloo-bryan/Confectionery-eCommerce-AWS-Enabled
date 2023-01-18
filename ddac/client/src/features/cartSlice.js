import {createSlice} from "@reduxjs/toolkit";

const getLocalStorage = () => {
    let cart = localStorage.getItem('cart')
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return []
    }
}

const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 4.99,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, {payload}) => {
            const {id, amount, product} = payload;
            const tempItem = state.cart.find((i) => i.id === id)
            if (tempItem) {
                const tempCart = state.cart.map((cartItem) => {
                    if (cartItem.id === id) {
                        let newAmount = cartItem.amount + amount
                        if (newAmount > cartItem.max) {
                            newAmount = cartItem.max
                        }
                        return { ...cartItem, amount: newAmount }
                    } else {
                        return cartItem
                    }
                })

                return { ...state, cart: tempCart }
            } else {
                const newItem = {
                    id: id,
                    name: product.name,
                    amount,
                    image: product.url[0],
                    price: product.price,
                    max: product.quantity,
                }
                return { ...state, cart: [...state.cart, newItem] }
            }
        },
        removeItem: (state, {payload}) => {
            const tempCart = state.cart.filter((item) => item.id !== payload)
            return { ...state, cart: tempCart }
        },
        toggleAmount: (state, {payload}) => {
            const {id, value} = payload;
            const tempCart = state.cart.map((item) => {
                if (item.id === id) {
                    if (value === 'inc') {
                        let newAmount = item.amount + 1
                        if (newAmount > item.max) {
                            newAmount = item.max
                        }
                        return { ...item, amount: newAmount }
                    }
                    if (value === 'dec') {
                        let newAmount = item.amount - 1
                        if (newAmount < 1) {
                            newAmount = 1
                        }
                        return { ...item, amount: newAmount }
                    }
                }
                return item
            })

            return { ...state, cart: tempCart }
        },
        clearCart: (state) => {
            return { ...state, cart: [] }
        },
        countCartTotals: (state) => {
            const { total_items, total_amount } = state.cart.reduce(
                (total, cartItem) => {
                    const { amount, price } = cartItem

                    total.total_items += amount
                    total.total_amount += price * amount
                    return total
                },
                {
                    total_items: 0,
                    total_amount: 0,
                }
            )
            return { ...state, total_items, total_amount }
        }
    },
})

export const {addToCart, removeItem, clearCart, toggleAmount, countCartTotals} = cartSlice.actions;
export default cartSlice.reducer;

    // useEffect(() => {
    //     dispatch({ type: COUNT_CART_TOTALS })
    //     localStorage.setItem('cart', JSON.stringify(state.cart))
    // }, [state.cart])
    //