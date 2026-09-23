require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Donation = require("./models/Donation");

const app = express();

// Use Render's PORT in deployment.
// Use 5000 when running locally.
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "NGO API is running"
  });
});


// ===============================
// CREATE DONATION
// POST /api/donations
// ===============================

app.post("/api/donations", async (req, res) => {
  try {
    console.log("Donation request received:", req.body);

    const {
      name,
      email,
      amount,
      campaign
    } = req.body;

    // Validate required fields
    if (!name || !email || !amount || !campaign) {
      return res.status(400).json({
        message: "All donation fields are required"
      });
    }

    // Create donation
    const donation = new Donation({
      name: name.trim(),
      email: email.trim(),
      amount: Number(amount),
      campaign: campaign.trim()
    });

    // Save to MongoDB
    const savedDonation = await donation.save();

    console.log("Donation saved successfully!");

    res.status(201).json({
      message: "Donation saved successfully",
      donation: savedDonation
    });

  } catch (error) {
    console.error("DONATION ERROR:", error);

    res.status(500).json({
      message: "Failed to save donation",
      error: error.message
    });
  }
});


// ===============================
// GET ALL DONATIONS
// GET /api/donations
// ===============================

app.get("/api/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({
      createdAt: -1
    });

    res.json(donations);

  } catch (error) {
    console.error("GET DONATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to get donations",
      error: error.message
    });
  }
});


// ===============================
// UPDATE DONATION
// PUT /api/donations/:id
// ===============================

app.put("/api/donations/:id", async (req, res) => {
  try {
    const {
      name,
      email,
      amount,
      campaign
    } = req.body;

    // Validate required fields
    if (!name || !email || !amount || !campaign) {
      return res.status(400).json({
        message: "All donation fields are required"
      });
    }

    // Update donation
    const updatedDonation =
      await Donation.findByIdAndUpdate(
        req.params.id,
        {
          name: name.trim(),
          email: email.trim(),
          amount: Number(amount),
          campaign: campaign.trim()
        },
        {
          new: true,
          runValidators: true
        }
      );

    // Donation not found
    if (!updatedDonation) {
      return res.status(404).json({
        message: "Donation not found"
      });
    }

    console.log("Donation updated successfully!");

    res.json({
      message: "Donation updated successfully",
      donation: updatedDonation
    });

  } catch (error) {
    console.error("UPDATE DONATION ERROR:", error);

    res.status(500).json({
      message: "Failed to update donation",
      error: error.message
    });
  }
});


// ===============================
// DELETE DONATION
// DELETE /api/donations/:id
// ===============================

app.delete("/api/donations/:id", async (req, res) => {
  try {
    // Delete donation
    const deletedDonation =
      await Donation.findByIdAndDelete(
        req.params.id
      );

    // Donation not found
    if (!deletedDonation) {
      return res.status(404).json({
        message: "Donation not found"
      });
    }

    console.log("Donation deleted successfully!");

    res.json({
      message: "Donation deleted successfully"
    });

  } catch (error) {
    console.error("DELETE DONATION ERROR:", error);

    res.status(500).json({
      message: "Failed to delete donation",
      error: error.message
    });
  }
});


// ===============================
// START SERVER
// ===============================

async function startServer() {
  try {
    // Check MongoDB URI
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing from .env file"
      );
    }

    console.log("Connecting to MongoDB...");

    // Connect to MongoDB Atlas
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected successfully"
    );

    // Start Express server
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(error.message);

    process.exit(1);
  }
}


// Start application
startServer();