const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// CORS ONLY for your domains
app.use(cors({
    origin: [
        "https://my-words-omega.vercel.app",
        "http://127.0.0.1:5500"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Ulandi!"))
    .catch(err => console.log("Mongo xato:", err));

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Backend ishlayapti!" });
});

// Model
const WordSchema = new mongoose.Schema({ text: String });
const Word = mongoose.model("Word", WordSchema);

// Barcha so'zlar
app.get("/words", async (req, res) => {
    const words = await Word.find();
    res.json(words);
});

// So'z qo'shish
app.post("/words", async (req, res) => {
    const newWord = new Word({ text: req.body.text });
    await newWord.save();
    res.json({ status: "OK", word: newWord });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("SERVER ", PORT, " portda"));
