import { Routes, Route } from "react-router-dom";

import Nav from "./comp/Nav";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Campaigns from "./pages/Campaigns";
import Donate from "./pages/Donate";
import DonorHistory from "./pages/DonorHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <>
      <Nav />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Campaigns */}
        <Route
          path="/campaigns"
          element={<Campaigns />}
        />

        {/* Donation */}
        <Route
          path="/donate"
          element={<Donate />}
        />

        {/* Donor History */}
        <Route
          path="/donor-history"
          element={<DonorHistory />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Thank You */}
        <Route
          path="/thanks"
          element={<Thanks />}
        />

      </Routes>
    </>
  );
}

export default App;