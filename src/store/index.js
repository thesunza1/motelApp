import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import User from './user'
import Motel from './motel'
import NotiType from './notiType'
import RoomStatuses from './roomStatuses'
import Tenant from './tenant'
import RoomTypeUser from './roomTypeUser'
import InforShareRoom from './inforShareRoom'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      User,
      Motel,
      NotiType,
      RoomStatuses,
      Tenant,
      RoomTypeUser,
      InforShareRoom,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
