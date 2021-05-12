<template>
  <div class="stat-input">
    <table>
      <tr>
        <th
          v-for="(stat, index) in allStats"
          :key="index"
        >
          {{ stat }}
        </th>
      </tr>
      <tr>
        <td>
          <InputNumber @input="onStatInput(PrimaryStatTypeEnum.str, $event)" :min="0" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Item, Stats, PrimaryStatTypeEnum } from '@/typings'
import InputNumber from 'primevue/inputnumber';

@Component({
  components: {
    InputNumber
  }
})
export default class ItemLeveler extends Vue {
  PrimaryStatTypeEnum = PrimaryStatTypeEnum;
  item: Item = {
    stats: {} as Stats,
    level: 1
  };
  mainStats = ['STR', 'DEX', 'INT', 'LUK'];
  otherStats = ['HP', 'MP', 'WA', 'MA', 'WDEF', 'MDEF', 'ACC', 'AVOID', 'SPEED', 'JUMP'];

  get allStats(): Array<string> {
    return this.mainStats.concat(this.otherStats);
  }

  onStatInput(type: string, value: number): void {
    console.log('type: ', type);
    console.log('value: ', value);
  }
}
</script>

<style lang="scss">
.stat-input {
  display: flex;

  table {
    table-layout: fixed;
    width: 100%;

    td > input {
      width: 100%;
    }
  }
}
</style>