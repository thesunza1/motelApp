<template>
  <q-layout view="hHh LpR fFf">
    <q-header border class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link class="link logo" v-if="motel" to="motel/all">
           Quản lý trọ <p style="display:inline" class="g-header-up"> {{motel.name }} </p> </router-link
          >
        </q-toolbar-title>

        <!-- <q-space /> -->
        <home-search-rightbar class="gt-sm"></home-search-rightbar>
        <q-btn dense flat round icon="menu" class="lt-md" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab :to="{name:'all' , params: { motelId: motelId}}" class="g-header" label="Trạng thái" />
        <q-route-tab :to="{name:'motelPost' , params: { motelId: motelId}}"  class="g-header" label="Bài đăng" />
        <q-route-tab :to="{name:'config' , params: { motelId: motelId}}"  class="g-header" label="Cấu hình" />
        <q-route-tab :to="{name:'noti'}" class="g-header" label="Thông báo" >
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
import {mapGetters} from "vuex";
import HomeSearchRightbar from "../components/HomeSearchRightbar.vue";
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
  computed: {
    ...mapGetters('Motel',['motel']),
  },
  data(){
    let notiNum = 0 ;
    return {
      notiNum,
      motelId: this.$route.params.motelId,
    }
  },
  async created() {
    const user = await this.$api.get("user");
    const motel = await motelApi.getMotelRoomType(this.motelId);
    this.$store.dispatch("Motel/motel", motel.data);
    this.$store.dispatch("User/user", user.data.user);
    // this.$store.dispatch("RoomStatuses/roomStatuses");
  },
  components: {
    MotelRightBar,
    HomeSearchRightbar,
  },
  methods: {
    async updateNotiNum() {
      var notiNum = await this.$api.get("countNoti");
      if (notiNum.data.statusCode == 1) {
        if (this.notiNum != notiNum.data.num) {
          this.notiNum = notiNum.data.num;
        }
      }
      return;
    },
  },
  mounted: function () {
    window.setInterval(() => {
      this.updateNotiNum();
    }, 5000);
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
