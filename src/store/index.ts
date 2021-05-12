import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from '@/types'
import _ from 'lodash'

Vue.use(Vuex)

const initialState: RootState = {
  itemLevels: []
}

const state = _.cloneDeep(initialState);

export default new Vuex.Store({
  state: state,
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
