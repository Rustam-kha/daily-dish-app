import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';
import categoryReducer from "./slices/CategorySlice"
import searchReducer from "./slices/SearchSlice"
import AuthSlice from "./slices/AuthSlice"


const Store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    search: searchReducer,
    auth:AuthSlice
  }
});

export default Store;
