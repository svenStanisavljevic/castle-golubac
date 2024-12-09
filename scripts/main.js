import { ROLES } from './config.js';
import { setupAudioControls } from './audioControls.js'

// Player class definition
class Player {
  constructor(name, roleId) {
    this.playerName = name;
    this.playerRoleId = roleId; 
    this.playerRoleName = ROLES[roleId]; 
    this.playerStatus = "alive";
  }
}

let players = [];
let currentIndex = 0;

// Input listeners
document.getElementById('playGame').addEventListener('click', showPlayerSetup);
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('confirmNames').addEventListener('click', confirmNames);
document.getElementById('showRoleButton').addEventListener('click', showRole);
document.getElementById('nextPlayerButton').addEventListener('click', nextPlayer);

document.addEventListener('DOMContentLoaded', () => {
    setupAudioControls();
});

// Show the player setup screen
function showPlayerSetup() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("playerSetup").classList.remove("hidden");
}

// Start the game after entering player count
function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);

  if (isNaN(playerCount) || playerCount < 2) {
    alert("Please enter a valid number of players (minimum 2).");
    return;
  }

  // Initialize players with placeholder names and random roles
  players = Array.from({ length: playerCount }, (_, i) => {
    const roleId = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    return new Player(`Player ${i + 1}`, roleId);
  });

  // Dynamically create input fields for player names
  const form = document.getElementById("playerNamesForm");
  form.innerHTML = ""; // Clear previous inputs
  players.forEach((player, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Enter name for ${player.playerName}`;
    input.id = `playerNameInput${index}`;
    input.classList.add("player-name-input");
    input.required = true;
    form.appendChild(input);
  });

  // Switch screens
  document.getElementById("playerSetup").classList.add("hidden");
  document.getElementById("playerNamesSetup").classList.remove("hidden");
}

// Confirm player names and begin the game
function confirmNames() {
  const form = document.getElementById("playerNamesForm");
  const inputs = form.querySelectorAll("input");

  // Update player names from the input fields
  inputs.forEach((input, index) => {
    players[index].playerName = input.value || `Player ${index + 1}`; // Default name if empty
  });

  // Switch to the game screen
  document.getElementById("playerNamesSetup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  showPlayer(); // Start with the first player
}

// Show the current player's turn
function showPlayer() {
  const player = players[currentIndex];
  document.getElementById("playerName").textContent = player.playerName;
  document.getElementById("playerRole").classList.add("hidden");
  document.getElementById("showRoleButton").classList.remove("hidden");
  document.getElementById("nextPlayerButton").classList.add("hidden");
  document.getElementById("prompt").textContent = `It's your turn, ${player.playerName}!`;
}

// Reveal the current player's role
function showRole() {
  const player = players[currentIndex];
  document.getElementById("playerRole").textContent = `Your role: ${player.playerRoleName}`;
  document.getElementById("playerRole").classList.remove("hidden");
  document.getElementById("showRoleButton").classList.add("hidden");
  document.getElementById("nextPlayerButton").classList.remove("hidden");
}

// Proceed to the next player's turn
function nextPlayer() {
  currentIndex++;
  if (currentIndex >= players.length) {
    alert("All players have seen their roles. The game begins!");
    // Logic to transition to the actual game phase can be added here
    return;
  }

  showPlayer();
}
