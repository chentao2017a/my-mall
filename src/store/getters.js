const getters = {
  cartList(state) {
    return state.carList
  },
  cartCount(state) {
    return state.carList.length
  }
}

export default getters



