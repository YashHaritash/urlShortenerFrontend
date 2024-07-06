import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegularShortenPage from "./components/RegularShortenPage";
import CustomShortenPage from "./components/CustomShortenPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/custom">
                    Custom Shorten
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<RegularShortenPage />} />
          <Route path="/custom" element={<CustomShortenPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
