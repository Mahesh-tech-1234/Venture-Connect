import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import EventsPage from './pages/EventsPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import InvestorDirectoryPage from './pages/InvestorDirectoryPage';


const App: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-deep-blue">
        <div className="spinner border-4 border-t-4 border-gray-200 border-t-emerald-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/investor-directory" element={<InvestorDirectoryPage />} />
          <Route path="/login" element={<AuthPage defaultTab="login" />} />
          <Route path="/join" element={<AuthPage defaultTab="signup" />} />
          <Route 
            path="/dashboard" 
            element={user ? <DashboardPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;