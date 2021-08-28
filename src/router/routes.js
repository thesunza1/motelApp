//layout
import MainLayout from 'layouts/MainLayout.vue'
import LRLayout from 'layouts/LRLayout.vue'

//page
import Index from 'pages/Index.vue'
import Login from 'pages/Login.vue'
import UserRegister from 'pages/UserRegister.vue'
import MotelRegister from 'pages/MotelRegister.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index}
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
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
