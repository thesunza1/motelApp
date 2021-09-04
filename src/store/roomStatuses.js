import { api } from "boot/axios";

const state = {
  roomStatuses: {},
};

const mutations = {
  roomStatuses(state, roomStatuses) {
    state.roomStatuses = roomStatuses;
  },
};

const getters = {
  roomStatuses(state) {
    return state.roomStatuses;
  },
};

const actions = {
  roomStatuses(context) {
    api.get("roomStatuses").then((response) => {
      context.commit("roomStatuses", response.data.data);
    });
  },
};

export default {
  namespaced: true ,
  state ,
  mutations,
  actions,
  getters
}
