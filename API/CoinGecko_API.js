// API

//HTTP request to CoinGeckos API. Requesting data for Bitcoin Price ect..

import fetch from 'node-fetch';

async function API_CoinGecko_Call() {
  try {
    //This get request is only returning Bicoin data id=bitcoin no need for it to be filtered like the get request from MinerStats.com.
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&x_cg_demo_api_key=CG-wg48syN4Vb7GrEosnAUWTr5V"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    //[0] accesing first instance of the array in JSON.
    return data[0];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Propagate the error further
  }
}

export { API_CoinGecko_Call };
