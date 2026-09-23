const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());


// ================================
// TEMPORARY DATABASE
// ================================
// This stores donations in memory.
// IMPORTANT: Data will disappear when
// the server restarts.
//
// Later we can replace this with
// MongoDB / MySQL / PostgreSQL.

let donations = [];


// ================================
// HOME / SERVER TEST
// ================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NGO Backend API is running successfully",
  });
});


// ================================
// GET ALL DONATIONS
// ================================

app.get("/api/donations", (req, res) => {
  res.status(200).json({
    success: true,
    donations: donations,
  });
});


// ================================
// GET SINGLE DONATION
// ================================

app.get("/api/donations/:id", (req, res) => {
  const id = Number(req.params.id);

  const donation = donations.find(
    (item) => item.id === id
  );

  if (!donation) {
    return res.status(404).json({
      success: false,
      message: "Donation not found",
    });
  }

  res.status(200).json({
    success: true,
    donation: donation,
  });
});


// ================================
// CREATE DONATION
// ================================

app.post("/api/donations", (req, res) => {
  const {
    name,
    email,
    amount,
    campaign,
  } = req.body;

  // ----------------------------
  // Validation
  // ----------------------------

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!campaign || !campaign.trim()) {
    return res.status(400).json({
      success: false,
      message: "Campaign is required",
    });
  }

  if (
    amount === undefined ||
    amount === null ||
    amount === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Donation amount is required",
    });
  }

  const donationAmount = Number(amount);

  if (Number.isNaN(donationAmount)) {
    return res.status(400).json({
      success: false,
      message: "Donation amount must be a number",
    });
  }

  if (donationAmount < 100) {
    return res.status(400).json({
      success: false,
      message: "Minimum donation amount is ₹100",
    });
  }

  // ----------------------------
  // Create donation
  // ----------------------------

  const newDonation = {
    id:
      donations.length > 0
        ? donations[donations.length - 1].id + 1
        : 1,

    name: name.trim(),

    email: email.trim(),

    amount: donationAmount,

    campaign: campaign.trim(),

    date: new Date().toISOString(),
  };

  donations.push(newDonation);

  console.log("--------------------------------");
  console.log("NEW DONATION");
  console.log(newDonation);
  console.log("--------------------------------");

  // ----------------------------
  // Send response
  // ----------------------------

  res.status(201).json({
    success: true,
    message: "Donation successful",
    donation: newDonation,
  });
});


// ================================
// UPDATE DONATION
// ================================

app.put("/api/donations/:id", (req, res) => {
  const id = Number(req.params.id);

  const donationIndex = donations.findIndex(
    (item) => item.id === id
  );

  if (donationIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Donation not found",
    });
  }

  const {
    name,
    email,
    amount,
    campaign,
  } = req.body;

  const existingDonation =
    donations[donationIndex];

  // Only update values that were provided

  if (name !== undefined) {
    existingDonation.name = name.trim();
  }

  if (email !== undefined) {
    existingDonation.email = email.trim();
  }

  if (campaign !== undefined) {
    existingDonation.campaign = campaign.trim();
  }

  if (amount !== undefined) {
    const updatedAmount = Number(amount);

    if (
      Number.isNaN(updatedAmount) ||
      updatedAmount < 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Donation amount must be at least ₹100",
      });
    }

    existingDonation.amount = updatedAmount;
  }

  existingDonation.updatedAt =
    new Date().toISOString();

  res.status(200).json({
    success: true,
    message: "Donation updated successfully",
    donation: existingDonation,
  });
});


// ================================
// DELETE DONATION
// ================================

app.delete("/api/donations/:id", (req, res) => {
  const id = Number(req.params.id);

  const donationIndex = donations.findIndex(
    (item) => item.id === id
  );

  if (donationIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Donation not found",
    });
  }

  const deletedDonation =
    donations.splice(donationIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Donation deleted successfully",
    donation: deletedDonation,
  });
});


// ================================
// 404 ROUTE
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});


// ================================
// ERROR HANDLER
// ================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
  console.log("");
  console.log("=================================");
  console.log(" NGO BACKEND SERVER");
  console.log("=================================");
  console.log(` Server running on port: ${PORT}`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(
    ` Donations API: http://localhost:${PORT}/api/donations`
  );
  console.log("=================================");
  console.log("");
});