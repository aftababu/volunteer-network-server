const express = require("express");
const mongoose = require("mongoose");
const eventRouter = require("./eventRouter");
const membershipRoutes = require("./memberShipRoutes");
const dotenv = require("dotenv"); // Import dotenv
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api", eventRouter);
app.use("/membership", membershipRoutes);
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
