import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginLandingPage from './components/views/LoginPage/LoginLandingPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/users/login" element={<LoginLandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
