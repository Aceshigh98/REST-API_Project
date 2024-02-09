// Main server side file.

// Import necessary modules
import express from "express";
import cors from "cors";
import { store } from "./store/store.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/BTC", async (req, res) => {
  try {
    // Call the store function and wait for the result

    const btcData = await store();
    res.json({ btcData });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors in the response
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
