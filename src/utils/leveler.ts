/***********************************************
 * shoutout to @arek for providing his formula *
 ***********************************************

  This formula is for one level up for one stat.

  variables:
  mod = stat modifier. if the stat is STR, DEX, INT, or LUK then mod=4, for all other stats mod=16
  stat = the value of the stat

  x = 1 + floor(stat / mod)
  y = (x * (x + 1) / 2) + x
  z = a random number between 0 and floor(y)

  if z < x: 
    the stat is +0 on level up, aka it skips a level
  otherwise the stat gains this number on level up:
    1 + floor((-1 + sqrt((8 * (z - x)) + 1)) / 2)

  * to floor() means to round down. e.g. floor(9.6) = 9
  * the number inside sqrt() is square rooted. e.g. sqrt(4) = 2
  * for figuring out Speed and Jump, if the Speed/Jump stat doesn't skip a level, the level up will always be +1

  if an item skips all stats on a level up then all the stats are rerolled. this is why items with one stat line never skip levels.

 */

import { Item, LevelUpResult } from '@/types'
import _ from 'lodash'

const PRIMARY_STAT_TYPES = [ 'str', 'dex', 'int', 'luk' ];

function getStatModifier(stat: string): number {
  if (PRIMARY_STAT_TYPES.includes(stat)) {
    return 4;
  } else {
    return 16;
  }
}

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function statLevelUpAmount(stat: string, value: number): number {
  const modifier = getStatModifier(stat);
  const x = 1 + Math.floor(value / modifier);
  const y = (x * (x + 1) / 2) + x;
  const z = randomIntFromInterval(0, Math.floor(y));
  let levelUpAmount: number = value;

  if (z < x) {
    levelUpAmount = 0;
  } else {
    if (stat === 'speed' || stat === 'jump') {
      levelUpAmount = 1;
    } else {
      levelUpAmount = 1 + Math.floor((-1 + Math.sqrt((8 * (z - x)) + 1)) / 2);
    }
  }
  return levelUpAmount;
}

export function statMaxLevelUpAmount(stat: string, value: number): number {
  const modifier = getStatModifier(stat);
  const x = 1 + Math.floor(value / modifier);
  const y = (x * (x + 1) / 2) + x;
  const z = Math.floor(y);
  let levelUpAmount: number = value;

  if (z < x) {
    levelUpAmount = 0;
  } else {
    if (stat === 'speed' || stat === 'jump') {
      levelUpAmount = 1;
    } else {
      levelUpAmount = 1 + Math.floor((-1 + Math.sqrt((8 * (z - x)) + 1)) / 2);
    }
  }

  return levelUpAmount;
}

export function levelUpItem(item: Item): Item {
  const leveledUpItem: Item = {
    level: item.level + 1,
    stats: _.cloneDeep(item.stats),
    maxStats: _.cloneDeep(item.stats),
    maxOfMaxStats: _.cloneDeep(item.maxOfMaxStats)
  }

  do {
    for (const stat in item.stats) {
      if (item.stats[stat] != null) {
        const levelUpAmount = item.stats[stat]! + statLevelUpAmount(stat, item.stats[stat]!);
        leveledUpItem.stats[stat] = levelUpAmount;

        const maxlevelUpAmount = item.stats[stat]! + statMaxLevelUpAmount(stat, item.stats[stat]!);
        leveledUpItem.maxStats[stat] = maxlevelUpAmount;

        const maxOfMaxlevelUpAmount = item.maxOfMaxStats[stat]! + statMaxLevelUpAmount(stat, item.maxOfMaxStats[stat]!);
        leveledUpItem.maxOfMaxStats[stat] = maxOfMaxlevelUpAmount;
      }
    }
  } while (_.eq(item.stats, leveledUpItem.stats))

  return leveledUpItem;
}

export function simulateManyLevels(item: Item, levels: number, runs: number): Array<LevelUpResult> {
  const levelUpResults: Array<LevelUpResult> = [];

  for (const stat in item.stats) {
    if (item.stats[stat] != null) {
      const dataset: LevelUpResult = {
        stat: stat,
        results: {}
      };

      for (let i = 0; i < runs; i++) {
        let leveledUpStat = item.stats[stat]!;
        for (let j = 0; j < levels; j++) {
          leveledUpStat += statLevelUpAmount(stat, leveledUpStat);
        }
    
        if (leveledUpStat in dataset.results) {
          dataset.results[leveledUpStat]++;
        } else {
          dataset.results[leveledUpStat] = 1;
        }
      }

      levelUpResults.push(dataset);
    }
  }

  

  return levelUpResults;
}