//layout
import MainLayout from "layouts/MainLayout.vue";
import LRLayout from "layouts/LRLayout.vue";
import MotelLayout from "layouts/MotelLayout.vue";
import RoomLayout from "layouts/RoomLayout.vue";
import MotelRoomLayout from "layouts/MotelRoomLayout.vue";
import SearchLayout from "layouts/SearchLayout.vue";
import AdminLayout from "layouts/AdminLayout.vue";

//page
import Index from "pages/Index.vue";
import Login from "pages/Login.vue";
import UserRegister from "pages/UserRegister.vue";
import MotelRegister from "pages/MotelRegister.vue";
import MotelRegisterOne from "pages/MotelRegisterOne.vue";
import MotelIndex from "pages/MotelIndex.vue";
import Noti from "pages/Noti.vue";
import RoomIndex from "pages/RoomIndex.vue";
import RoomBills from "pages/RoomBills.vue";
import MotelBill from "pages/MotelBill.vue";
import MotelConfig from "pages/MotelConfig.vue";
import ChoseMotel from "pages/ChoseMotel.vue" ;
import MotelPost from "pages/MotelPost.vue";
import MotelRoomDetail from "pages/MotelRoomDetail.vue";
import RoomShare from "pages/RoomShare.vue";
import DetailAccount from "pages/DetailAccount.vue";
import SearchIndex from "pages/SearchIndex.vue";
import SearchDetail from "pages/SearchDetail.vue";
import NotiOutbox from "pages/NotiOutbox.vue";
import AdminUser from "pages/AdminUser.vue";
import AdminMotel from "pages/AdminMotel.vue";
import AdminThisMotel from "pages/AdminThisMotel.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Index },
      { path: "userNoti", name:'userNoti' ,  component: Noti },
      { path: "userOutbox", name:'userOutbox' , component: NotiOutbox },
      { path: "choseMotel", name: 'choseMotel' , component: ChoseMotel },
    ],
  },
  {
    path: "/",
    component: LRLayout,
    children: [
      { path: "login", component: Login },
      { path: "userRegister", component: UserRegister },
      { path: "motelRegister", component: MotelRegister },
      { path: "homeDetailAccount",  component: DetailAccount },
      { path: "motelRegisterOne", name: "motelRegisterOne", component: MotelRegisterOne },
    ],
  },
  {
    path: "/motel",
    component: MotelLayout,
    props: true ,
    children: [
      { path: "/all/:motelId",props:true , name: "all", component: MotelIndex },
      { path: "/noti",props:true , name: "noti", component: Noti },
      { path: "/bill/:motelId",props:true , name: "bill", component: MotelBill },
      { path: "/config/:motelId",props:true , name: "config", component: MotelConfig },
      { path: "/detailAccount", name: "detailAccount", component: DetailAccount },
      { path: "/motelOutbox", name: "motelOutbox", component: NotiOutbox },
      { path: "/motelPost/:motelId",props:true, name: "motelPost", component: MotelPost },
    ],
  },
  {
    path: "/MotelRoom/:roomId",
    component: MotelRoomLayout,
    children: [
      {path: "" ,name : "motelRoomDetail" , component: MotelRoomDetail} ,
    ],
  },
  {
    path: "/search",
    component: SearchLayout,
    children: [
      { path: "/searchIndex", name: "searchIndex", component: SearchIndex },
      {
        path: "/searchDetail/:post_id",
        name: "searchDetail",
        component: SearchDetail,
      },
    ],
  },
  {
    path: "/room",
    component: RoomLayout,
    children: [
      { path: "/roomAll", component: RoomIndex },
      { path: "/roomNoti", component: Noti },
      { path: "/roomBills", component: RoomBills },
      { path: "/roomShare", component: RoomShare },
      { path: "/roomDetailAccount", component: DetailAccount },
      { path: "/roomOutbox", component: NotiOutbox },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "/adminNoti", component: Noti },
      { path: "/adminOutBox", component: NotiOutbox },
      { path: "/adminUser", component: AdminUser },
      { path: "/adminMotel", component: AdminMotel },
      {
        path: "/adminThisMotel/:motelId",
        name: "adminThisMotel",
        component: AdminThisMotel,
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
