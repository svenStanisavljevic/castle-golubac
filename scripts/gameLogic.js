let players = [];
let currentIndex = 0;

// Initialize players with random roles
function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  if (isNaN(playerCount) || playerCount < 2) {
    alert("Please enter a valid number of players (minimum 2).");
    return;
  }

  players = Array.from({ length: playerCount }, (_, i) => {
    const roleId = Math.floor(Math.random() * 10) + 1;
    return new Player(`Player ${i + 1}`, roleId);
  });

  // Create name inputs
  const form = document.getElementById("playerNamesForm");
  form.innerHTML = "";
  players.forEach((player, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Enter name for ${player.playerName}`;
    input.id = `playerNameInput${index}`;
    input.classList.add("player-name-input"); 
    input.required = true;
    form.appendChild(input);
  });

  // Show the name entry screen
  document.getElementById("playerSetup").classList.add("hidden");
  document.getElementById("playerNamesSetup").classList.remove("hidden");
}

// Confirm names and proceed to game screen
function confirmNames() {
  const form = document.getElementById("playerNamesForm");
  const inputs = form.querySelectorAll("input");

  // Update player names
  inputs.forEach((input, index) => {
    players[index].playerName = input.value || `Player ${index + 1}`;
  });

  // Switch to game screen
  document.getElementById("playerNamesSetup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  showPlayer();
}

// Show the current player's info
function showPlayer() {
  const player = players[currentIndex];
  document.getElementById("playerName").textContent = player.playerName;
  document.getElementById("prompt").textContent = `It's your turn, ${player.playerName}!`;
  document.getElementById("playerRole").classList.add("hidden");
  document.getElementById("showRoleButton").classList.remove("hidden");
  document.getElementById("nextPlayerButton").classList.add("hidden");
}

// Reveal player's role
function showRole() {
  const player = players[currentIndex];
  document.getElementById("playerRole").textContent = `Your role: ${player.playerRoleName}`;
  document.getElementById("playerRole").classList.remove("hidden");
  document.getElementById("showRoleButton").classList.add("hidden");
  document.getElementById("nextPlayerButton").classList.remove("hidden");
}

// Move to next player
function nextPlayer() {
  currentIndex++;
  if (currentIndex >= players.length) {
    alert("All players have seen their roles. The game begins!");
    // Game logic can proceed here
    return;
  }
  showPlayer();
}