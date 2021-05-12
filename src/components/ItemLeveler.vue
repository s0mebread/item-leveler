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
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Item } from '@/typings'

@Component({
  computed: {
    ...mapState({
      item: 'item'
    })
  }
})
export default class ItemLeveler extends Vue {
  item!: Item;
  mainStats = ['STR', 'DEX', 'INT', 'LUK'];
  otherStats = ['HP', 'MP', 'WA', 'MA', 'WDEF', 'MDEF', 'ACC', 'AVOID', 'SPEED', 'JUMP'];

  get allStats(): Array<string> {
    return this.mainStats.concat(this.otherStats);
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