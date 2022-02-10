import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feedback from './pages/Feedback/Feedback';
import Roadmap from './pages/Roadmap/Roadmap';
import Suggestions from './pages/Suggestions/Suggestions';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import NewFeedback from './pages/NewFeedback/NewFeedback';
import EditFeedback from './pages/EditFeedback/EditFeedback';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Suggestions />} />

          <Route path='feedback/edit' element={<EditFeedback />} />
          
          <Route path='feedback/new' element={<NewFeedback />} />

          <Route path='feedback' element={<Feedback />} />

          <Route path='roadmap' element={<Roadmap />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
