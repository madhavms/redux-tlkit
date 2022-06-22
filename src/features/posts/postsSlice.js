import {createSlice} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
//Persists the posts state from the localStorage 
const initialState = JSON.parse(localStorage.getItem('posts')) || [];
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPosts: {
            reducer(state, action) {
            state.push(action.payload);
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
                return state.filter(post => post.id !== action.payload.id);
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
            console.log(action.payload);
            const {postId, name} = action.payload;
            console.log(postId, name);
            const existingPost = state.find(post => post.id === postId);
            if(existingPost){
                existingPost.reactions[name]++;
            }
        }
    }
});
export const selectAllPosts = (state) => state.posts;
export default postSlice.reducer;
export const {addPosts, deletePostById, reactionAdded} = postSlice.actions;
