export interface RootState {
  itemLevels: Array<Item>;
}

export interface Stats {
  [key: string]: number | null;
  str: number | null;
  dex: number | null;
  int: number | null;
  luk: number | null;
  hp: number | null;
  mp: number | null;
  wa: number | null;
  ma: number | null;
  wdef: number | null;
  mdef: number | null;
  acc: number | null;
  avoid: number | null;
  speed: number | null;
  jump: number | null;
}

export interface Item {
  level: number;
  stats: Stats;
  maxStats: Stats;
}