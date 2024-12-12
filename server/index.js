const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/api/notes");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// app.use(cors({ origin: true, credentials: true }));

const corsOptions = {
  origin: "https://leaveanote123.vercel.app", // Specify the allowed origin
  methods: ["GET", "POST"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Specify allowed headers
  credentials: true, // Allow credentials (cookies, authentication)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/notes", routes);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
console.log(port);
app.listen(port, () => console.log(`Server running on port ${port}`));
