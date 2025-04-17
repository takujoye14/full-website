import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token')
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem('token', token)
      commit('login')
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  }
})

export default store
