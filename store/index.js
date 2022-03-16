export const state = () => ({
  user: null,
})

// getter
export const getters = {
  isLoggedIn (state) {
    return !!state.user
  }
}

// setter
export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  login ({ commit }, user) {
    commit('setUser', { ...user })
  },
  logout ({ commit }) {
    commit('setUser', null)
  },
  setUser ({ commit }, user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setUser', user)
        resolve()
      }, 1000)
    })
  }
}
