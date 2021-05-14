import Vue from 'vue'
import Vuex, { Commit } from 'vuex'
import { Item, LevelUpResult, RootState } from '@/types'
import _ from 'lodash'
import { levelUpItem, simulateManyLevels } from '@/utils/leveler'

Vue.use(Vuex)

const initialState: RootState = {
  itemLevels: [],
  levelUpResults: []
}

const state = _.cloneDeep(initialState);

const actions = {
  calculateLevels(
    { commit }: { commit: Commit }, 
    payload: { item: Item, startLevel: number, endLevel: number }
  ): void {
    commit('addItemLevel', payload.item);
    let leveledUpItem: Item = payload.item;
    for (let i = payload.startLevel; i < payload.endLevel; i++) {
      leveledUpItem = levelUpItem(leveledUpItem);
      commit('addItemLevel', leveledUpItem);
    }
  },

  calculateManyLevelUps(
    { commit }: { commit: Commit }, 
    payload: { item: Item, startLevel: number, endLevel: number }
  ): void {
    const dataset = simulateManyLevels(payload.item, payload.endLevel - payload.startLevel, 100000);

    commit('addLevelUpResults', dataset);
  },

  resetItem({ commit }: { commit: Commit }): Promise<void> {
    return new Promise((resolve, _reject) => {
      commit('resetItem');
      resolve();
    });
  }
}

const mutations = {
  addItemLevel(state: RootState, payload: Item) {
    state.itemLevels.push(payload);
  },

  addLevelUpResults(state: RootState, payload: Array<LevelUpResult>) {
    Vue.set(state, 'levelUpResults', payload);
  },

  resetItem(state: RootState) {
    Object.assign(state, _.cloneDeep(initialState));
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
