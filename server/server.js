// Your main file (e.g., server.js)

// Main server side file.

// Import necessary modules
import express from "express";
import cors from "cors";
import { BTCdata } from "./API.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/BTC", async (req, res) => {
  try {
    // Call BTCdata function to get Bitcoin data
    const data = await BTCdata();
    const bitcoinData = data[0];

    const BTCObject = {
      name: bitcoinData.name,
      price: bitcoinData.current_price,
      daily_high: bitcoinData.high_24h,
      daily_low: bitcoinData.low_24h,
      market_cap: bitcoinData.market_cap,
      circulating_supply: bitcoinData.circulating_supply,
    };

    console.log(BTCObject); // Log the retrieved Bitcoin data

    // Send the Bitcoin data as a JSON response
    res.json({ BTCObject }); // Merge 'data' and 'bitcoinData' in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors in the response
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
