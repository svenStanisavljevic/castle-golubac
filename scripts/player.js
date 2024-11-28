class Player {
  constructor(name, roleId) {
    this.playerName = name;
    this.playerRoleId = roleId; 
    this.playerRoleName = ROLES[roleId]; 
    this.playerStatus = "alive"; 
  }
}