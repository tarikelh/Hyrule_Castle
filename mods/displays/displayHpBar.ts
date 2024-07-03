import Character from "../interface/Character";


export default function displayHpBar(character: Character, hpMaxCharacter: number, isEnemyOrBoss : boolean) {
    !isEnemyOrBoss
      ? console.log(`\x1b[92m${character.name}\x1b[0m`)
      : console.log(`\x1b[91m${character.name}\x1b[0m`);
    let hpBar = "";
  
    for (let i = 0; i < character.hp; i++) {
      hpBar += "I";
    }
  
    for (let i = character.hp; i < hpMaxCharacter; i++) {
      hpBar += "_";
    }
  
    console.log(`HP: ${hpBar}  ${character.hp}  /  ${hpMaxCharacter}\n`);
  }