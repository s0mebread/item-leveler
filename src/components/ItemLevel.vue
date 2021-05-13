<template>
  <div>
    <card>
      <template #title>
        <div class="p-text-center">Level {{ itemLevel.level }}</div>
      </template>
      <template #content>
        <div class="p-grid stat-output"
          v-for="(statLine, index) in statArray"
          :key="index"
        >
          <div class="p-divider"></div>
          <div class="p-col-6">
            <div class="p-grid">
              <div class="p-col-12">
                <div class="box p-text-bold">{{ prettifyStatName(statLine.stat) }}:</div>
              </div>
              <div class="p-col-12">
                <div class="box p-text-bold">Max {{ prettifyStatName(statLine.stat) }}:</div>
              </div>
            </div>
            <div class="box box-stretched"></div>
          </div>
          <div class="p-col-6">
            <div class="p-grid">
              <div class="p-col-12">
                <div class="box">{{ statLine.statValue }}</div>
              </div>
              <div class="p-col-12">
                <div class="box">{{ statLine.maxStatValue }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Item } from '@/types'
import Card from 'primevue/card'
import Divider from 'primevue/divider'

@Component({
  components: {
    Card,
    Divider
  }
})
export default class ItemLevel extends Vue {
  @Prop() readonly itemLevel!: Item;
  statOrder = ['str', 'dex', 'int', 'luk', 'hp', 'mp', 'wa', 'ma', 'wdef', 'mdef', 'acc', 'avoid', 'speed', 'jump'];

  get statArray(): Array<{ stat: string, statValue: number | null, maxStatValue: number | null }> {
    const statArray: Array<{ stat: string, statValue: number | null, maxStatValue: number | null }> = [];
    this.statOrder.forEach(stat => {
      if (this.itemLevel.stats[stat] != null) {
        statArray.push({
          stat: stat,
          statValue: this.itemLevel.stats[stat],
          maxStatValue: this.itemLevel.maxStats[stat],
        })
      }
    })
    return statArray;
  }

  prettifyStatName(stat: string): string {
    switch (stat) {
      case 'wdef':
        return 'WDef';
      case 'mdef':
        return 'MDef';
      case 'acc':
        return 'Acc';
      case 'avoid':
        return 'Avoid';
      case 'speed':
        return 'Speed';
      case 'jump':
        return 'Jump';
      default:
        return stat.toUpperCase();
    }
  }
}
</script>

<style lang="scss">
.stat-output {
  border-top: 1px solid #bbb;
}

.p-card .p-card-content {
  padding: 1rem 0 0 0 !important;
}
</style>