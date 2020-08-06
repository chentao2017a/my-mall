import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carList: []
  },
  mutations: {
    addCart(state, payload) {
      let oldProduct = null
      for (let item of state.carList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        payload.checked = true
        state.carList.push(payload)
      }
    }
  },
  actions: {},
  modules: {},
  getters
})
