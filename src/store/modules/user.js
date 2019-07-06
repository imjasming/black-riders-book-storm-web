import {getToken, setToken, removeToken} from '@/utils/auth'
import {clearStore, getStore, setStore} from '@/utils/localStorage'
import request, {fetch, post, put} from '@/utils/request'

const user = {
  state: {
    username: getStore('username'),
    token: getToken(),
    userInfo: getStore('userInfo'),
    shoppingCartList: getStore('shoppingCart')
  },

  mutations: {
    ADD_SHOPPING_CART: (state, data) => {
      const item = {
        bookId: data.bookId,
        count: data.count,
        img: data.img,
        price: data.price,
        title: data.title
      };
      state.shoppingCartList.push(item);
      //state.newShoppingCart = data;
    },
    SET_SHOPPING_CART_LIST: (state, list) => {
      state.shoppingCartList = list
      setStore('shoppingCart', list)
    },
    ADD_SHOPPING_CART_LIST: (state, list) => {
      state.shoppingCartList = state.shoppingCartList.concat(list)
      setStore('shoppingCart', state.shoppingCartList)
    },
    ADD_SHOPPING_CART_ITEM: (state, item) => {
      state.shoppingCartList.push(item)
      setStore('shoppingCart', state.shoppingCartList)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      setStore('username', state.username)
    },
    SET_INFO: (state, info) => {
      state.userInfo = info
      setStore('userInfo', info)
      state.username = state.userInfo.username
    },
  },

  actions: {
    setShoppingCartList({commit}, list) {
      return new Promise((resolve, reject) => {
        commit('SET_SHOPPING_CART_LIST', list);
      });
    },
    addShoppingCart({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('ADD_SHOPPING_CART', data);
      });
    },
    loadShoppingCart({commit, state}) {
      return new Promise((resolve, reject) => {
        request.get(`/user/${state.username}/shoppingCart`).then(response => {
          commit('SET_SHOPPING_CART_LIST', response.data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addShoppingCartItem({commit, state}, item) {
      return new Promise((resolve, reject) => {
        request.put(`/user/${state.username}/shoppingCart`, item).then(response => {
          commit('SET_SHOPPING_CART_LIST', response.data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    initAccessToken({commit}, param) {
      const token = `${param.tokenType} ${param.token}`
      commit('SET_TOKEN', token)
      commit('SET_USERNAME', param.username)
    },

    login({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        const username = loginForm.username
        const password = loginForm.password
        request({
          url: `/user/login?username=${username}&password=${password}`,
          method: 'post',
          data: {
            'username': username,
            'password': password,
            'grant_type': 'password',
            'scope': 'all'
          },
          auth: {
            username: 'client', password: 'secret'
          }
        }).then(response => {
          const data = response.data
          const token = `${data.tokenType} ${data.value}`
          commit('SET_TOKEN', token)
          commit('SET_USERNAME', username)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    register({commit}, registerForm) {
      return new Promise((resolve, reject) => {
        const username = registerForm.username
        const email = registerForm.email
        const password = registerForm.password

        request({
          url: '/register',
          method: 'post',
          data: {
            username,
            email,
            password
          }
        }).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        //clear token
        commit('SET_TOKEN', '')
        removeToken()
        clearStore()
        resolve()
      })
    },
    initUserData({commit, state}) {
      const username = state.username
      request.get(`/user/${username}/info`).then(data => {
        commit('SET_INFO', data)
      }).catch(error => {

      })
    },
    getInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        const username = state.userInfo.username
        request({
          url: '/user/' + username + '/info',
          method: 'get'
        }).then(response => {
          const data = response.data
          commit('SET_INFO', data)
          //commit('SET_TRAINER_LIST', data.trainers)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUserProfile({commit, state}, profileForm) {
      return new Promise((resolve, reject) => {
        const email = profileForm.email
        const username = state.userInfo.username
        put({
          url: '/user/' + username + '/profile',
          data: {
            email
          }
        }).then(response => {
          const data = response.data
          commit('SET_INFO', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
