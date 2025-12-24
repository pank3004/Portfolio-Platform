// Main App Component
// This is the root component that sets up routing

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import StudyMaterials from './pages/StudyMaterials';
import Blogs from './pages/Blogs';
import AIUpdates from './pages/AIUpdates';
import Contact from './pages/Contact';

// Import admin pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProjects from './admin/AdminProjects';
import AdminStudyMaterials from './admin/AdminStudyMaterials';
import AdminBlogs from './admin/AdminBlogs';
import AdminAIUpdates from './admin/AdminAIUpdates';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Show Navbar on all pages except admin pages */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>

        {/* Define all routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/ai-updates" element={<AIUpdates />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/study-materials" element={<AdminStudyMaterials />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/ai-updates" element={<AdminAIUpdates />} />
        </Routes>

        {/* Show Footer on all pages except admin pages */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
