const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB ulandi"))
    .catch(err => console.log("MongoDB xato:", err));

const PORT = process.env.PORT || 5000;

// Test API
app.get("/", (req, res) => {
    res.json({ message: "Backend ishlayapti!" });
});

// Misol so'z API (GET)
const WordSchema = new mongoose.Schema({
    text: String,
});
const Word = mongoose.model("Word", WordSchema);

app.get("/words", async (req, res) => {
    const words = await Word.find();
    res.json(words);
});

// Misol so'z API (POST)
app.post("/words", async (req, res) => {
    const newWord = new Word({ text: req.body.text });
    await newWord.save();
    res.json({ status: "success", word: newWord });
});

app.listen(PORT, () => console.log(`SERVER ${PORT} portda`));
