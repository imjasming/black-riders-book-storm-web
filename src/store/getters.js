const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  trainerList: state => state.user.trainerList,
  marketing: state => state.portal.marketing,
  categoryList: state => state.portal.categoryList,
  indexContents: state => state.portal.indexContents
}

export default getters
