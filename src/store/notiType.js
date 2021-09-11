const state = {
  notiType: null ,
}
const mutations = {
 notiType(state, notiType)  {
   state.notiType = notiType;
 }
}
const getters = {
  notiType(state) {
    return state.notiType;
  }
}
const actions = {
  notiType(context,notiType) {
    context.commit('notiType',notiType);
  }
}
export default {
  namespaced: true ,
  state,
  mutations,
  actions,
  getters
}

