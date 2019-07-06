const app = {
  state: {
    isLoading: false
  },
  mutations: {
    SET_IS_LOADING: ({state}, loading) => {
      state.isLoading = loading
    }
  },
  actions: {
    setIsLoading({commit}, loading) {
      commit('SET_IS_LOADING', loading)
    }
  }
}
