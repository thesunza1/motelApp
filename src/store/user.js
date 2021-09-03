// import { api } from "boot/axios";
const state = {
  user: "",
};

const mutations = {
  user(state, user) {
    state.user = user;
  },
};
const getters = {
  user(state) {
    return state.user;
  },
  // getRoleId(state){
  //   return state.user.role_id ;
  // }
};
const actions = {
  user(context,user){
    context.commit('user',user)
  }
}
// const actions = {
//   user(context) {
//     api.get("user").then((response) => {
//       context.commit("user",response.data.user);
//     });
//   },
// };
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
