// API.js

//HTTP request to CoinGeckos API. Requesting data for Bitcoin Price ect..

async function BTCdata() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&x_cg_demo_api_key=CG-wg48syN4Vb7GrEosnAUWTr5V"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Propagate the error further
  }
}

export { BTCdata };
