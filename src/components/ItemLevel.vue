<template>
  <div>
    <card>
      <template #title>
        <div class="p-text-center">Level {{ itemLevel.level }}</div>
      </template>
      <template #content>
        <div class="p-grid p-flex-column stat-output"
          v-for="(stat, index) in statArray"
          :key="index"
        >
          <div class="p-divider"></div>
          <div class="p-col-12">
            <div class="p-grid">
              <div class="p-col-6">
                <div class="box p-text-bold">{{ prettifyStatName(stat.stat) }}:</div>
              </div>
              <div class="p-col-6">
                <div class="box">{{ stat.statValue }}</div>
              </div>
            </div>
          </div>
          <div class="p-col-12"
            v-if="itemLevel.level !== startLevel"
          >
            <div class="p-grid">
              <div class="p-col-6">
                <div class="box p-text-bold">Max from {{ stat.previousStatValue }}:</div>
              </div>
              <div class="p-col-6">
                <div class="box">{{ stat.maxStatValue }}</div>
              </div>
            </div>
          </div>
          <div class="p-col-12"
            v-if="itemLevel.level !== startLevel"
          >
            <div class="p-grid">
              <div class="p-col-6">
                <div class="box p-text-bold">Max of Max:</div>
              </div>
              <div class="p-col-6">
                <div class="box">{{ stat.maxOfMaxStatValue }}</div>
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
import { Item, ItemLevelViewModel } from '@/types'
import Card from 'primevue/card'
import Divider from 'primevue/divider'

@Component({
  components: {
    Card,
    Divider
  }
})
export default class ItemLevel extends Vue {
  @Prop() readonly startLevel!: number;
  @Prop() readonly previousItemLevel!: Item;
  @Prop() readonly itemLevel!: Item;
  statOrder = ['str', 'dex', 'int', 'luk', 'hp', 'mp', 'wa', 'ma', 'wdef', 'mdef', 'acc', 'avoid', 'speed', 'jump'];

  get statArray(): Array<ItemLevelViewModel> {
    const statArray: Array<ItemLevelViewModel> = [];

    this.statOrder.forEach(stat => {
      let previousStatValue;
      if (this.previousItemLevel != null) {
        previousStatValue = this.previousItemLevel.stats[stat];
      } else {
        previousStatValue = this.itemLevel.stats[stat];
      }

      if (this.itemLevel.stats[stat] != null) {
        statArray.push({
          stat: stat,
          previousStatValue: previousStatValue,
          statValue: this.itemLevel.stats[stat],
          maxStatValue: this.itemLevel.maxStats[stat],
          maxOfMaxStatValue: this.itemLevel.maxOfMaxStats[stat]
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