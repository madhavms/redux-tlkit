import {useSelector, useDispatch} from 'react-redux';
import {selectAllPosts} from './postsSlice'
import {deletePostById} from '../posts/postsSlice'
import PostAuthor from './PostAuthor';
import React from 'react'
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons'


const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <h5>{post.content.substring(0,100)}</h5>
            <p className='postCredit'>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <div className="reactionButtons">
            <ReactionButtons post={post}/>
            <button type="button" className='btn btn-danger' onClick={() => dispatch(deletePostById(post.id))}>Delete</button>
            </div>
        </article>
    ))

    return (
        <section>
            <h2 id='postHeading'>Posts</h2>
            {!posts.length && (<h3 id='no-post'>No posts yet.</h3>)}
            {renderedPosts}
        </section>
    )
}

export default PostsList
