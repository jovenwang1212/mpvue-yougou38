import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 购物车数据
    cart: wx.getStorageSync('cart')
  },
  mutations: {
    // 把内存里面的购物车存到文件系统里面
    save (state) {
      wx.setStorageSync('cart', state.cart)
    },
    // 添加购物车
    add2Cart (state, payload) {
      let goodsId = payload
      // 取
      let cart = state.cart
      // 改
      if (cart[goodsId]) {
        // 后续添加
        cart[goodsId] = {
          num: cart[goodsId].num + 1,
          checked: true
        }
      } else {
        // 初次添加
        cart[goodsId] = {
          num: 1,
          checked: true
        }
      }
      wx.showToast({
        title: '添加购物车成功'
      })
    }
  },
  plugins: [createLogger()]
})

export default store
