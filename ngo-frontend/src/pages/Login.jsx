import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="form-page">

      <form className="form-box" onSubmit={handleLogin}>

        <h1>Welcome Back</h1>

        <p>Login to continue making a difference.</p>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Show or hide password"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
                <path d="M4 4l16 16" />
              </svg>
            )}
          </button>

        </div>

        <button type="submit" className="main-btn">
          Login
        </button>

        <p className="form-link">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>

      </form>

    </div>
  );
}

export default Login;