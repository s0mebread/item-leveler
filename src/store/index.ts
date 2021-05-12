import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from '@/typings'
import _ from 'lodash'

Vue.use(Vuex)

const initialState: RootState = {
  itemLevels: []
}

const state = _.clone(initialState);

export default new Vuex.Store({
  state: state,
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
