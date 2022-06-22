import {createSlice} from '@reduxjs/toolkit';

const storedValueAsNumber = Number(localStorage.getItem('count'));
const initialCount = Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 0

const initialState = {
    count: initialCount
}

export const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count +=1;
        },
        decrement: (state) => {
            state.count -=1;
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    }
})

export const {increment, decrement, reset, incrementByAmount} = CounterSlice.actions;

export default CounterSlice.reducer;