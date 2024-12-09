import { ROLES, WEAPONS, ROLE_ACTIONS } from './config.js';
import { setupAudioControls } from './audioControls.js'

class Player {
  constructor(name, roleId) {
    this.playerName = name;
    this.playerRoleId = roleId; 
    this.playerRoleName = ROLES[roleId]; 
    this.playerStatus = "alive";
  }
}

let players = [];
let nightCount = 1;
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  setupAudioControls();

  document.getElementById('playGame').addEventListener('click', showPlayerSetup);
  document.getElementById('startGame').addEventListener('click', startGame);
  document.getElementById('confirmNames').addEventListener('click', confirmNames);
  document.getElementById('showRoleButton').addEventListener('click', showRole);
  document.getElementById('nextPlayerButton').addEventListener('click', nextPlayer);
  });

function showPlayerSetup() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("playerSetup").classList.remove("hidden");
}

function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);

  if (isNaN(playerCount) || playerCount < 2) {
    alert("Please enter a valid number of players (minimum 2).");
    return;
  }

  const roleIds = generateRoleIds(playerCount);
  // Initialize players with placeholder names and random roles
  players = Array.from({ length: playerCount }, (_, i) => {
    const roleId = roleIds[i];  
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

// Custom function to generate role IDs based on rules
function generateRoleIds(playerCount) {
  const roleIds = [];
  
  // Ensure there's exactly one player with roleId = 1 and 2
  roleIds.push(1);  
  roleIds.push(2);
  
  // Fill the remaining roleIds with random values, ensuring all other roleIds are between 2 and 10
  while (roleIds.length < playerCount) {
    const randomRoleId = Math.floor(Math.random() * 8) + 3; // Random roleId between 2 and 10
    roleIds.push(randomRoleId);
  }

  return shuffleArray(roleIds);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
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
  document.getElementById("roleCall").classList.remove("hidden");

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
    document.getElementById("roleCall").classList.add("hidden");
    startNight();
    return;
  }

  showPlayer();
}

function startNight() {
  document.getElementById("gameLoop").classList.remove("hidden");

  updateNightPrompt();
}

function updateNightPrompt() {
  document.getElementById("nightPrompt").textContent = `Night ${nightCount} is upon us!`;
  document.getElementById("continueToNight").classList.remove("hidden");
  document.getElementById("playerTurn").classList.add("hidden");
}

document.getElementById("continueToNight").addEventListener("click", () => {
  document.getElementById("continueToNight").classList.add("hidden");
  document.getElementById("playerTurn").classList.remove("hidden");

  currentIndex = 0; // Reset for this night
  showPlayerTurn();
});

// Show the current player's turn
function showPlayerTurn() {
  const player = players[currentIndex];
  document.getElementById("currentPlayerPrompt").textContent = `${player.playerName}'s Turn`;
  document.getElementById("roleInteraction").classList.add("hidden");
  document.getElementById("startTurn").classList.remove("hidden");
}

// Start the player's turn
document.getElementById("startTurn").addEventListener("click", () => {
  document.getElementById("startTurn").classList.add("hidden");
  generateRoleForm(players[currentIndex]);
  document.getElementById("roleInteraction").classList.remove("hidden");
});

// Dynamically generate the form for the player's role
function generateRoleForm(player) {
  const roleAction = ROLE_ACTIONS[player.playerRoleName.toLowerCase()];
  const formContainer = document.getElementById("roleForm");

  // Clear previous form content
  formContainer.innerHTML = "";

  if (roleAction) {
    document.getElementById("roleDescription").textContent = roleAction.description;

    // Generate form fields based on the role configuration
    roleAction.formFields.forEach((field) => {
      const label = document.createElement("label");
      label.textContent = field.label;
      label.setAttribute("for", field.id);
      formContainer.appendChild(label);

      if (field.type === "dropdown") {
        const select = document.createElement("select");
        select.id = field.id;

        // Add options for all players except the current one
        players.forEach((p, index) => {
          if (p.playerName !== player.playerName) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = p.playerName;
            select.appendChild(option);
          }
        });

        formContainer.appendChild(select);
      }

      // Add other field types if needed (text, number, etc.)
    });

    // Add a submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    submitButton.classList.add("menu-btn");
    formContainer.appendChild(submitButton);
  } else {
    document.getElementById("roleDescription").textContent = "No actions available for your role.";
  }
}

// Handle form submission
document.getElementById("roleForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Example of handling a form action
  const player = players[currentIndex];
  const targetPlayerIndex = document.getElementById("targetPlayerSelect")?.value;

  if (targetPlayerIndex !== undefined) {
    const targetPlayer = players[targetPlayerIndex];
    alert(`${player.playerName} (${player.playerRoleName}) targeted ${targetPlayer.playerName}`);
  }

  currentIndex++;

  // If all players are done, end the night; otherwise, go to the next player
  if (currentIndex >= players.length) {
    alert(`Night ${nightCount} has ended.`);
    nightCount++;
    startNight(); // Reset for the next night
  } else {
    showPlayerTurn();
  }
});
