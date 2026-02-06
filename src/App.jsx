import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/contexts/ContextAuth"; // ✅ Import AuthProvider
import ProtectedRoutes from "./components/ProtectedRoutes"; // ✅ Import ProtectedRoute
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DashboardRouter from "./components/FullSetup/DashboardRouter";
import SignUp from "./components/SignUp";
import Analytics from "./components/pages/Analytics";
import AIAssistant from "./components/pages/AIAssistant";
import "/src/index.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboardrouter/*"
            element={
              <ProtectedRoutes>
                <DashboardRouter />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoutes>
                <Analytics />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/aiassistant"
            element={
              <ProtectedRoutes>
                <AIAssistant />
              </ProtectedRoutes>
            }
          />

          {/* Catch all - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
