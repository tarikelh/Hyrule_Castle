import * as fs from "fs";
import * as rl from "readline-sync";
import Player from "./interface/Player";
import Enemy from "./interface/Enemy";
import Boss from "./interface/Boss";
import Character from "./interface/Character";
import attack from "./game/attack";
import heal from "./game/heal";
import displayHpBar from "./displays/displayHpBar";
import displayPressKey from "./displays/displayPressKey";
import displayOptions from "./displays/displayOptions";

function baseGame() {
  let useRandomCharacters = true;
  let initCharacters;
  let maxHpEnemy;
  const options = ["Random Characters", "Predefined Characters"];
  const gameChoice = rl.keyInSelect(options, "Choice Base Game with ...");
  switch (gameChoice) {
    case 0:
      useRandomCharacters = true;
      break;
    case 1:
      useRandomCharacters = false;
      break;
    default:
      return;
  }
  if (useRandomCharacters) {
    initCharacters = initRandomCharacters();
  } else {
    initCharacters = initPredefinedCharacters();
  }

  const maxHpPlayer = initCharacters.player.hp;

  let floor = 1;

  for (const enemy of initCharacters.enemies) {
    console.clear();

    maxHpEnemy = enemy.hp;

    fight(
      initCharacters.player,
      maxHpPlayer,
      enemy,
      maxHpEnemy,
      floor
    );

    if (initCharacters.enemies[9] <= 0) {
      console.log(
        "Congratulations! You defeated " +
          initCharacters.boss.name +
          ". You win!"
      );
      break;
    } else if (initCharacters.player.hp === 0) {
      console.log("Game over.");
      break;
    }
    floor++;
  }
}

//COMBAT
function fight(
  player: Player,
  hpMaxPlayer: number,
  enemyOrBoss: Character,
  hpMaxEnemyOrBoss: number,
  floor: number
) {
  enemyOrBoss.hp = hpMaxEnemyOrBoss;
  let message = "You encounter a " + enemyOrBoss.name;
  let message2 = "";
  let choice = 0;
  let win = false;
  let lose = false;

  while (!win && !lose) {
    console.clear();
    console.log(`========== FIGHT ${floor} ==========`);

    if (player.hp <= 0) {
      player.hp = 0;
      lose = true;
      console.log("You died.");
      return;
    }

    displayHpBar(enemyOrBoss, hpMaxEnemyOrBoss, true);

    displayHpBar(player, hpMaxPlayer, false);

    if (enemyOrBoss.hp <= 0) {
      message2 = `${enemyOrBoss.name} died!`;
      displayPressKey(message, message2);
      win = true;
      choice = 0;
    } else {
      // Tour du joueur
      choice = displayOptions(message, message2);

      switch (choice) {
        case 1:
          message = `You attacked and dealt ${player.str} damages!\n`;
          attack(player, enemyOrBoss);
          break;
        case 2:
          heal(player, hpMaxPlayer);
          message = `You used heal!\n`;
          break;
        default:
          console.log("Invalid choice!");
      }
      // Tour de l'ennemi
      message2 = `${enemyOrBoss.name} attacked and dealt ${enemyOrBoss.str} damages!\n`;
      player.hp -= enemyOrBoss.str;
    }
  }
}

//Fonction de Chargement des Personnages
function loadCharacterData(name: string, jsonFile: string) {
  const characters: Character[] = JSON.parse(
    fs.readFileSync(__dirname + "/data/" + jsonFile + ".json", "utf8")
  );
  return characters.find((character) => character.name === name);
}

function loadCharactersData(jsonFile: string) {
  const characters: Character[] = JSON.parse(
    fs.readFileSync(__dirname + "/data/" + jsonFile + ".json", "utf8")
  );
  return characters;
}

function initPredefinedCharacters() {
  const player = loadCharacterData("Link", "players") as Player;
  const enemy = loadCharacterData("Bokoblin", "enemies") as Enemy;
  const boss = loadCharacterData("Ganon", "bosses") as Boss;

  const presetEnemy = { ...enemy, hp: 30, str: 5 };
  let enemies: Character[] = [];
  for (let i = 0; i <= 8; i++) {
    enemies.push(presetEnemy);
  }

  const presetBoss = { ...boss, hp: 150, str: 20 };
  enemies.push(presetBoss);

  return { player, enemies };
}

function initRandomCharacters() {
  const players = loadCharactersData("players");
  const enemiesList = loadCharactersData("enemies");
  const bosses = loadCharactersData("bosses");

  const player = selectRandomCharacter(players);

  let enemies: Character[] = [];
  for (let i = 0; i <= 8; i++) {
    const enemy: Character = selectRandomCharacter(enemiesList)!;
    enemies.push(enemy);
  }

  const boss = selectRandomCharacter(bosses)!;
  enemies.push(boss);

  return { player, enemies };
}

//Fonction de Selection Personnage Random
function selectRandomCharacter(characters: Character[]) {
  const totalRarityPercentage = characters.reduce((total, character) => total + character.rarity,0);
  const randomValue = Math.random() * totalRarityPercentage;

  let cumulativePercentage = 0;
  for (const character of characters) {
    cumulativePercentage += character.rarity;
    if (randomValue < cumulativePercentage) {
      return character;
    }
  }

  return null;
}

//EXECUTION
baseGame();
