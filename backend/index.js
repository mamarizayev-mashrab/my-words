const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();   // **Birinchi shu bo‘lishi kerak!**

const allowedOrigins = [
    "https://my-words-omega.vercel.app",
    "http://127.0.0.1:5500"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS blocked"));
        }
    }
}));

app.use(express.json());

// *** MongoDB ulanish ***
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB ulandi"))
    .catch(err => console.log("MongoDB xato:", err));

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Backend ishlayapti!" });
});

// *** Words API ***
const WordSchema = new mongoose.Schema({ text: String });
const Word = mongoose.model("Word", WordSchema);

app.get("/words", async (req, res) => {
    const words = await Word.find();
    res.json(words);
});

app.post("/words", async (req, res) => {
    const newWord = new Word({ text: req.body.text });
    await newWord.save();
    res.json({ status: "success", word: newWord });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER ${PORT} portda`));
