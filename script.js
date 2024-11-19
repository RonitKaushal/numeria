const gridContainer = document.getElementById("grid-container");
const restartButton = document.getElementById("restart");

let numbers = [];
let currentNumber = 1;

// Initialize the game
function initGame() {
  gridContainer.innerHTML = "";
  currentNumber = 1;
  numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

  numbers.forEach((num) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.textContent = num;
    gridItem.dataset.number = num;
    gridItem.addEventListener("click", () => handleNumberClick(num, gridItem));
    gridContainer.appendChild(gridItem);

    setTimeout(() => {
      gridItem.classList.add("grid-item", "hidden");
    }, 5000);
  });

  showNotification("Game started! Select numbers in sequence.", "info");
}

// Handle number click
function handleNumberClick(num, element) {


  if (num === currentNumber) {
    element.classList.remove("hidden");
    currentNumber++;
    if (currentNumber > 25) {
      showNotification("Congratulations! You've won!", "success");
    }
  } else {

    element.classList.remove("hidden");
    element.classList.add("wrong");
   
    setTimeout(() => {
      element.classList.add("hidden");
      element.classList.remove("wrong");
      showNotification("Wrong number! Restarting!", "error");
      resetGame();
    }, 1000);
  }
}

// Reset game to its initial state while keeping the positions the same
function resetGame() {
  currentNumber = 1;
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.classList.add("hidden");
  });
}

// Show notification in the container
function showNotification(message, type) {
  const notificationContainer = document.getElementById("notification");
  notificationContainer.textContent = message;
  notificationContainer.className = `notification ${type}`;
  notificationContainer.style.display = "block";

  setTimeout(() => {
    notificationContainer.style.display = "none";
  }, 5000);
}

// Restart button functionality
restartButton.addEventListener("click", initGame);

// Start the game on load
initGame();


// ///////////////////////////////////////////////////////////////////////////////

const aboutButton = document.getElementsByClassName("about-btn")[0];
const aboutContainer = document.getElementsByClassName("about-container")[0];
const closeButton = document.getElementsByClassName("close-btn")[0];

// Show the About container
aboutButton.addEventListener("click", () => {
  aboutContainer.classList.remove("hidden");
});

// Hide the About container
closeButton.addEventListener("click", () => {
  aboutContainer.classList.add("hidden");
});
