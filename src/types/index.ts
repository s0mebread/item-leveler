export interface RootState {
  itemLevels: Array<Item>;
}

export enum StatType {
  str = 'str',
  dex = 'dex',
  int = 'int',
  luk = 'luk',
  hp = 'hp',
  mp ='mp',
  wa = 'wa',
  ma = 'ma',
  wdef = 'wdef',
  mdef = 'mdef',
  acc = 'acc',
  avoid = 'avoid',
  speed = 'speed',
  jump = 'jump'
}

export interface Stat {
  type: StatType;
  value: number;
}

export interface Stats {
  [key: string]: Stat | null;
  str: Stat | null;
  dex: Stat | null;
  int: Stat | null;
  luk: Stat | null;
  hp: Stat | null;
  mp: Stat | null;
  wa: Stat | null;
  ma: Stat | null;
  wdef: Stat | null;
  mdef: Stat | null;
  acc: Stat | null;
  avoid: Stat | null;
  speed: Stat | null;
  jump: Stat | null;
}

export interface Item {
  stats: Stats
  level: number;
}