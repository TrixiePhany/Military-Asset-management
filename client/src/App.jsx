import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import Transfers from './pages/Transfers';
import Assignments from './pages/Assignments';

function App() {
  return (
    <Routes>
      {/* Landing Page at */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HeroSection />
          </>
        }
      />

      {/* Dashboard & Pages */}
      <Route
        path="/dashboard"
        element={
          <div className="flex">
            <Sidebar />
            <div className="ml-20 w-full">
              <Dashboard />
            </div>
          </div>
        }
      />
      <Route
        path="/purchases"
        element={
          <div className="flex">
            <Sidebar />
            <div className="ml-20 w-full">
              <Purchases />
            </div>
          </div>
        }
      />
      <Route
        path="/transfers"
        element={
          <div className="flex">
            <Sidebar />
            <div className="ml-20 w-full">
              <Transfers />
            </div>
          </div>
        }
      />
      <Route
        path="/assignments"
        element={
          <div className="flex">
            <Sidebar />
            <div className="ml-20  w-full">
              <Assignments />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
