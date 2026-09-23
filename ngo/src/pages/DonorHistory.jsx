import { useEffect, useState } from "react";
import campaigns from "../data/camp";

function DonorHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingDonation, setEditingDonation] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [campaign, setCampaign] = useState("");
  const [amount, setAmount] = useState("");

  // ===============================
  // GET DONATIONS
  // ===============================

  const getDonations = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/donations"
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load donations");
        return;
      }

      setDonations(data);
    } catch (error) {
      alert("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  // Load donations when page opens
  useEffect(() => {
    getDonations();
  }, []);

  // ===============================
  // START EDITING
  // ===============================

  const handleEdit = (donation) => {
    setEditingDonation(donation);

    setName(donation.name);
    setEmail(donation.email);
    setCampaign(donation.campaign);
    setAmount(donation.amount);
  };

  // ===============================
  // CANCEL EDIT
  // ===============================

  const handleCancel = () => {
    setEditingDonation(null);

    setName("");
    setEmail("");
    setCampaign("");
    setAmount("");
  };

  // ===============================
  // UPDATE DONATION
  // ===============================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !campaign ||
      !amount ||
      Number(amount) <= 0
    ) {
      alert("Please fill all details correctly");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/donations/${editingDonation._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            campaign,
            amount: Number(amount)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update donation");
        return;
      }

      alert("Donation updated successfully");

      handleCancel();

      getDonations();
    } catch (error) {
      alert("Could not connect to the server");
    }
  };

  // ===============================
  // DELETE DONATION
  // ===============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donation?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/donations/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete donation");
        return;
      }

      alert("Donation deleted successfully");

      getDonations();
    } catch (error) {
      alert("Could not connect to the server");
    }
  };

  return (
    <div className="page">

      {/* ===============================
          PAGE HEADING
      =============================== */}

      <div className="campaign-head">
        <p className="quote">
          "Every contribution creates a little more hope."
        </p>

        <h1>Donor History</h1>

        <p>
          View the donations made through HopeTogether.
        </p>
      </div>

      {/* ===============================
          EDIT FORM
      =============================== */}

      {editingDonation && (
        <div className="form-page">

          <form
            className="donate-box"
            onSubmit={handleUpdate}
          >
            <h2>Edit Donation</h2>

            <p>
              Update the donor information below.
            </p>

            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label>Select Campaign</label>

            <select
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
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

            <label>Donation Amount</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in ₹"
              min="1"
            />

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
              Update Donation
            </button>

            <button
              type="button"
              className="login-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

          </form>

        </div>
      )}

      {/* ===============================
          DONATION TABLE
      =============================== */}

      {loading ? (
        <p>Loading donations...</p>
      ) : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="donation-table-container">

          <table className="donation-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Campaign</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {donations.map((donation) => (
                <tr key={donation._id}>

                  <td>
                    {donation.name}
                  </td>

                  <td>
                    {donation.email}
                  </td>

                  <td>
                    {donation.campaign}
                  </td>

                  <td>
                    ₹{donation.amount}
                  </td>

                  <td>
                    {new Date(
                      donation.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="donation-actions">

                      <button
                        className="main-btn"
                        onClick={() =>
                          handleEdit(donation)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(donation._id)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default DonorHistory;