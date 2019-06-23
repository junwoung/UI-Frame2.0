//  引入vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: '',
    config: {}
  },
  mutations: {
    setName (state, user) {
      state.name = user.name
    },
    setConfig (state, config) {
      console.log(config)
      state.config = config
    }
  },
  actions: {}
})

export default store
