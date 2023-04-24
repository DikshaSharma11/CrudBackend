const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://diksha170280411:diksha170280@cluster1.7rmns9c.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(()=>{
  console.log("connected");
});

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use User Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Hello"))

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
