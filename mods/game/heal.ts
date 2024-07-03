import Player from "../interface/Player";

export default function heal(player: Player, hpMaxPlayer: number) {
  const healAmount = hpMaxPlayer / 2;
  player.hp += healAmount;
  if (player.hp > hpMaxPlayer) {
    player.hp = hpMaxPlayer;
  }
}
