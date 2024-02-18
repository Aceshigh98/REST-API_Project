import { API_CoinGecko_Call } from "../API/CoinGecko_API.js";
import { API_MinerStat_Call } from "../API/MinerStat_API.js";
import { API_BlockChainData_Call } from "../API/BlockChainData_API.js";

const dataArrMaxLength = 8;

let priceArr = [];
let timeArr = [];
let callCounter = 0;

async function fetchDataFromAPIs() {
  try {
    const dataCoinGecko = await API_CoinGecko_Call();
    const dataMinerStat = await API_MinerStat_Call();
    const dataBlockChain = await API_BlockChainData_Call();

    return { dataCoinGecko, dataMinerStat, dataBlockChain };
  } catch (error) {
    throw new Error("Error fetching data from APIs");
  }
}

function mapBTCObject(dataCoinGecko, dataMinerStat, dataBlockChain) {
  return {
    name: dataCoinGecko.name,
    price: dataCoinGecko.current_price,
    price_array: priceArr,
    market_cap: dataCoinGecko.market_cap,
    ath: dataCoinGecko.ath,
    daily_high: dataCoinGecko.high_24h,
    daily_low: dataCoinGecko.low_24h,
    circulating_supply: dataCoinGecko.circulating_supply,
    algorithm: dataMinerStat.algorithm,
    hashrate: dataMinerStat.network_hashrate,
    block_reward: dataMinerStat.reward_block,
    block_height: dataBlockChain.height,
    total_block_reward: dataMinerStat.reward,
    time: timeArr,
    API_Call_Count: callCounter,
  };
}

//Updating price array

function updatePriceArray(dataCoinGecko) {
  if (priceArr.length === dataArrMaxLength) {
    priceArr.shift(); // Remove the oldest element
  }
  priceArr.push(dataCoinGecko.current_price);
}

//Updating time array

function updateTimeArray() {
  let time = getTime();

  if (timeArr.length === dataArrMaxLength) {
    timeArr.shift(); // Remove the oldest element
  }
  timeArr.push(time);
}

async function store() {
  try {
    callCounter++;
    console.log(`Store function called ${callCounter} times.`);

    const { dataCoinGecko, dataMinerStat, dataBlockChain } =
      await fetchDataFromAPIs();

    updatePriceArray(dataCoinGecko);
    updateTimeArray();

    const BTCObject = mapBTCObject(
      dataCoinGecko,
      dataMinerStat,
      dataBlockChain
    );

    //Log the retrieved Bitcoin data
    //console.log(dataCoinGecko);
    //console.log(dataMinerStat);
    //console.log(dataBlockChain);
    //console.log(BTCObject);

    return BTCObject;
  } catch (error) {
    console.error(error.message);
    return null; // or handle the error as needed
  }
}

// Call initially then Update the store every 20 seconds

setInterval(async () => {
  await store();
}, 100000);

const getTime = () => {
  // Create a date object.
  let time = new Date();

  let options = { hour: "numeric", minute: "numeric", second: "numeric" };

  let timeFormatter = new Intl.DateTimeFormat("en-US", options);
  let formattedTime = timeFormatter.format(time);

  return formattedTime;
};

export { store };
