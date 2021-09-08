//layout
import MainLayout from 'layouts/MainLayout.vue'
import LRLayout from 'layouts/LRLayout.vue'
import MotelLayout from 'layouts/MotelLayout.vue'

//page
import Index from 'pages/Index.vue'
import Login from 'pages/Login.vue'
import UserRegister from 'pages/UserRegister.vue'
import MotelRegister from 'pages/MotelRegister.vue'
import MotelIndex from 'pages/MotelIndex.vue'
import Noti from 'pages/Noti.vue'


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
      {path:'motelRegister',component: MotelRegister}
    ]
  },
  {
    path: '/motel',
    component: MotelLayout,
    children: [
      {path: '/all', component: MotelIndex},
      {path: '/noti', component: Noti},


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
