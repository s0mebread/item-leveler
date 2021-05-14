<template>
  <transition-group name="dynamic-box" tag="div" class="p-grid p-fluid p-col-12">
    <div v-for="(levelUpResult, index) of levelUpResults" :key="index" class="p-col">
      <div class="box">
        <div class="p-text-bold p-text-center">{{ prettifyStatName(levelUpResult.stat) }}</div>
        <stat-chart 
          :dataset="levelUpResult"
        />
      </div>
    </div>
  </transition-group>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { LevelUpResult } from '@/types'
import StatChart from './StatChart.vue'

@Component({
  computed: {
    ...mapState({
      levelUpResults: 'levelUpResults'
    })
  },
  components: {
    StatChart
  }
})
export default class StatDistributionCharts extends Vue {
  levelUpResults!: Array<LevelUpResult>;

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