<template>
  <div class="p-d-flex p-jc-center">
    <apexchart width="500" height="350" type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { LevelUpResult } from '@/types'
import Card from 'primevue/card'
import _ from 'lodash'

@Component({
  components: {
    Card
  }
})
export default class StatChart extends Vue {
  @Prop() readonly dataset!: LevelUpResult

  chartOptions = {
    chart: {
      type: 'line'
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: this.getDatasetKeys
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  }
  series = [{
    name: 'End Result Count',
    data: this.getDatasetValues
  }];

  get getDatasetKeys(): Array<number> {
    const statKeysToNumbers = Object.keys(this.dataset.results).map(statString => parseInt(statString));
    const sortedStatKeys = _.sortBy(statKeysToNumbers);
    return sortedStatKeys;
  }

  get getDatasetValues(): Array<number> {
    const sortedStatKeys = this.getDatasetKeys;
    const sortedStatValues = [];
    for (let i = 0; i < sortedStatKeys.length; i++) {
      sortedStatValues.push(this.dataset.results[sortedStatKeys[i]]);
    }

    return sortedStatValues;
  }
}
</script>