<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
            <!-- <img :src="'/icons/favicon-96x96.png'" /> -->
          </q-avatar>
          <router-link
            :to="{ name: 'searchIndex' }"
            class="text-white"
            style="text-decoration: none"
          >
            Tìm trọ</router-link
          >
        </q-toolbar-title>
        <q-space />
        <home-search-rightbar></home-search-rightbar>
      </q-toolbar>
      <div class="row justify-center full-width"></div>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
      <!-- drawer content -->
      <div class="row">
        <div class="col-12 row justify-center">
          <div class="col-12"><br /></div>
          <q-chip
            class="col-10"
            v-if="!user"
            icon="account_circle"
            label="Bạn chưa đăng nhập"
          />
          <q-chip
            class="col-10 g-header-up"
            color="teal"
            text-color="white"
            v-else
            icon="account_circle"
            :label="` ${user.name} `"
          />
          <q-chip
            class="col-10"
            color="orange"
            text-color="white"
            v-if="user"
            icon="done"
            :label="get_role()"
          />
          <q-btn
            color="primary"
            label="Tài khoản"
            class="g-header"
            @click="detail()"
          />
          <div class="col-12"><br /></div>
        </div>
      </div>
      <div class="row items-end justify-center" style="height: 78%">
        <div class="col-10">
          <div v-for="(link, index) in links" :key="index">
            <main-leftbar :link="link"></main-leftbar>
          </div>
          <q-btn
            v-if="user"
            class="g-header"
            style="width: 100%; margin-top: 10px"
            color="primary"
            icon="logout"
            label=" Đăng xuất "
            @click="logout"
          />
          <q-btn
            v-if="user"
            style="width: 100%; margin-top: 10px"
            color="orange"
            icon="refresh"
            label=" Tải lại "
            class="g-header"
            @click="reloadPage"
          />
          <q-btn
            v-if="user"
            color="positive"
            icon="home"
            class="g-header"
            label=" Trang chủ"
            @click="toHome"
            style="width: 100%; margin-top: 10px"
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
import MainLeftbar from "./MainLeftbar.vue";
import HomeSearchRightbar from "../components/HomeSearchRightbar.vue";
import { mapGetters } from "vuex";
import sp from "../boot/support";
export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const loginModal = ref(false);
    const loginModalMotel = ref(false);

    return {
      rightDrawerOpen,
      loginModal,
      loginModalMotel,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  async created() {
    try {
      var notiNum = await this.$api.get("countNoti");
      if (notiNum.data.statusCode == 1) {
        this.notiNum = notiNum.data.num;
      }
      const response = await this.$api.get("user");
      this.$store.dispatch("User/user", response.data.user);
    } catch (e) {
      if (this.user?.id > 0) {
        this.$router.go();
      }
    }
    const user = this.$store.state.User.user;
    this.role_id = user.role_id;
  },

  components: {
    // MainLeftbar,
    HomeSearchRightbar,
  },
  data() {
    return {
      email: "",
      password: "",
      role_id: null,
      notiNum: 0,
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    detail() {
      this.$router.push("/homeDetailAccount");
    },
    logout() {
      localStorage.removeItem("key");
      location.reload();
    },
    get_role() {
      return sp.getRole(this.role_id);
    },
    reloadPage() {
      this.$router.go();
    },
    toHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped lang="sass">
.nav
  height: 50px
  padding-bottom: 5px
  justify-content: center
  div
    display: flex
    align-items: center
    justify-content: center
    background: $light-blue-10
    border-radius: 5px
    box-shadow: 0px 0px 10px $blue-14
    margin-left: 5px
    > a
      font-size: 1.5em
      text-decoration: none
      color: white
  div:last-child
    margin-right: 5px
@media (max-width: 700px)
  .q-card
    width: 100%
@media (min-width: 701px )
  .q-card
    width: 700px
.lr
  text-decoration: none
  border-radius: 5px
  padding: 10px 30px
  margin-left: 5px
  box-shadow: 0px 0px 5px #f3f3f3

.rg
  background-color: $secondary
  margin-right: 10px
  color: white
.lgs
  background-color: $info
  color: white
</style>
