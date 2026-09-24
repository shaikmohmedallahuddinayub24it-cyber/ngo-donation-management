import { useState } from "react";
import { useNavigate } from "react-router-dom";
import campaigns from "../data/camp";

function Donate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [campaign, setCampaign] = useState("");
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = "Name can contain only letters and spaces";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Campaign validation
    if (!campaign) {
      newErrors.campaign = "Please select a campaign";
    }

    // Amount validation
    if (!amount) {
      newErrors.amount = "Donation amount is required";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Donation amount must be greater than ₹0";
    } else if (Number(amount) < 100) {
      newErrors.amount = "Minimum donation amount is ₹100";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/donations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            amount: Number(amount),
            campaign
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Donation failed");
        return;
      }

      navigate("/thanks");
    } catch (error) {
      alert("Could not connect to the server");
    }
  };

  return (
    <div className="form-page">
      <form className="donate-box" onSubmit={handleDonate}>

        <h1>Make a Donation</h1>

        <p>
          Your contribution can help support people and
          communities in need.
        </p>

        {/* Name */}

        <label>Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            if (errors.name) {
              setErrors({
                ...errors,
                name: ""
              });
            }
          }}
        />

        {errors.name && (
          <small className="error-text">
            {errors.name}
          </small>
        )}

        {/* Email */}

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            if (errors.email) {
              setErrors({
                ...errors,
                email: ""
              });
            }
          }}
        />

        {errors.email && (
          <small className="error-text">
            {errors.email}
          </small>
        )}

        {/* Campaign */}

        <label>Select Campaign</label>

        <select
          value={campaign}
          onChange={(e) => {
            setCampaign(e.target.value);

            if (errors.campaign) {
              setErrors({
                ...errors,
                campaign: ""
              });
            }
          }}
        >
          <option value="">
            -- Select a Campaign --
          </option>

          {campaigns.map((item) => (
            <option
              key={item.id}
              value={item.title}
            >
              {item.title}
            </option>
          ))}
        </select>

        {errors.campaign && (
          <small className="error-text">
            {errors.campaign}
          </small>
        )}

        {/* Amount */}

        <label>Donation Amount</label>

        <input
          type="number"
          placeholder="Enter amount in ₹"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);

            if (errors.amount) {
              setErrors({
                ...errors,
                amount: ""
              });
            }
          }}
          min="100"
        />

        {errors.amount && (
          <small className="error-text">
            {errors.amount}
          </small>
        )}

        {/* Quick Amount Buttons */}

        <div className="amount-buttons">

          <button
            type="button"
            onClick={() => setAmount("500")}
          >
            ₹500
          </button>

          <button
            type="button"
            onClick={() => setAmount("1000")}
          >
            ₹1000
          </button>

          <button
            type="button"
            onClick={() => setAmount("2000")}
          >
            ₹2000
          </button>

          <button
            type="button"
            onClick={() => setAmount("5000")}
          >
            ₹5000
          </button>

        </div>

        <button
          type="submit"
          className="main-btn"
        >
          Donate Now
        </button>

      </form>
    </div>
  );
}

export default Donate;