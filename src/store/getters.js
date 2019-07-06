const getters = {
  isLoading: state => state.app.isLoading,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  trainerList: state => state.user.trainerList,
  marketing: state => state.portal.marketing,
  categoryList: state => state.portal.categoryList,
  indexContents: state => state.portal.indexContents,
  goodsList: state => state.portal.goodsList,
  adsItems: state => state.portal.adsItems,
  bookId: state => state.book.bookId,
  bookInfo: state => state.book.bookInfo,
  storeInfo: state => state.book.storeInfo,
  comments: state => state.book.comments,
}

export default getters
