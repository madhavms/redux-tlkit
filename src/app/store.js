import {configureStore} from '@reduxjs/toolkit';
import CounterReducer from '../features/counter/CounterSlice';
import PostsReducer from '../features/posts/postsSlice';
import UsersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        counter: CounterReducer,
        posts: PostsReducer,
        users: UsersReducer
    }
})