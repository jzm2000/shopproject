/*基于state的getter计算属性的对象 */
export default {
  totalCount(state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
  totolPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count * food.price
    }, 0)
  },
}