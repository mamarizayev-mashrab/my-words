const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Render portni avtomatik beradi
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "Backend ishlayapti!" });
});

app.listen(PORT, () => console.log(`Server ${PORT} portda!`));
