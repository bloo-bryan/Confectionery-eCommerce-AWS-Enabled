import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isMerchant: false,
    userID: '',
    contactNo: '',
    shippingAddress: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login:(state, {user}) => {
        },
        logout:(state) =>{
            state.map((state)=>{
                if (typeof state === "boolean") state = false;
                if (typeof state ==="string") state = '';
            });
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;