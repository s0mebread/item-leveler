<template>
  <div class="p-grid p-flex-column p-ai-center">
    <card class="p-col-10 p-my-4">
      <template #content>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col stat-input">
            <label for="str">STR</label>
            <InputNumber id="str" v-model="item.stats.str" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="dex">DEX</label>
            <InputNumber id="dex" v-model="item.stats.dex" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="int">INT</label>
            <InputNumber id="int" v-model="item.stats.int" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="luk">LUK</label>
            <InputNumber id="luk" v-model="item.stats.luk" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="hp">HP</label>
            <InputNumber id="hp" v-model="item.stats.hp" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="mp">MP</label>
            <InputNumber id="mp" v-model="item.stats.mp" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="wa">WA</label>
            <InputNumber id="wa" v-model="item.stats.wa" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="ma">MA</label>
            <InputNumber id="ma" v-model="item.stats.ma" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="wdef">WDef</label>
            <InputNumber id="wdef" v-model="item.stats.wdef" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="mdef">MDef</label>
            <InputNumber id="mdef" v-model="item.stats.mdef" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="acc">Acc</label>
            <InputNumber id="acc" v-model="item.stats.acc" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="avoid">Avoid</label>
            <InputNumber id="avoid" v-model="item.stats.avoid" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="speed">Speed</label>
            <InputNumber id="speed" v-model="item.stats.speed" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-field p-col stat-input">
            <label for="jump">Jump</label>
            <InputNumber id="jump" v-model="item.stats.jump" :min="0" v-on:keyup.enter="onCalculateClick" />
          </div>
        </div>
        <div class="p-fluid p-grid p-jc-center">
          <div class="p-col p-field level-input">
            <label for="start-level">Start Level</label>
            <InputNumber id="start-level" v-model="startLevel" :min="1" :max="10" v-on:keyup.enter="onCalculateClick" />
          </div>
          <div class="p-col p-field level-input">
            <label for="start-level">End Level</label>
            <InputNumber id="end-level" v-model="endLevel" :min="2" :max="11" v-on:keyup.enter="onCalculateClick" />
          </div>
        </div>
        <div class="p-d-flex p-jc-center">
          <Button label="Calculate" class="p-button-raised" @click="onCalculateClick" />
        </div>
      </template>
    </card>


    <transition-group name="dynamic-box" tag="div" class="p-grid p-fluid p-col-12">
      <div v-for="(itemLevel, index) of itemLevels" :key="index" class="p-col">
        <div class="box">
          <item-level 
            :startLevel="startLevel"
            :previousItemLevel="itemLevels[index - 1]"
            :itemLevel="itemLevel"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import { Item, LevelUpResult, Stats } from '@/types'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import ItemLevel from './ItemLevel.vue'
import _ from 'lodash'

@Component({
  methods: {
    ...mapActions({
      calculateLevels: 'calculateLevels',
      calculateManyLevelUps: 'calculateManyLevelUps',
      resetItem: 'resetItem'
    })
  },
  computed: {
    ...mapState({
      itemLevels: 'itemLevels',
      levelUpResults: 'levelUpResults'
    })
  },
  components: {
    Button,
    Card,
    InputNumber,
    ItemLevel
  }
})
export default class ItemLeveler extends Vue {
  itemLevels!: Array<Item>;
  levelUpResults!: Array<LevelUpResult>;
  calculateLevels!: (
    payload: { item: Item, startLevel: number, endLevel: number }
  ) => Promise<void>;
  calculateManyLevelUps!: (
    payload: { item: Item, startLevel: number, endLevel: number }
  ) => Promise<void>;
  resetItem!: () => Promise<void>;

  item: Item = {
    level: 1,
    stats: {} as Stats,
    maxStats: {} as Stats,
    maxOfMaxStats: {} as Stats
  };
  startLevel: number | null = 1;
  endLevel: number | null = 7;
  
  onCalculateClick(): void {
    this.resetItem().then(() => {
      if (this.startLevel != null && this.endLevel != null) {
        this.item.level = this.startLevel;
        this.item.maxStats = this.item.stats;
        this.item.maxOfMaxStats = this.item.stats;

        this.calculateLevels({
          item: _.cloneDeep(this.item),
          startLevel: this.startLevel,
          endLevel: this.endLevel
        });

        // this.calculateManyLevelUps({
        //   item: _.cloneDeep(this.item),
        //   startLevel: this.startLevel,
        //   endLevel: this.endLevel
        // });
      }
    });
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