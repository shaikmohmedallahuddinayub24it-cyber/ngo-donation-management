import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">

      <Link to="/" className="logo">
        HopeTogether
      </Link>

      <div className="links">

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        <Link to="/donate">
          Donation
        </Link>

        <Link to="/campaigns">
          Campaigns
        </Link>

        <Link to="/donor-history">
          Donor History
        </Link>

        <Link to="/signup" className="signup-btn">
          Create Account
        </Link>

        <Link to="/login" className="login-btn">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Nav;