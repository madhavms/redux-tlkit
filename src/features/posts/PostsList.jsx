import {useSelector, useDispatch} from 'react-redux';
import {selectAllPosts, getPostsStatus, getPostsError, fetchPosts} from './postsSlice'
import PostExcerpt from './PostExcerpt';
import {useEffect} from 'react';
import { nanoid } from 'nanoid';
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);
    const dispatch = useDispatch();

    useEffect(() => {
        if(postStatus === 'idle'){
            dispatch(fetchPosts());
        }   
    },[postStatus, dispatch]);
    
    let content;
    if(postStatus === 'loading'){
        content = <p>"loading..."</p>;
    }
    else if(postStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post =>
            <PostExcerpt key={`${post.id}`+nanoid()} post={post}/>);
    }
    else if(postStatus == 'failed'){
        content = <p>"failed"</p>;
    }
    
    return (
        <section>
            <h2 id='postHeading'>Posts</h2>
            {!posts.length && postStatus === 'succeeded' && (<h3 id='no-post'>No posts yet.</h3>)}
            {content}
        </section>
    )
}

export default PostsList
