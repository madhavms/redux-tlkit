import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {id: '0', name: 'Unnikrishnan MS'},
    {id: '1', name: 'Vivek SS'},
    {id: '2', name: 'Pranav Ajith'},
];

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {

    }
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;