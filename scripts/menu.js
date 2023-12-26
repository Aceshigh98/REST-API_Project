// Get the menu elements
const menuToggle = document.querySelector(".menu-toggle");
const menuItems = document.querySelector(".menu-items");

// Add click event listener to the menu toggle button
menuToggle.addEventListener("click", function () {
  // Toggle the 'active' class for the menu items
  menuItems.classList.toggle("active");
});

// Close menu if clicked outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".navbar")) {
    menuItems.classList.remove("active");
  }
});
