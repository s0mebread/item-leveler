export interface RootState {
  item: Array<Item>;
}

export const PrimaryStatType: string[] = [
  'str',
  'dex',
  'int',
  'luk'
];

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

export interface Item {
  stats: Array<Stat>;
  level: number;
}