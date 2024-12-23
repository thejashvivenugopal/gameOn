import { configureStore } from '@reduxjs/toolkit';
import slotsReducer from './slices/customerDashBoardSlice.tsx'
import cartReducer from './slices/cartSlice.tsx'
const store = configureStore({
    reducer: {
        // Add reducers here as you create them
        slots: slotsReducer,
        cart: cartReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
