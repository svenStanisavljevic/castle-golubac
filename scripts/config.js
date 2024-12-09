export const ROLES = {
  1: "King",
  2: "Assassin",
  3: "Wizard",
  4: "Apothecary",
  5: "Guard",
  6: "Nobleman",
  7: "Detective",
  8: "Escort",
  9: "Servant",
  10: "Heir",
};

export const WEAPONS = {
  1: "Dagger",
  2: "Crossbow",
  3: "Poisoned Chalice",
  4: "Spiked Armor",
};

export const ROLE_ACTIONS = {
  spy: {
    description: "You are a Spy. Select a player to spy on:",
    formFields: [
      {
        label: "Target Player",
        type: "dropdown", 
        id: "targetPlayerSelect",
      },
    ],
  },
  healer: {
    description: "You are a Healer. Select a player to heal:",
    formFields: [
      {
        label: "Target Player",
        type: "dropdown",
        id: "targetPlayerSelect",
      },
    ],
  },
};