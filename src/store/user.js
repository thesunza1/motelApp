const state = {
  user: null
}

const mutations = {
  user(state,user) {
    state.user = user;
  }
}
const getters = {
  user(state) {
    return state.user ;
  }
}
const actions = {
  user(context,user){
    context.commit('user',user)
  }
}

export default {
  namespaced : true ,
  state,
  mutations,
  getters,
  actions
}
