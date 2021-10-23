<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link class="link logo" to="room/roomAll">
            Quản lý phòng
          </router-link>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab class="g-header" to="room/roomAll" label="Phòng" />
        <q-route-tab class="g-header"  to="room/roomShare" label="Trọ" />
        <q-route-tab  class="g-header" to="room/roomBills" label=" Hóa đơn" />
        <q-route-tab  class="g-header" to="room/roomNoti" label="Thông báo">
          <q-badge floating color="red" text-color="white" :label="notiNum" />
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
      <div class="row">
        <div class="col-12 row justify-center">
          <div class="col-12"><br /></div>
          <q-chip
            class="col-10"
            v-if="!user"
            icon="account_circle"
            label=" Bạn chưa đăng nhập"
          />
          <q-chip
            class="col-10"
            color="teal"
            text-color="white"
            v-else
            icon="account_circle"
            :label="user.name"
            @click="detailAccount"
            clickable
          />
          <q-chip
            class="col-10"
            color="orange"
            text-color="white"
            v-if="user"
            icon="done"
            label="Bạn là người trọ"
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
            class="g-header"
            label=" Đăng xuất "
            @click="logout"
          />
          <q-btn
            v-if="user"
            style="width: 100%; margin-top: 10px"
            color="orange"
            icon="refresh"
            class="g-header"
            label=" Tải lại "
            @click="reloadPage"
          />
          <q-btn
            style="width: 100%; margin-top: 10px"
            color="positive"
            icon="home"
            class="g-header"
            label=" Trang chủ"
            @click="$router.push('/')"
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
import { mapGetters } from "vuex";
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
  data() {
    return {
      notiNum : 0 ,
    };
  },
  async created() {
    const notiNum = await this.$api.get("countNoti");
    if (notiNum.data.statusCode == 1) {
      this.notiNum = notiNum.data.num;
    }
    const user = await this.$api.get("user");
    const tenant = await this.$api.get("getTenant");
    const infor = await this.$api.get("getInfoShareMotel");
    this.$store.dispatch(
      "InforShareRoom/inforShareRoom",
      infor.data.room_type_share
    );
    this.$store.dispatch("Tenant/tenant", tenant.data.tenant);
    this.$store.dispatch("User/user", user.data.user);
    this.$store.dispatch("RoomTypeUser/roomTypeUser");
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("key");
      location.reload();
    },
    reloadPage() {
      this.$router.go();
    },
    detailAccount() {
      this.$router.push("room/roomDetailAccount");
    },
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
