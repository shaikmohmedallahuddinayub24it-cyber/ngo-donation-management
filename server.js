const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let donations = [];

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NGO Backend API is running successfully",
  });
});

app.get("/api/donations", (req, res) => {
  res.status(200).json({
    success: true,
    donations,
  });
});

app.get("/api/donations/:id", (req, res) => {
  const id = Number(req.params.id);

  const donation = donations.find((item) => item.id === id);

  if (!donation) {
    return res.status(404).json({
      success: false,
      message: "Donation not found",
    });
  }

  res.json({
    success: true,
    donation,
  });
});

app.post("/api/donations", (req, res) => {
  const { name, email, amount, campaign } = req.body;

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

  if (amount === undefined || amount === null || amount === "") {
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

  const newDonation = {
    id: donations.length > 0
      ? donations[donations.length - 1].id + 1
      : 1,

    name: name.trim(),
    email: email.trim(),
    amount: donationAmount,
    campaign: campaign.trim(),
    date: new Date().toISOString(),
  };

  donations.push(newDonation);

  console.log("New donation:", newDonation);

  res.status(201).json({
    success: true,
    message: "Donation successful",
    donation: newDonation,
  });
});

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

  const donation = donations[donationIndex];

  if (req.body.name !== undefined) {
    donation.name = req.body.name.trim();
  }

  if (req.body.email !== undefined) {
    donation.email = req.body.email.trim();
  }

  if (req.body.campaign !== undefined) {
    donation.campaign = req.body.campaign.trim();
  }

  if (req.body.amount !== undefined) {
    const amount = Number(req.body.amount);

    if (Number.isNaN(amount) || amount < 100) {
      return res.status(400).json({
        success: false,
        message: "Donation amount must be at least ₹100",
      });
    }

    donation.amount = amount;
  }

  donation.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Donation updated successfully",
    donation,
  });
});

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

  const deletedDonation = donations.splice(
    donationIndex,
    1
  )[0];

  res.json({
    success: true,
    message: "Donation deleted successfully",
    donation: deletedDonation,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

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