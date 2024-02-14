// Main server side file.

import dotenv from 'dotenv';
dotenv.config();

// Import necessary modules
import express from "express";
import cors from "cors";
import { store } from "./store/store.js";

const apikey = process.env.API_KEY;

const app = express();
const port = 80;

app.use(cors());

app.get(apikey, async (req, res) => {
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
