import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {id: '0', name: 'Morgan Wiley'},
    {id: '1', name: 'Melon Potts'},
    {id: '2', name: 'Mark Woods'},
];

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {

    }
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;