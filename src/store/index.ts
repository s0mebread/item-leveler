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
    let leveledUpItem: Item;
    for (let i = payload.startLevel; i < payload.endLevel; i++) {
      leveledUpItem = levelUpItem(payload.item);
      commit('addItemLevel', leveledUpItem);
    }
  }
}

const mutations = {
  addItemLevel(state: RootState, payload: Item) {
    state.itemLevels.push(payload);
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
