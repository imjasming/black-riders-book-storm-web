const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  trainerList: state => state.user.trainerList
}

export default getters
