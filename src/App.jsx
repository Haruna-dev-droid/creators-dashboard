import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/contexts/ContextAuth"; // ✅ Import AuthProvider
import { AppProvider } from "./components/contexts/AppContext"; // ✅ Import AppProvider
import ProtectedRoutes from "./components/ProtectedRoutes"; // ✅ Import ProtectedRoute
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DashboardRouter from "./components/Layout/DashboardRouter";
import SignUp from "./components/SignUp";
import Analytics from "./components/pages/Analytics";
import AIAssistant from "./components/pages/AiAssistant";
import Dashboard from "./components/pages/Dashboard";
import ContentEditor from "./components/pages/ContentEditor";
import "/src/index.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <LandingPage />
                  <Footer />
                </>
              }
            />
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              path="/dashboardrouter/*"
              element={
                // <AppProvider>
                <ProtectedRoutes>
                  <DashboardRouter />
                </ProtectedRoutes>
                // </AppProvider>
              }
            />
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/contenteditor"
              element={
                <ProtectedRoutes>
                  <ContentEditor />
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
            /> */}

            <Route path="/footer" element={<Footer />} />

            {/* Catch all - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
