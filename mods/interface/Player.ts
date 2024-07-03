import Character from "./Character";

export default interface Player extends Character {
    lvl: number;
    xp: number;
}