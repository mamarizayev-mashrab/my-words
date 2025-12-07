const allowedOrigins = [
  "https://my-words-omega.vercel.app",  // Vercel frontend link
  "http://127.0.0.1:5500"               // Lokal test uchun
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  }
}));
