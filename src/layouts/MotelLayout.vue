<template>
  <q-layout view="hHh LpR fFf">
    <q-header border class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link class="link logo" to="motel/all">
           Quản lý trọ</router-link
          >
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="motel/all" class="g-header" label="Trạng thái" />
        <q-route-tab to="motel/motelPost" class="g-header" label="Bài đăng" />
        <q-route-tab to="motel/config" class="g-header" label="Cấu hình" />
        <q-route-tab to="motel/noti" class="g-header" label="Thông báo" >
          <q-badge floating color="red" text-color="white" :label="notiNum " />
        </q-route-tab>
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
    >
      <!-- drawer content -->
      <motel-right-bar></motel-right-bar>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import MotelRightBar from "components/MotelRightBar";
import motelApi from "../boot/callApi/motel";
export default {
  setup() {
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  data(){
    let notiNum = 0 ;
     this.$api.get("countNoti")
     .then((res)=> {
       notiNum = res.data.num ;
     });

    return {
      notiNum,
    }
  },
  async created() {
    const user = await this.$api.get("user");
    // const motel = await this.$api.get("getMotelRoomType");
    const motel = await motelApi.getMotelRoomType(); 
    this.$store.dispatch("Motel/motel", motel.data);
    this.$store.dispatch("User/user", user.data.user);
    // this.$store.dispatch("RoomStatuses/roomStatuses");
  },
  components: {
    MotelRightBar,
  },
};
</script>

<style lang="sass" scoped>
.link
  text-decoration: none
  color: white
.logo
  margin-left: 5px
  margin-button: 10px
</style>
