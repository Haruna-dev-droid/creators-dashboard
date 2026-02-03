import { useState } from "react";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import "/src/index.css";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <LandingPage />
    </>
  );
}

export default App;
