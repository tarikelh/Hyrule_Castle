import Player from "./interface/Player";

export default function gainExperience(player: Player, message: string): void {
    const xpEarned = Math.floor(Math.random() * (50 - 15 + 1)) + 15; // Entre 15 et 50 points d'expérience
    player.xp += xpEarned;
    message=` You earned ${xpEarned} experience points.`;
    checkLevelUp(player, message);
}


const xpToLevelUp = 100; // Plafond de xp pour monter en niveau

function checkLevelUp(player: Player, message: string): void {
    if (player.xp >= xpToLevelUp) {
        player.lvl++;
        player.xp -= xpToLevelUp;
        message += ` Congratulations! You leveled up to level ${player.lvl}.`;
        
        player.str += Math.floor(Math.random() * 3) + 1; // Ajoute entre 1 et 3 points de force
        player.hp += Math.floor(Math.random() * 5) + 5; // Ajoute entre 5 et 9 points de vie

    }
}


