import {getToken, setToken, removeToken} from '@/utils/auth'
import {clearStore, getStore, setStore} from '@/utils/localStorage'
import axios, {fetch, post, put} from '@/utils/axios'
import {Message} from 'element-ui'

const user = {
  state: {
    username: getStore('username'),
    token: getToken(),
    userInfo: getStore('userInfo'),
    trainerList: getStore('trainerList'),
  },

  mutations: {
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
    SET_TRAINER_LIST: (state, list) => {
      state.trainerList = list
      setStore('trainerList', list)
    },

  },

  actions: {
    initAccessToken ({commit}, param) {
      const token = `${param.tokenType} ${param.token}`
      commit('SET_TOKEN', token)
      commit('SET_USERNAME', param.username)
    },

    login ({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        const username = loginForm.username
        const password = loginForm.password
        axios({
          url: `/auth/form/token?username=${username}&password=${password}`,
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
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    socialBind ({commit}, registerForm) {
      return new Promise((resolve, reject) => {
        const username = registerForm.username
        const email = registerForm.email
        const password = registerForm.password
        const key = registerForm.key
        axios({
          url: '/social/bind',
          method: 'post',
          data: {
            username, email, password, key
          }
        }).then(data => {
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    register ({commit}, registerForm) {
      return new Promise((resolve, reject) => {
        const username = registerForm.username
        const email = registerForm.email
        const password = registerForm.password

        axios({
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

    logout ({commit, state}) {
      return new Promise((resolve, reject) => {
        //clear token
        commit('SET_TOKEN', '')
        removeToken()
        clearStore()
        resolve()
      })
    },
    initUserData ({commit, state}) {
      const username = state.username
      fetch(`/user/${username}/info`).then(data => {
        commit('SET_INFO', data)
      }).catch(error => {

      })
      fetch(`/user/${username}/trainers`).then(data => {
        commit('SET_TRAINER_LIST', data)
      }).catch(error => {

      })
    },
    getInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        const username = state.userInfo.username
        axios({
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
    getMyTrainerList ({commit, state}) {
      return new Promise((resolve, reject) => {
        const username = state.userInfo.username
        axios({
          url: '/user/' + username + '/trainers',
          method: 'get'
        }).then(response => {
          const data = response.data
          commit('SET_TRAINER_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUserProfile ({commit, state}, profileForm) {
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
    },
    addTrainer ({commit, state}, trainerId) {
      const username = state.userInfo.username
      return post('/user/' + username + '/trainer' + '?trainerId=' + trainerId).then(data => {
        if (data) {
          commit('SET_TRAINER_LIST', data)
        }
      }).catch(error => {
        Message({
          message: 'add failure',
          type: 'error',
          duration: 6 * 1000
        })
      })
    }
  }
}

export default user
