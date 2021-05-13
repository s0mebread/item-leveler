<template>
  <div>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col stat-input">
        <label for="str">STR</label>
        <InputNumber id="str" v-model="item.stats.str" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="dex">DEX</label>
        <InputNumber id="dex" v-model="item.stats.dex" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="int">INT</label>
        <InputNumber id="int" v-model="item.stats.int" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="luk">LUK</label>
        <InputNumber id="luk" v-model="item.stats.luk" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="hp">HP</label>
        <InputNumber id="hp" v-model="item.stats.hp" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="mp">MP</label>
        <InputNumber id="mp" v-model="item.stats.mp" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="wa">WA</label>
        <InputNumber id="wa" v-model="item.stats.wa" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="ma">MA</label>
        <InputNumber id="ma" v-model="item.stats.ma" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="wdef">WDef</label>
        <InputNumber id="wdef" v-model="item.stats.wdef" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="mdef">MDef</label>
        <InputNumber id="mdef" v-model="item.stats.mdef" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="acc">Acc</label>
        <InputNumber id="acc" v-model="item.stats.acc" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="avoid">Avoid</label>
        <InputNumber id="avoid" v-model="item.stats.avoid" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="speed">Speed</label>
        <InputNumber id="speed" v-model="item.stats.speed" :min="0" />
      </div>
      <div class="p-field p-col stat-input">
        <label for="jump">Jump</label>
        <InputNumber id="jump" v-model="item.stats.jump" :min="0" />
      </div>
    </div>
    <div class="p-fluid p-grid p-jc-center">
      <div class="p-col p-field level-input">
        <label for="start-level">Start Level</label>
        <InputNumber id="start-level" v-model="startLevel" :min="0" />
      </div>
      <div class="p-col p-field level-input">
        <label for="start-level">End Level</label>
        <InputNumber id="end-level" v-model="endLevel" :min="0" :max="11" />
      </div>
    </div>
    <div class="p-d-flex p-jc-center">
      <Button label="Calculate" class="p-button-raised" @click="onCalculateClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { Item, Stats } from '@/types'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'

@Component({
  methods: {
    ...mapActions({
      calculateLevels: 'calculateLevels'
    })
  },
  components: {
    Button,
    InputNumber
  }
})
export default class ItemLeveler extends Vue {
  item: Item = {
    level: 1,
    stats: {} as Stats,
    maxStats: {} as Stats
  };
  startLevel: number | null = null;
  endLevel: number | null = null;

  calculateLevels!: (
    payload: {item: Item, startLevel: number, endLevel: number }
  ) => Promise<void>;
  
  onCalculateClick(): void {
    if (this.startLevel != null && this.endLevel != null) {
      this.item.level = this.startLevel;
      this.item.maxStats = this.item.stats;

      this.calculateLevels({
        item: this.item,
        startLevel: this.startLevel,
        endLevel: this.endLevel
      });
    }
  }
}
</script>

<style lang="scss">
.stat-input {
  width: 50px;
}
.level-input {
  flex-grow: 0 !important;
  width: 100px;
}
</style>