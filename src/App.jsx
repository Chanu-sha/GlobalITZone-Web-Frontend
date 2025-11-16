import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team-responsive";
import Contact from "./pages/Contact";
import Login from "./Components/Login";
import Hero from "./pages/Hero";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Footer />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
