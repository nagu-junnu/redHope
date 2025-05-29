require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json()); // Middleware to parse JSON request body
app.use(cors());

mongoose.connect("mongodb+srv://nagujunnu:qE3Jh5lKQYZu6RUB@cluster0.wevtx.mongodb.net/redhope?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Mongodb Connected"))
   .catch(err=>console.log("Not Connected"));




   const donationSchema = new mongoose.Schema({
    name: String,
    group: String,
    image: String,
    contact: String,
    location: String,
  });
  const Donation = mongoose.model("Donation", donationSchema);
  app.post("/Donations", async (req, res) => {
    try {
      const { name, group, image, contact, location } = req.body;
      
      const newDonation = new Donation({
        name,
        group,
        image,
        contact,
        location,
      });
  
      await newDonation.save(); // Save to MongoDB
      res.status(201).json({ message: "Donation added successfully!", donation: newDonation });
    } catch (error) {
      res.status(500).json({ message: "Error adding donation", error });
    }
  });

  app.get("/Donations", async (req, res) => {
    try {
      const donations = await Donation.find();
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching donations", error });
    }
  });
  app.delete("/donations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Donation.findByIdAndDelete(id);
      res.status(200).json({ message: "Donor deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting donor" });
    }
  });
  



















const needsSchema = new mongoose.Schema({
  name: String,
  group: String,
  contact: String,
  location: String,
});

// Create Model
const Need = mongoose.model("Need", needsSchema);

// ✅ POST Request - Add a Need Request
app.post("/needs", async (req, res) => {
  try {
    const { name, group, contact, location } = req.body;

    const newNeed = new Need({ name, group, contact, location });
    await newNeed.save();

    res.status(201).json({ message: "Need request added!", need: newNeed });
  } catch (error) {
    res.status(500).json({ message: "Error adding need request", error });
  }
});

app.get("/needs", async (req, res) => {
  try {
    const needs = await Need.find();
    res.json(needs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.delete("/needs/:id", async (req, res) => {
  try {
    await Need.findByIdAndDelete(req.params.id);
    res.json({ message: "Need request deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting need request" });
  }
});










   
const campsScheme=new mongoose.Schema({
    name: String,
  date: String,
  contact: String,
  location: String,
  description:String,
})

const Camp=mongoose.model("Camp",campsScheme );
app.post("/camps", async (req,res)=>{
    try{
    const { name, date, contact, location,description } = req.body;
    const newCamp=new Camp({name, date, contact, location,description});
    await newCamp.save();
    res.status(201).json({ message: "Need request added!", camp: newCamp });
    }catch (error) {
        res.status(500).json({ message: "Error adding need request", error });
      }

})
app.delete("/camps/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Camp.findByIdAndDelete(id);
    res.status(200).json({ message: "Camp deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting camp" });
  }
});
app.get("/camps", async (req, res) => {
  try {
    const camps = await Camp.find();
    res.status(200).json(camps);
  } catch (error) {
    res.status(500).json({ error: "Error fetching camps" });
  }
});


// Mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an App Password
  },
});
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from:"nagujunnu333@gmail.com",
    to: "nagujunnu33@gmail.com", // Change to your email
    subject: ` From ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});









 





const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));