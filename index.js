//client-side JavaScript file

// Make a GET request to your server endpoint
BTCdata = () =>
  fetch("http://localhost:3000/Application") // Replace with your server URL and endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      // Handle the data received from the server
      console.log("Data from server:", data);
      // Process and use the data as needed in your client-side code
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors occurred during the fetch operation
    });

//Call Server every 10 seconds to refresh data.
