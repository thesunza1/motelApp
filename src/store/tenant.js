const state = {
  tenant: {}
}

const mutations = {
  tenant(state,tenant) {
    state.tenant =tenant;
  }
}

const getters  = {
  tenant(state) {
    return state.tenant ;
  }
}

const actions = {
  tenant(context,tenant) {
    context.commit('tenant', tenant);
  }
}

export default {
  namespaced : true ,
  state,
  mutations,
  getters,
  actions
}
