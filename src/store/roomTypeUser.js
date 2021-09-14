import { api } from "boot/axios";

const state = {
  roomTypeUser: null,
};

const mutations = {
  roomTypeUser(state, roomTypeUser) {
    state.roomTypeUser = roomTypeUser;
  },
};

const getters = {
  roomTypeUser(state) {
    return state.roomTypeUser;
  },
};

const actions = {
  roomTypeUser(context) {
    api.get("getRoomTypeUser").then((response) => {
      context.commit("roomTypeUser", response.data.roomType);
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
