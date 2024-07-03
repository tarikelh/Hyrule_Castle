import Character from "../interface/Character";
import Player from "../interface/Player";

export default function attack(player: Player, enemyOrBoss : Character ) {
  enemyOrBoss.hp -= player.str;
  if (enemyOrBoss.hp < 0) {
    enemyOrBoss.hp = 0;
  }
}
