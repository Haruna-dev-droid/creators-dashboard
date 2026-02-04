import { useState } from "react";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./components/FullSetup/Dashboard";
import "/src/index.css";
import "./App.css";

function App() {
  return (
    <>
      <Dashboard />
      <NavBar />
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
