export interface RootState {
  itemLevels: Array<Item>;
}

export const PrimaryStatType: string[] = [
  'str',
  'dex',
  'int',
  'luk'
];

export enum PrimaryStatTypeEnum {
  str = 'str',
  dex = 'dex',
  int = 'int',
  luk = 'luk'
}

export const StatType: string[] = [
  'hp',
  'mp',
  'wa',
  'ma',
  'wdef',
  'mdef',
  'acc',
  'avoid',
  'speed',
  'jump'
]

export interface Stat {
  type: string;
  value: number;
}

export interface Stats {
  str?: Stat | undefined | null;
  dex?: Stat | undefined | null;
  int?: Stat | undefined | null;
  luk?: Stat | undefined | null;
  hp?: Stat | undefined | null;
  mp?: Stat | undefined | null;
  wa?: Stat | undefined | null;
  ma?: Stat | undefined | null;
  wdef?: Stat | undefined | null;
  mdef?: Stat | undefined | null;
  acc?: Stat | undefined | null;
  avoid?: Stat | undefined | null;
  speed?: Stat | undefined | null;
  jump?: Stat | undefined | null;
}

export interface Item {
  stats: Stats
  level: number;
}