import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    // addToCart: (state, action) => {
    //   const payload = action.payload;
    //   const existing = state.cart.find(i => i.id === payload.id);
    //   if (existing) {
    //     existing.qty = (existing.qty ?? 0) + 1;
    //   } else {
    //     state.cart.push({ ...payload, qty: payload.qty ?? 1 });
    //   }
    // },
    // removeFromCart: (state, action) => {
    //   state.cart = state.cart.filter(i => i.id !== action.payload.id);
    // },
    // incrementQty: (state, action) => {
    //   const item = state.cart.find(i => i.id === action.payload.id);
    //   if (item) item.qty = (item.qty ?? 0) + 1;
    // },
    // decrementQty: (state, action) => {
    //   const item = state.cart.find(i => i.id === action.payload.id);
    //   if (!item) return;
    //   if ((item.qty ?? 0) > 1) {
    //     item.qty = item.qty - 1;
    //   } else {
    //     state.cart = state.cart.filter(i => i.id !== action.payload.id);
    //   }
    // },
    setCart: (state, action) => {
      state.cart = action.payload;
    }
  }
});


// export const { addToCart, removeFromCart, incrementQty, decrementQty,setCart } = CartSlice.actions;
// export default CartSlice.reducer;
export const { setCart } = CartSlice.actions;
export default CartSlice.reducer;