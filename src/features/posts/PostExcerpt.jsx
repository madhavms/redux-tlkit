import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import {deletePostById} from './postsSlice';
import { useDispatch } from 'react-redux';


const PostExcerpt = ({post}) => {
    const dispatch = useDispatch();
    return (
        <article>
            <h3>{post.title}</h3>
            <h5>{post.body.substring(0,100)}</h5>
            <p className='postCredit'>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <div className="reactionButtons">
            <ReactionButtons post={post}/>
            <button type="button" className='btn btn-danger' onClick={() => dispatch(deletePostById(post.id))}>Delete</button>
            </div>
        </article>
    )
}

export default PostExcerpt
