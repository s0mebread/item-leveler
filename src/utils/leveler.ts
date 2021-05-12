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

import { Stat, PrimaryStatType } from '@/typings'

function getStatModifier(stat: Stat): number {
  if (PrimaryStatType.includes(stat.type)) {
    return 4;
  } else {
    return 16;
  }
}

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function levelUpStat(stat: Stat): Stat {
  const modifier = getStatModifier(stat);
  const x = 1 + Math.floor(stat.value / modifier);
  const y = (x * (x + 1) / 2) + x;
  const z = randomIntFromInterval(0, Math.floor(y));
  let levelUp: Stat = {
    type: stat.type,
    value: stat.value
  }

  if (z >= x) {
    if (stat.type === 'speed') {
      levelUp.value = stat.value + 1;
    } else {
      levelUp.value = 1 + Math.floor((-1 + Math.sqrt((8 * (z - x)) + 1)) / 2);
    }
  }

  return levelUp;
}