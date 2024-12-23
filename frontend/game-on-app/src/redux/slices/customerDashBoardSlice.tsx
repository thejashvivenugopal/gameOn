import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state
type SlotsData = {
    slotDate: Date;
    slotTime: number;
    event: {
        eventType: string;
        eventHashId: string;
        eventStartTime: number;
        eventEndTime: number;
        amountPerHour: number;
        owner: {
            accountNumber: string;
            bankCode: string;
            zelleId: string;
            user: {
                firstName: string;
                lastName: string;
                emailId: string;
                mobileNumber: string;
                login: boolean;
                loginCounts: number;
                createdDate: Date;
                modifiedDate: Date;
                createdBy: string;
                modifiedBy: string;
            };
            __v: number;
        };
        location: {
            zipCode: string;
            country: string;
            city: string;
            state: string;
            addressLineOne: string;
            addressLineTwo: string;
            createdDate: Date;
            modifiedDate: Date;
            createdBy: string;
            modifiedBy: string;
            __v: number;
        };
        createdDate: Date;
        modifiedDate: Date;
        createdBy: string;
        modifiedBy: string;
        __v: number;
    };
    available: boolean;
    __v: number;
};
  
  interface SlotsState {
    SlotsData: SlotsData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

const initialState: SlotsState = {
    SlotsData: [],
    status: 'idle',
    error: null,
};

// Async thunk for fetching event data
export const fetchSlots = createAsyncThunk('events/fetchSlots', async () => {
    const response = await fetch('http://localhost:3002/slots', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'available': 'true',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return await response.json();
});

// Events slice
const slotsSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSlots.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSlots.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.SlotsData = action.payload;
            })
            .addCase(fetchSlots.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default slotsSlice.reducer;