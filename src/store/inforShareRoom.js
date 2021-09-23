const state = {
  inforShareRoom: null ,
}
const mutations = {
 inforShareRoom(state, inforShareRoom)  {
   state.inforShareRoom = inforShareRoom;
 }
}
const getters = {
  inforShareRoom(state) {
    return state.inforShareRoom;
  }
}
const actions = {
  inforShareRoom(context,inforShareRoom) {
    context.commit('inforShareRoom',inforShareRoom);
  }
}
export default {
  namespaced: true ,
  state,
  mutations,
  actions,
  getters
}

