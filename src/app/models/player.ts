export interface Player{
  index: number;
  lives: number;
  bullets: number;
  name: string;
  action: string;
  shootingPlayerIndex: number|undefined;
  position?: number;
}