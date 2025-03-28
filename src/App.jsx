import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
