export const state = () => ({
  user: null,
  selectedValue: {}
})

// getter
export const getters = {
  isLoggedIn (state) {
    return !!state.user
  },
  getSelectedValue () {
    return state.selectedValue
  }
}

// setter
export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setSelectedValue (state, data) {
    state.selectedValue[data.id] = data.value
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
  },
  setSelectedValue ({ commit }, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setSelectedValue', data)
        resolve()
      }, 1000)
    })
  }
}
