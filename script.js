// Select all game buttons except the reset button
const buttons = document.querySelectorAll("button:not(.reset)");

// Select the reset button
const reset = document.querySelector(".reset");

// Define all possible winning combinations
const winPatterns = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Initialize the first player's turn as 'X'
let nextChance = "X";

// Add event listeners to each button for handling player moves
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Only allow moves on empty buttons
    if (button.innerText === "") {
      button.innerText = nextChance; // Set current player's mark
      nextChance = nextChance === "X" ? "O" : "X"; // Switch turns
      checkWinner(); // Check if there is a winner or a draw
    }
  });
});

// Function to check for a winner or a draw
function checkWinner() {
  let winnerFound = false; // Track if a winner is found

  // Loop through each winning pattern to check for a match
  for (let pattern of winPatterns) {
    const val1 = buttons[pattern[0]].innerText;
    const val2 = buttons[pattern[1]].innerText;
    const val3 = buttons[pattern[2]].innerText;

    // Check if all three positions in the pattern contain the same non-empty value
    if (val1 !== "" && val2 !== "" && val3 !== "") {
      if (val1 === val2 && val2 === val3) {
        // If all three are the same, we have a winner
        winnerFound = true;

        // Clear the body content and display the winner message
        document.querySelector("body").innerHTML = "";
        const winnerDiv = document.createElement("div");
        winnerDiv.classList.add("winner");
        winnerDiv.innerText = `🎉 ${val1} is the Winner! 🎉`;
        document.querySelector("body").append(winnerDiv);

        // Create a reset button for replaying
        const resetButton = document.createElement("button");
        resetButton.classList.add("reset");
        resetButton.innerText = "Play Again!";
        resetButton.addEventListener("click", () => {
          location.reload(); // Reload the page to restart the game
        });
        document.body.append(resetButton);
        break;
      }
    }
  }

  // Check for a draw (if all buttons are filled and no winner is found)
  const blank = Array.from(buttons).every((button) => button.innerHTML !== "");
  if (blank && !winnerFound) {
    // Clear the body content and display the draw message
    document.querySelector("body").innerHTML = "";
    const draw = document.createElement("div");
    draw.classList.add("draw");
    draw.innerText = "🤝 It’s a Draw! 🤝";
    document.querySelector("body").append(draw);

    // Create a reset button for replaying
    let resetButton = document.createElement("button");
    resetButton.classList.add("reset");
    resetButton.innerText = "Play Again";
    resetButton.addEventListener("click", () => {
      location.reload(); // Reload the page to restart the game
    });
    document.body.append(resetButton);
  }
}

// Reset button functionality to clear the board and restart the game
reset.addEventListener("click", () => {
  buttons.forEach((button) => {
    button.innerText = ""; // Clear each button
  });
  nextChance = "X"; // Reset to player X's turn
});
