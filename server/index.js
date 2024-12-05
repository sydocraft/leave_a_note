const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/api/notes");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "https://leaveanote123.vercel.app", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow cookies and authorization headers
};

// use the cors middleware with the
// origin and credentials options
// app.use(cors({ origin: true, credentials: true }));

// app.use(
//   cors({ origin: "https://leaveanote123.vercel.app", credentials: true })
// );

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
