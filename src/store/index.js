import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 创建用来存储用户信息,获取本地数据
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  getters: {
  },
  mutations: {
    // 存储用户信息，并转换成对象
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 再将用户数据存储到本地中
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
