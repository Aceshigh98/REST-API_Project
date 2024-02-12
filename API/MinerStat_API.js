// API

import fetch from 'node-fetch';

async function API_MinerStat_Call() {
  try {
    const response = await fetch("https://api.minerstat.com/v2/coins");

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();

    //Filtering JSON response by name to only return Bitcoin's data.
    function findItemByName(name, data) {
      return data.filter(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );
    }

    const nameToSearch = "Bitcoin";
    const foundItem = findItemByName(nameToSearch, data);
    //[0] accesing first instance of the array in JSON.
    return foundItem[0];
  } catch (error) {
    console.error("Their was a problem with the fetch operation.");
    throw error; //Propagate the error further.
  }
}

export { API_MinerStat_Call };
