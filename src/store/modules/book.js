import {setStore} from "@/utils/localStorage";
import axios from "@/utils/axios";

const book = {
  state: {
    bookInfo: {
      id: '',
      bookImg: [
        '',
      ],
      title: '',
      bookName: '',
      outline: '',
      detail: '',
      authors: [],
      press: '',
      publishDate: '',
      version: '',
      isbn: '',
      price: 0,
      pages: 0,
      catalog: '',
      marketPrice: 0,
      dealMount: 0, // 交易数量
      lookMount: 0, // 查看数量
      discount: 0, // 优惠
      storeMount: 0, // 库存
      storeTime: '', // 库存日期
      packStyle: '', //包装类型
      description: '',
      content: '',
      remarksNum: 0, // 评论数
    },
    storeInfo: {
      storeId: 0,
      phoneNumber: '',
      storeName: '',
      created: '',
      updated: '',
      storePosition: ''
    },
    comments: [
      {
        commentId: 0,
        userId: 0,
        username: '',
        date: '',
        content: '',
        flag: ''
      }
    ]
  },
  mutations: {
    SET_BOOK_INFO: (state, info) => {
      state.bookInfo = info
      setStore('bookInfo', info)
    },
    SET_STORE_INFO: (state, info) => {
      state.storeInfo = info
      setStore('storeInfo', info)
    },
    SET_COMMENTS: (state, list) => {
      state.comments = list
      setStore('comments', list)
    }
  },
  actions: {
    loadBookInfo({commit}, bookId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/bookInfo?id=${bookId}`,
          method: 'get'
        }).then(response => {
          commit('SET_BOOK_INFO', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    loadStoreInfo({commit}, storeId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/store?id=${storeId}`,
          method: 'get'
        }).then(response => {
          commit('SET_STORE_INFO', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    loadBookComments({commit}, bookId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/comment/book?bookId=${bookId}`,
          method: 'get'
        }).then(response => {
          commit('SET_COMMENTS', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default book
