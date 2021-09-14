<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link class="link logo" to="room/roomAll">
            room manager</router-link
          >
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="room/roomAll" label="phòng" />
        <q-route-tab to="room/roomNoti" label="thông báo" >
          <q-badge floating color="red" text-color="white" :label="notiNum " />
        </q-route-tab>
        <q-route-tab to="/page2" label="Page Two" />
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
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
    //  this.$api.get("countNoti")
    //  .then((res)=> {
    //    notiNum = res.data.num ;
    //  });
    return {
      notiNum,
    }
  },
  async created() {
    const user = await this.$api.get("user");
    const tenant = await this.$api.get('getTenant');
    this.$store.dispatch("Tenant/tenant",tenant.data.tenant);
    this.$store.dispatch("User/user", user.data.user);
    this.$store.dispatch("RoomTypeUser/roomTypeUser");
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
