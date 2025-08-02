// 1. Constants and DOM Selections
console.log("main.js loaded!"); // <-- Aggiunto per debug
const gridSize = 640;
const container = document.querySelector(".container");
const menu = document.querySelector(".menu");

// 2. Function Definitions

/**
 * Changes the background color of a grid cell on mouseover.
 * @param {MouseEvent} e The mouse event.
 */
function changeBackground(e) {
  // Use event delegation to color only the grid cells
  if (e.target.classList.contains("grid-cell")) {
    e.target.style.backgroundColor = "blue";
  }
}

/**
 * Resizes the grid cells to fit the container.
 * @param {number} sideCellCounter The number of cells on one side of the grid.
 */
function gridShaper(sideCellCounter) {
  const cells = document.querySelectorAll(".grid-cell");
  const size = `${gridSize / sideCellCounter}px`;
  cells.forEach((cell) => {
    cell.style.width = size;
    cell.style.height = size;
  });
}

/**
 * Handles the click event on the menu buttons.
 * @param {MouseEvent} e The mouse event.
 */
function pressButton(e) {
  // Only act on the "Size" button
  if (e.target.id !== "askSize") return;

  const input = prompt("Input the desired grid size (4 to 100):");
  // If user cancels or enters nothing, do nothing.
  if (input === null || input.trim() === "") {
    return;
  }

  const sideCellCounter = parseInt(input, 10);

  // Validate the input
  if (isNaN(sideCellCounter) || sideCellCounter < 4 || sideCellCounter > 100) {
    alert("Input non valido. Per favore, inserisci un numero tra 4 e 100.");
    return;
  }

  // Clear the existing grid
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Rebuild the grid with the new size
  const totalCells = Math.pow(sideCellCounter, 2);
  gridGenerator(totalCells);
  gridShaper(sideCellCounter);
}

/**
 * Generates the grid cells and appends them to the container.
 * @param {number} num The total number of cells to create.
 */
function gridGenerator(num) {
  for (let i = 0; i < num; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-cell");
    container.appendChild(square);
  }
}

// 3. Initial Setup and Event Listeners

// Generate initial 16x16 grid
const initialSideSize = 16;
gridGenerator(Math.pow(initialSideSize, 2));
gridShaper(initialSideSize);

// Add event listeners
container.addEventListener("mouseover", changeBackground);
menu.addEventListener("click", pressButton);
