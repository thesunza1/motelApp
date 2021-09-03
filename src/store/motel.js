const state = {
  motel: {}
}

const mutations = {
  motel(state,motel) {
    state.motel =motel;
  }
}

const getters  = {
  motel(state) {
    return state.motel ;
  }
}

const actions = {
  motel(context,motel) {
    context.commit('motel', motel);
  }
}

export default {
  namespaced : true ,
  state,
  mutations,
  getters,
  actions
}
