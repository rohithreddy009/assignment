import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Submissions } from './pages/Submissions';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
    </Router>
  );
}

export default App;
