import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Guest from './components/Guest';
import AskPage from './components/AskPage';
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/ask/:name" element={<AskPage />} />
        <Route path="/success" element={<SuccessPage />} />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
