export type Language = "es" | "en";

export type Deck = {
  id: string;
  name: string;
  creator: string;
  format: string;
  wins: number;
  cards: number;
  list: string;
  price?: number;
};

export type GameCategory = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  decks: Deck[];
};

export const gameCategories: GameCategory[] = [
  {
    id: "pokemon",
    name: "Pokémon TCG Pocket",
    shortName: "PKM",
    color: "bg-primary",
    decks: [
      {
        id: "charizard-ex",
        name: "Charizard ex Control",
        creator: "0x71A9...C4F2",
        format: "Standard",
        wins: 68,
        cards: 20,
        list: "2 Charmander A1 33\n2 Charmeleon A1 34\n2 Charizard ex A1 36\n2 Moltres ex A1 47\n2 Professor's Research P-A 7\n2 Poké Ball P-A 5\n2 X Speed P-A 2\n2 Sabrina A1 225\n2 Giovanni A1 223\n2 Potion P-A 1",
      },
      {
        id: "mewtwo-gardevoir",
        name: "Mewtwo & Gardevoir",
        creator: "LunaTCG",
        format: "Standard",
        wins: 74,
        cards: 20,
        price: 2.5,
        list: "2 Mewtwo ex A1 129\n2 Ralts A1 130\n2 Kirlia A1 131\n2 Gardevoir A1 132\n2 Professor's Research P-A 7\n2 Poké Ball P-A 5\n2 Sabrina A1 225\n2 Giovanni A1 223\n2 X Speed P-A 2\n2 Potion P-A 1",
      },
      {
        id: "pikachu-tempo",
        name: "Pikachu Tempo",
        creator: "0x9B20...91E7",
        format: "Standard",
        wins: 71,
        cards: 20,
        list: "2 Pikachu ex A1 96\n2 Zapdos ex A1 104\n2 Blitzle A1 105\n2 Zebstrika A1 106\n2 Professor's Research P-A 7\n2 Poké Ball P-A 5\n2 Sabrina A1 225\n2 Giovanni A1 223\n2 X Speed P-A 2\n2 Potion P-A 1",
      },
    ],
  },
  {
    id: "hearthstone",
    name: "Hearthstone",
    shortName: "HS",
    color: "bg-accent",
    decks: [
      {
        id: "spell-mage",
        name: "Elemental Spell Mage",
        creator: "ArcanePilot",
        format: "Standard",
        wins: 63,
        cards: 30,
        list: "### Elemental Spell Mage\n# Class: Mage\n# Format: Standard\n2x (1) Flame Geyser\n2x (1) Miracle Salesman\n2x (2) Aqua Archivist\n2x (2) Heat Wave\n2x (3) Molten Rune\n2x (3) Reverberations\n2x (4) Fireball\n2x (4) Overflow Surger\n2x (5) Sleet Skater\n2x (6) Blizzard",
      },
      {
        id: "reno-warrior",
        name: "Reno Warrior",
        creator: "0xE81B...2A10",
        format: "Wild",
        wins: 66,
        cards: 30,
        price: 3,
        list: "### Reno Warrior\n# Class: Warrior\n# Format: Wild\n1x (1) Armor Vendor\n1x (1) Shield Slam\n1x (2) Astalor Bloodsworn\n1x (2) Bladestorm\n1x (3) Heavy Plate\n1x (3) Prince Renathal\n1x (4) Aftershocks\n1x (5) Brawl\n1x (6) Reno Jackson\n1x (8) Odyn, Prime Designate",
      },
      {
        id: "token-hunter",
        name: "Token Hunter",
        creator: "ValenDecks",
        format: "Standard",
        wins: 61,
        cards: 30,
        list: "### Token Hunter\n# Class: Hunter\n# Format: Standard\n2x (1) Awakening Tremors\n2x (1) Bunch of Bananas\n2x (2) Barrel of Monkeys\n2x (2) Messenger Buzzard\n2x (3) Ball of Spiders\n2x (3) Saddle Up!\n2x (4) Jungle Gym\n2x (4) Yelling Yodeler\n2x (5) Product 9\n2x (6) Aggramar, the Avenger",
      },
    ],
  },
  {
    id: "mtg",
    name: "Magic: The Gathering Arena",
    shortName: "MTG",
    color: "bg-secondary",
    decks: [
      {
        id: "azorius-control",
        name: "Azorius Control",
        creator: "ManaVault.eth",
        format: "Standard BO1",
        wins: 69,
        cards: 60,
        list: "Deck\n4 No More Lies (MKM) 221\n4 Three Steps Ahead (OTJ) 75\n3 Sunfall (MOM) 40\n3 Temporary Lockdown (DMU) 36\n2 Jace, the Perfected Mind (ONE) 57\n4 Deduce (MKM) 52\n4 Deserted Beach (MID) 260\n4 Restless Anchorage (LCI) 280\n8 Island (MKM) 280\n8 Plains (MKM) 278",
      },
      {
        id: "golgari-midrange",
        name: "Golgari Midrange",
        creator: "0xFF04...118B",
        format: "Standard BO3",
        wins: 72,
        cards: 60,
        price: 4.5,
        list: "Deck\n4 Deep-Cavern Bat (LCI) 102\n4 Mosswood Dreadknight (WOE) 231\n3 Glissa Sunslayer (ONE) 202\n3 Sheoldred, the Apocalypse (DMU) 107\n4 Go for the Throat (BRO) 102\n3 Cut Down (DMU) 89\n4 Restless Cottage (WOE) 258\n4 Llanowar Wastes (BRO) 264\n8 Swamp (MKM) 282\n7 Forest (MKM) 286",
      },
      {
        id: "mono-red",
        name: "Mono Red Prowess",
        creator: "FuegoRojo",
        format: "Standard BO1",
        wins: 65,
        cards: 60,
        list: "Deck\n4 Monastery Swiftspear (BRO) 144\n4 Slickshot Show-Off (OTJ) 146\n4 Fugitive Codebreaker (MKM) 127\n4 Monstrous Rage (WOE) 142\n4 Play with Fire (MID) 154\n4 Lightning Strike (DMU) 137\n4 Ancestral Anger (VOW) 142\n4 Kumano Faces Kakkazan (NEO) 152\n18 Mountain (MKM) 284",
      },
    ],
  },
];
