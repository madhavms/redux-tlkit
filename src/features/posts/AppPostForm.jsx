import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addPosts, addNewPosts} from '../posts/postsSlice';
import {selectAllUsers} from '../users/usersSlice';
import sound from '../../audio_effects/mail-sent.mp3';



const AppPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const submitAudio = new Audio(sound);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);
    const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle';

    const resetAll = (e) => {
            e.preventDefault();
            setTitle('');
            setContent('');
            setUserId('');
            setUserId('Select an option');
    }

    const onSavePostClicked = (e) => {
        if(canSave) {
            try{
                submitAudio.play();
                e.preventDefault();
                setAddRequestStatus('pending');
                dispatch(addNewPosts({title, body: content, userId})).unwrap();
                setTitle('');
                setContent('');
                setUserId(''); 
            }
            catch(err){
                console.error('Failed to save the post', err);
            }
            finally{
                setAddRequestStatus('idle');
            }
            
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    

    return (
        <div className="container">
			<form action="" className="m-auto" style={{maxWidth:"600px"}} onSubmit={onSavePostClicked}>
				<h3 className="my-4">Add a new Post</h3>
				<hr className="my-4" />
				<div className="form-group mb-3 row"><label htmlFor="title2" className="col-md-5 col-form-label">Title</label>
					<div className="col-md-7"><input type="text" className="form-control form-control-lg" id="title2" name="title" required onChange={onTitleChanged} value={title}/></div>
        </div>
            <div className="form-group mb-3 row"><label htmlFor="content5" className="col-md-5 col-form-label"> Post Author</label>
                    <div id='select'>
                        <select id='option' onChange={onAuthorChanged} value={userId}>
                        <option value=''>Select an option</option>
                            {userOptions}
                        </select>
                    </div>
				</div>
                <hr className="bg-transparent border-0 py-1" />
                
				<div className="form-group mb-3 row"><label htmlFor="content5" className="col-md-5 col-form-label">Content</label>
					<div className="col-md-7"><textarea className="form-control form-control-lg" id="content5" name="content" required onChange={onContentChanged} value={content}></textarea></div>
				</div>
				<hr className="my-4" />
				<label htmlFor="submit7"></label>
                <label htmlFor="reset10"></label>
                <div className="submit-reset-btn">
                <button className="btn btn-primary btn-lg" type="submit" disabled={!canSave}>Create Post</button>
                <button className="btn btn-primary btn-lg" type="button" onClick={resetAll}>Reset</button>
                </div>
			</form>
		</div>
    )
}

export default AppPostForm;
