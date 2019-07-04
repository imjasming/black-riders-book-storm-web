import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import portal from './modules/portal'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    portal,
    app
  },
  getters
})

export default store
