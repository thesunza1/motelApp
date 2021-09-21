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
        <q-route-tab to="room/roomBills" label="bills" />
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
      <div class="row">
        <div class="col-12 row justify-center">
          <div class="col-12"><br /></div>
          <q-chip
            class="col-10"
            v-if="!user"
            icon="account_circle"
            label=" bạn chưa đăng nhập"
          />
          <q-chip
            class="col-10"
            color="teal"
            text-color="white"
            v-else
            icon="account_circle"
            :label="user.name"
          />
          <q-chip
            class="col-10"
            color="orange"
            text-color="white"
            v-if="user"
            icon="done"
            label="bạn là người trọ"
          />
          <div class="col-12"><br /></div>
        </div>
      </div>
      <div class="row items-end justify-center" style="height: 78%">
        <div class="col-10">
         <q-btn
            v-if="user"
            style="width: 100%; margin-top: 10px"
            color="primary"
            icon="logout"
            label=" đăng xuất "
            @click="logout"
          />
          <q-btn
            v-if="user"
            style="width: 100%; margin-top: 10px"
            color="orange"
            icon="refresh"
            label=" tải lại "
            @click="reloadPage"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters('User',['user']),
  },
  methods: {
    logout() {
      localStorage.removeItem("key");
      location.reload();
    },
    reloadPage() {
      this.$router.go();
    },
  }
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
