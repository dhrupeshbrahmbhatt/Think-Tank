import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import Portfolio from './pages/portfolio';
import DeveloperSite from './pages/developer_site';
import DesignerSite from './pages/designer_site';
import FullstackSite from './pages/fullstack_site';

function App() {
  return (
    <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:type" element={<Portfolio />} />
          <Route path="/developer_site" element={<DeveloperSite />} />
          <Route path="/designer_site" element={<DesignerSite />} />
          <Route path="/fullstack_site" element={<FullstackSite />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
