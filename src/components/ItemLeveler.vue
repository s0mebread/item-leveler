<template>
  <div class="stat-input">
    <!-- <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col">
        <label for="str">STR</label>
        <InputNumber id="str" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="dex">DEX</label>
        <InputNumber id="dex" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="int">INT</label>
        <InputNumber id="int" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="luk">LUK</label>
        <InputNumber id="luk" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="hp">HP</label>
        <InputNumber id="hp" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="mp">MP</label>
        <InputNumber id="mp" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="wa">WA</label>
        <InputNumber id="wa" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="ma">MA</label>
        <InputNumber id="ma" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="wdef">WDef</label>
        <InputNumber id="wdef" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="mdef">MDef</label>
        <InputNumber id="mdef" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="acc">Accuracy</label>
        <InputNumber id="acc" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="avoid">Avoidability</label>
        <InputNumber id="avoid" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="speed">Speed</label>
        <InputNumber id="speed" :min="0" />
      </div>
      <div class="p-field p-col">
        <label for="jump">Jump</label>
        <InputNumber id="jump" :min="0" />
      </div>
    </div> -->

    <!-- <div class="p-field p-grid">
      <label for="str" class="p-col-fixed" style="width:100px">STR</label>
      <div class="p-col">
        <InputNumber id="str" :min="0" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="dex" class="p-col-fixed" style="width:100px">DEX</label>
      <div class="p-col">
        <InputNumber id="dex" :min="0" />
      </div>
    </div> -->


  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Item, Stats, StatType } from '@/types'
import InputNumber from 'primevue/inputnumber';

@Component({
  components: {
    InputNumber
  }
})
export default class ItemLeveler extends Vue {
  StatType = StatType; // to use in vue template
  item: Item = {
    stats: {} as Stats,
    level: 1
  };

  onStatInput(type: string, value: number): void {
    console.log('type: ', type);
    console.log('value: ', value);
  }
}
</script>

<style lang="scss">
</style>