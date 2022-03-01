import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './pages/Post/Post';
import Roadmap from './pages/Roadmap/Roadmap';
import PostBoard from './pages/PostBoard/PostBoard';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import NewPost from './pages/NewPost/NewPost';
import EditPost from './pages/EditPost/EditPost';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PostBoard />} />

          <Route path='post/edit/:id' element={<EditPost />} />
          
          <Route path='post/new' element={<NewPost />} />

          <Route path='post/:id' element={<Post />} />

          <Route path='post' element={<Post />} />

          <Route path='roadmap' element={<Roadmap />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
