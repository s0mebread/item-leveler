import Vue from 'vue'
import Vuex, { Commit } from 'vuex'
import { Item, RootState } from '@/types'
import _ from 'lodash'
import { levelUpItem } from '@/utils/leveler'

Vue.use(Vuex)

const initialState: RootState = {
  itemLevels: []
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
