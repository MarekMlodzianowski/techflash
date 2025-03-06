const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4200;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist/apps/techflash")));

// API Routes - proxy requests to your API server if needed
app.get("/api/*", (req, res) => {
  // If you have a separate API server, you can proxy requests here
  // For now, return mock data or 404
  res.status(404).send("API endpoint not implemented");
});

// Serve index.html for all other routes (Angular routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/apps/techflash/index.html"));
});

// Start the server on 0.0.0.0 to allow external connections
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(
    `Access the app on your local network using your machine's IP address`
  );
});
