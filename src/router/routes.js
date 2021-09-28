//layout
import MainLayout from 'layouts/MainLayout.vue'
import LRLayout from 'layouts/LRLayout.vue'
import MotelLayout from 'layouts/MotelLayout.vue'
import RoomLayout from 'layouts/RoomLayout.vue'
import SearchLayout from 'layouts/SearchLayout.vue'

//page
import Index from 'pages/Index.vue'
import Login from 'pages/Login.vue'
import UserRegister from 'pages/UserRegister.vue'
import MotelRegister from 'pages/MotelRegister.vue'
import MotelIndex from 'pages/MotelIndex.vue'
import Noti from 'pages/Noti.vue'
import RoomIndex from 'pages/RoomIndex.vue'
import RoomBills from 'pages/RoomBills.vue'
import MotelBill from 'pages/MotelBill.vue'
import MotelConfig from 'pages/MotelConfig.vue'
import RoomShare from 'pages/RoomShare.vue'
import DetailAccount from 'pages/DetailAccount.vue'
import SearchIndex from 'pages/SearchIndex.vue'
import SearchDetail from 'pages/SearchDetail.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index},
      { path: 'userNoti', component: Noti},
    ]
  },
  {
    path: '/',
    component: LRLayout,
    children: [
      {path:'login' , component: Login},
      {path:'userRegister',component: UserRegister},
      {path:'motelRegister',component: MotelRegister},
      {path: 'homeDetailAccount', component: DetailAccount},
    ]
  },
  {
    path: '/motel',
    component: MotelLayout,
    children: [
      {path: '/all', component: MotelIndex},
      {path: '/noti', component: Noti},
      {path: '/bill', component: MotelBill},
      {path: '/config', component: MotelConfig},
      {path: '/detailAccount', component: DetailAccount},
    ]
  },
  {
    path: '/search' ,
    component: SearchLayout,
    children: [
      {path: '/searchIndex' , component: SearchIndex},
      {path: '/searchDetail/:post_id', name:'searchDetail' , component: SearchDetail},
    ]
  },
  {
    path: '/room',
    component: RoomLayout,
    children: [
      {path: '/roomAll', component: RoomIndex},
      {path: '/roomNoti', component: Noti},
      {path: '/roomBills', component: RoomBills},
      {path: '/roomShare', component: RoomShare},
      {path: '/roomDetailAccount', component: DetailAccount},
    ]
  },
 // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
