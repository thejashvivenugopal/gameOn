import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CartData {
    id: number;
    name: string;
    price: number;
    start_time: number;
    no_of_hours: number;
    ledger_hash_id: string;
  }

interface CartState {
    CartData: CartData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

const initialState: CartState = {
    CartData: [],
    status: 'idle',
    error: null,
};

export const fetchCartData = createAsyncThunk('cart/fetchcart',async () => {
      const response = await fetch('http://localhost:3002/cart', {
        method: 'GET',
        headers: {
          'customerid': `${localStorage.getItem('userHashId')}`,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
    }
    return await response.json();
})
export const deleteCartItem = createAsyncThunk('cart/delete', async (item : any) => {
        const response = await fetch('http://localhost:3002/ledgers', {
          method: 'DELETE',
          headers: {
            'id': `${item.ledger_hash_id}`,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return "deleted"
})
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.CartData = action.payload;
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
})

export default cartSlice.reducer;