<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-info text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link to="/" class="text-white">Tmq-motel</router-link>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      <div class="row justify-center">
        <div class="col-12 col-md-8 row justify-center nav">
          <div class="col" v-if="!user">
            <router-link to="/" @click.prevent="loginModal = true">
              my room</router-link
            >
          </div>
          <div v-if="user && role_id == 1" class="col">
            <router-link to="room/roomAll">my room</router-link>
          </div>
          <div class="col">
            <router-link to="/">search</router-link>
          </div>
          <div class="col" v-if="!user">
            <router-link to="/" @click.prevent="loginModal = true">
              motel</router-link
            >
          </div>
          <div v-if="user && role_id == 2" class="col">
            <router-link to="motel/all">motel</router-link>
          </div>
          <div v-if="user && role_id == 1" class="col">
            <router-link to="/userNoti">
              thông báo
              <q-badge color="red" text-color="white" :label="notiNum" />
            </router-link>
          </div>
        </div>
      </div>
    </q-header>
    <q-dialog v-model="loginModal">
      <q-card>
        <q-card-section style="text-align: center">
          <p>you not login</p>
          <p style="font-size: 1.3em">login or register to continue</p>
          <q-icon
            name="account_circle"
            class="text-blue"
            style="font-size: 4rem"
          />
        </q-card-section>
        <q-card-actions horizontal align="right">
          <div>
            <router-link class="lr lgs" to="/login">login</router-link>
            <!-- <router-link class="lr lg" to="/">login</router-link> -->
            <router-link class="lr rg" to="/">register</router-link>
          </div>
        </q-card-actions>
        <q-card-actions vertical align="center">
          <br />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
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
            :label="get_role()"
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
import MainLeftbar from "./MainLeftbar.vue";
import { mapGetters } from "vuex";
export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const loginModal = ref(false);

    return {
      rightDrawerOpen,
      loginModal,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  async created() {
    // try {
    var notiNum = await this.$api.get("countNoti");
    if (notiNum.data.statusCode == 1) {
      this.notiNum = notiNum.data.num;
    }
    const response = await this.$api.get("user");
    this.$store.dispatch("User/user", response.data.user);
    // } catch (e) {

    // }
    const user = this.$store.state.User.user;
    // let key = localStorage.getItem("key");
    // if( typeof user == 'object' && key == null){
    //   this.$router.go();
    // }

    this.role_id = user.role_id;
  },

  components: {
    MainLeftbar,
  },
  data() {
    return {
      links: {
        id1: {
          name: "login",
          link: "/login",
        },
        id2: {
          name: "User register",
          link: "/userRegister",
        },
        id3: {
          name: "Motel register",
          link: "/motelRegister",
        },
      },
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
    logout() {
      localStorage.removeItem("key");
      location.reload();
    },
    get_role() {
      if (this.role_id == 1) {
        return " tài khoảng người dùng ";
      }
      if (this.role_id == 2) {
        return " tài khoảng trọ ";
      }
    },
    reloadPage() {
      this.$router.go();
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
