require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Donation = require("./models/Donation");
const User = require("./models/User");
const Contact = require("./models/Contact");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "NGO API is running"
  });
});

// ==========================================
// SIGNUP
// POST /api/signup
// ==========================================

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Validate name
    if (cleanName.length < 3) {
      return res.status(400).json({
        message: "Name must contain at least 3 characters"
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters"
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword
    });

    // Save user
    const savedUser = await user.save();

    console.log("User account created successfully");

    // Do not send password to frontend
    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "Failed to create account",
      error: error.message
    });
  }
});

// ==========================================
// LOGIN
// POST /api/login
// ==========================================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: cleanEmail
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    console.log("User logged in successfully");

    // Do not send password
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

// ==========================================
// CREATE DONATION
// POST /api/donations
// ==========================================

app.post("/api/donations", async (req, res) => {
  try {
    console.log("Donation request received:", req.body);

    const {
      name,
      email,
      amount,
      campaign
    } = req.body;

    // Check required fields
    if (!name || !email || !amount || !campaign) {
      return res.status(400).json({
        message: "All donation fields are required"
      });
    }

    // Validate amount
    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Donation amount must be greater than 0"
      });
    }

    // Create donation
    const donation = new Donation({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      amount: Number(amount),
      campaign: campaign.trim()
    });

    // Save donation
    const savedDonation = await donation.save();

    console.log("Donation saved successfully");

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

// ==========================================
// GET ALL DONATIONS
// GET /api/donations
// ==========================================

app.get("/api/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({
      createdAt: -1
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("GET DONATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to get donations",
      error: error.message
    });
  }
});

// ==========================================
// UPDATE DONATION
// PUT /api/donations/:id
// ==========================================

app.put("/api/donations/:id", async (req, res) => {
  try {
    const {
      name,
      email,
      amount,
      campaign
    } = req.body;

    // Check required fields
    if (!name || !email || !amount || !campaign) {
      return res.status(400).json({
        message: "All donation fields are required"
      });
    }

    // Validate amount
    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Donation amount must be greater than 0"
      });
    }

    // Update donation
    const updatedDonation =
      await Donation.findByIdAndUpdate(
        req.params.id,
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          amount: Number(amount),
          campaign: campaign.trim()
        },
        {
          new: true,
          runValidators: true
        }
      );

    if (!updatedDonation) {
      return res.status(404).json({
        message: "Donation not found"
      });
    }

    console.log("Donation updated successfully");

    res.status(200).json({
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

// ==========================================
// DELETE DONATION
// DELETE /api/donations/:id
// ==========================================

app.delete("/api/donations/:id", async (req, res) => {
  try {
    const deletedDonation =
      await Donation.findByIdAndDelete(
        req.params.id
      );

    if (!deletedDonation) {
      return res.status(404).json({
        message: "Donation not found"
      });
    }

    console.log("Donation deleted successfully");

    res.status(200).json({
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

// ==========================================
// CREATE CONTACT MESSAGE
// POST /api/contact
// ==========================================

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    // Check required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message:
          "Name, email, subject and message are required"
      });
    }

    // Create contact
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    // Save contact
    const savedContact = await contact.save();

    console.log("Contact message saved successfully");

    res.status(201).json({
      message: "Contact message submitted successfully",
      contact: savedContact
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    res.status(500).json({
      message: "Failed to submit contact message",
      error: error.message
    });
  }
});

// ==========================================
// GET ALL CONTACT MESSAGES
// GET /api/contact
// ==========================================

app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1
    });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("GET CONTACT ERROR:", error);

    res.status(500).json({
      message: "Failed to get contact messages",
      error: error.message
    });
  }
});

// ==========================================
// START SERVER
// ==========================================

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

    console.log("MongoDB connected successfully");

    // Start Express server
    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Server running on http://localhost:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(error.message);

    process.exit(1);
  }
}

startServer();