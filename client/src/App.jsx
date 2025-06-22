import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import Transfers from './pages/Transfers';
import Assignments from './pages/Assignments';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Landing/Login Page */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HeroSection />
          </>
        }
      />

      {/* Protected Routes with Sidebar Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin', 'base_commander', 'logistics_officer']}>
            <div className="flex">
              <Sidebar />
              <div className="ml-20 w-full">
                <Dashboard />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/purchases"
        element={
          <ProtectedRoute allowedRoles={['admin', 'logistics_officer']}>
            <div className="flex">
              <Sidebar />
              <div className="ml-20 w-full">
                <Purchases />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transfers"
        element={
          <ProtectedRoute allowedRoles={['admin', 'logistics_officer']}>
            <div className="flex">
              <Sidebar />
              <div className="ml-20 w-full">
                <Transfers />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/assignments"
        element={
          <ProtectedRoute allowedRoles={['admin', 'base_commander']}>
            <div className="flex">
              <Sidebar />
              <div className="ml-20 w-full">
                <Assignments />
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
