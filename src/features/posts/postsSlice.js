import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { sub } from 'date-fns/esm';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts:[],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data
});

export const addNewPosts = createAsyncThunk('posts/addNewPosts', async (initialPost) => {
    try{
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data
    }
    catch(error){
        return error.message; 
    }  
});


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPosts: {
            reducer(state, action) {
            state.posts.push(action.payload);
            },
            prepare(title, content, userId){
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0,
                        }
                    }
                }   
            }
        },
        deletePostById: {
            reducer(state, action) {
                return {posts: state.posts.filter(post => post.id !== action.payload.id),
                status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
                error: null};
            },

            prepare(id){
                return{
                    payload:{
                        id
                    }
                }
            }
        },
        reactionAdded(state, action){
            const {postId, name} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if(existingPost){
                existingPost.reactions[name]++;
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                console.log(action);
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                // Add any fetched posts to the array
                state.posts = loadedPosts;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })

            .addCase(addNewPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addNewPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                state.posts.push(action.payload);
            })
            .addCase(addNewPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
    }
});
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export default postSlice.reducer;
export const {addPosts, deletePostById, reactionAdded} = postSlice.actions;
