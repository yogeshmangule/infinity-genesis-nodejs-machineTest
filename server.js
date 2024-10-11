const express = require("express");
const path = require("path");
const app = express();
const certificateRoutes = require("./routes/certificateRoutes");

// Serve static files from certificates folder
app.use("/pdf", express.static(path.join(__dirname, "pdf")));

// Middleware to parse incoming requests
app.use(express.json());

// Use certificate routes
app.use("/api/certificate", certificateRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
