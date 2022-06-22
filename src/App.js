import logo from './logo.svg';
import './App.css';
import PostsList from './features/posts/PostsList';
import AppPostForm from './features/posts/AppPostForm';


function App() {
  return (
    <div className="App">
      <AppPostForm/>
      <PostsList/>
    </div>
  );
}

export default App;
