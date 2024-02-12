// API

//HTTP request to CoinGeckos API. Requesting data for Bitcoin Price ect..

import fetch from 'node-fetch';

async function API_BlockChainData_Call() {
  try {
    //This get request is only returning Bicoin data id=bitcoin no need for it to be filtered like the get request from MinerStats.com.
    const response = await fetch("https://blockchain.info/latestblock");

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Propagate the error further
  }
}

export { API_BlockChainData_Call };
