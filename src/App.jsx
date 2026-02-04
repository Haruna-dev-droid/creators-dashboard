import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DashboardRouter from "./components/FullSetup/DashboardRouter";
import "/src/index.css";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        {" "}
        <DashboardRouter />{" "}
      </BrowserRouter>

      <NavBar />
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
