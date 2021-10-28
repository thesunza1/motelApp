<template>
  <q-layout view="hHh lpR fFf">
    <q-header  class="bg-primary " height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link to="/" class="text-white text-h6" style="text-decoration: none">
            Tmq-motel</router-link
          >
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      <div class="row justify-center">
        <div
          class="col-11 row items-center justify-center col-md-8"
          style="padding: 0px 0px 10px 0px"
        >
          <div v-if="!user" class="col-4 row items-center justify-center">
            <q-btn
              rounded
              class="col-10 pd font-header bg-white  text-black"
              icon="home"
              @click="loginModal = true"
            >
              <div class="gt-sm text-bold text-indent"> Quản lý phòng</div>
            </q-btn>
          </div>
          <div
            v-if="user && user.role_id == 1"
            class="col-4 row items-center justify-center"
          >
            <q-btn
              class="col-10 pd font-header  bg-white text-black"
              rounded
              icon="home"
              @click="openModal(0)"
            >
              <div class="gt-sm text-indent"> Quản lý phòng</div>
            </q-btn>
          </div>
          <div class="col-4 row items-center justify-center">
            <q-btn
              class="col-10 pd font-header bg-white  text-bold text-black"
              rounded
              icon="search"
              @click="$router.push('search/searchIndex')"
            >
              <div class="gt-sm text-indent text-bold"> Tìm trọ</div>
            </q-btn>
          </div>
          <div v-if="!user" class="col-4 row items-center justify-center">
            <q-btn
              class="col-10 pd font-header bg-white text-black"
              rounded
              icon="apartment"
              @click="loginModalMotel = true"
            >
              <div class="gt-sm text-bold text-indent">Quản lý trọ</div>
            </q-btn>
          </div>
          <div
            v-if="user && user.role_id == 2"
            class="col-4 row items-center justify-center"
          >
            <q-btn
              class="col-10 pd font-header bg-white   text-black"
              icon="apartment"
              rounded
              @click="openModal(1)"
            >
              <div class="gt-sm text-indent text-bold">Quản lý trọ</div>
            </q-btn>
          </div>
          <div
            v-if="user && user.role_id == 3"
            class="col-4 row items-center justify-center"
          >
            <q-btn
              class="col-10 pd bg-white font-header text-black"
              icon="admin_panel_settings"
              rounded
              @click="$router.push('admin/adminUser')"
            >
              <div class="gt-sm text-indent"> Quản lý </div>
            </q-btn>
          </div>

          <div v-if="user" class="col-4 row items-center justify-center">
            <q-btn
              class="col-10 pd font-header bg-white text-black"
              rounded
              icon="notifications"
              @click="$router.push('/userNoti')"
            >
              <div class="gt-sm text-indent text-bold"> Thông báo</div>
              <q-badge
                color="red"
                text-color="white"
                :label="notiNum"
                floating
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-header>
    <q-dialog v-model="loginModal">
      <q-card>
        <q-card-section class="text-center text-h6 text-primary">
          Bạn chưa đăng nhập
        </q-card-section>
        <q-card-section style="text-align: center">
          <p style="font-size: 1.3em"> Đăng nhập hoặc tạo tài khoản để tiếp tục</p>
          <q-icon
            name="account_circle"
            class="text-blue"
            style="font-size: 4rem"
          />
        </q-card-section>
        <q-card-actions horizontal align="right">
          <div>
            <router-link class="lr lgs g-border" to="/login"> Đăng nhập</router-link>
            <router-link class="lr rg g-border" to="/userRegister"> Đăng ký</router-link>
          </div>
        </q-card-actions>
        <q-card-actions vertical align="center">
          <br />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="loginModalMotel">
      <q-card>
        <q-card-section class="text-center text-h6 text-primary">
          Bạn chưa đăng nhập
        </q-card-section>
        <q-card-section style="text-align: center">
          <p style="font-size: 1.3em"> Đăng nhập hoặc tạo tài khoản để tiếp tục</p>
          <q-icon
            name="account_circle"
            class="text-blue"
            style="font-size: 4rem"
          />
        </q-card-section>
        <q-card-actions horizontal align="right">
          <div>
            <router-link class="lr lgs" to="/login"> Đăng nhập</router-link>
            <router-link class="lr rg" to="/motelRegister"> Đăng ký</router-link>
          </div>
        </q-card-actions>
        <q-card-actions vertical align="center">
          <br />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isNonRoom">
      <q-card>
        <q-card-section class="row items-center bg-positive">
          <div class="col-12 text-center text-h6 text-white">
            Bạn chưa có phòng
          </div>
        </q-card-section>
        <q-card-section>
          <div class="full-width">
            Bạn cần vào một trọ nào đó để sử dụng tính năng này.
          </div>
        </q-card-section>
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
            label=" Bạn chưa đăng nhập"
          />
          <q-chip
            class="col-10 g-header-up"
            color="teal"
            text-color="white"
            v-else
            icon="account_circle"
            :label="` ${user.id}-${user.name} `"
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
          <q-btn
            v-if="user"
            class="col-10 g-header"
            icon="account_circle"
            color="primary"
            label=" Tài khoản"
            @click="detail()"
          />
          <div class="col-12"><br /></div>
        </div>
      </div>

      <q-footer class="bg-white q-py-sm q-px-md">
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
          class="g-header"
          label=" Tải lại "
          @click="reloadPage"
        />
        <q-btn
          v-if="userd"
          style="width: 100%; margin-top: 10px"
          color="positive"
          icon="home"
          label=" Trang chủ"
          class="g-header"
          @click="$router.push('/')"
        />
      </q-footer>
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
    const loginModalMotel = ref(false);
    const isNonRoom = ref(false);

    return {
      rightDrawerOpen,
      loginModal,
      isNonRoom,
      loginModalMotel,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  async created() {
    // try {\
    try {
      var notiNum = await this.$api.get("countNoti");
      if (notiNum.data.statusCode == 1) {
        this.notiNum = notiNum.data.num;
      }
      const response = await this.$api.get("user");
      this.$store.dispatch("User/user", response.data.user);
      const user = this.$store.state.User.user;
      this.role_id = user.role_id;
    } catch (error) {
      if(this.user?.id > 0 ){
        this.$router.go() ;
      }
    }
  },
  components: {
    MainLeftbar,
  },
  data() {
    return {
      links: {
        id1: {
          name: " Đăng nhập",
          col1: "primary",
          link: "/login",
          icon: "login",
        },
        id2: {
          name: " Đăng ký ",
          col1: "accent",
          link: "/userRegister",
          icon: "assignment",
        },
        id3: {
          name: " Đăng ký trọ",
          col1: "positive",
          link: "/motelRegister",
          icon: "receipt",
        },
        id4: {
          name: " Trang chủ",
          col1: "positive",
          link: "/",
          icon: "home",
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
    detail() {
      this.$router.push("/homeDetailAccount");
    },
    logout() {
      localStorage.removeItem("key");
      location.reload();
    },
    get_role() {
      if (this.role_id == 1) {
        return " tài khoản người dùng ";
      }
      if (this.role_id == 2) {
        return " tài khoản trọ ";
      }
      if( this.role_id ==3 ) {
        return " Tài khoản quản trị"
      }
    },
    reloadPage() {
      this.$router.go();
    },
    openModal(val) {
      if (val == 0) {
        if (this.user.have_room == 1) return this.$router.push("room/roomAll");
        else this.isNonRoom = true;
      } else {
        // this.$router.push("motel/all");
        this.$router.push({name:'choseMotel'});
      }
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
.pd
  padding: 10px 0px
.font-header
  font-size: 18px
  font-weight: 500
  letter-spacing: 0.5px
.opc-top
  opacity: 0.70
  font-weight: 500
.text-indent
  text-indent: 10px
  text-transform: none

</style>
