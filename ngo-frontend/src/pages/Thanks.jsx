import { Link } from "react-router-dom";

function Thanks() {
  return (
    <div className="thanks">

      <div className="thanks-box">

        <div className="check">✓</div>

        <h1>Thank You!</h1>

        <p>Your donation can make a real difference.</p>

        <p>
          Together, we can build a kinder and brighter future.
        </p>

        <Link to="/" className="main-btn">
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Thanks;