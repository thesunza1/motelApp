<template>
  <q-card-actions align="right">
    <q-btn color="white" flat no-caps icon="west" @click="$router.go(-1)" />
    <q-btn color="white" flat no-caps icon="home" @click="toHome()" />
    <q-btn color="white" flat no-caps icon="refresh" @click="reloadPage" />
    <q-btn
      color="white"
      rounded
      class="text-black"
      v-if="user"
      icon="person"
      :label="user.name"
      no-caps
    >
      <q-menu style="min-width: 350px">
        <q-card class="my-card" style="max-width: 100%">
          <q-card-section>
            <div class="text-subtitle2 row">
              <q-icon name="email" class="g-icon-h2 text-primary"  />
              <div class="col-3">&nbsp;Email:</div>
              <div>{{ user.email }}</div>
            </div>
            <div class="text-subtitle2 row">
              <q-icon name="person" class="g-icon-h2 text-primary" />
              <div class="col-3">&nbsp;Tài khoản:</div>
              <div>{{ get_role() }}</div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label=" Đăng xuất" color="negative" no-caps @click="logout()" />
            <q-btn flat label=" Tài khoản" no-caps @click="detail()" />
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-btn>
    <q-btn
      color="white"
      class="text-black"
      v-else
      rounded
      icon="person"
      label="Bạn chưa đăng nhập"
      no-caps
    >
      <q-menu>
        <q-card class="my-card">
          <q-card-section style="width: 180px">
            <!-- <main-leftbar style="width: 100%" :link="links"></main-leftbar> -->
            <q-card-actions vertical align="left">
              <q-btn
                no-caps
                color="black"
                flat
                icon="login"
                label=" Đăng nhập"
                :to="{ name: 'login' }"
              />
              <q-btn
                no-caps
                color="black"
                flat
                icon="assignment"
                label="Đăng ký"
                :to="{ name: 'userRegister' }"
              />
              <!-- <q-btn
                no-caps
                color="black"
                flat
                icon="receipt"
                label="Đăng ký trọ"
                :to="{ name: 'motelRegister' }"
              /> -->
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-menu>
    </q-btn>
  </q-card-actions>
</template>

<script>
import { mapGetters } from "vuex";
import MainLeftbar from "../layouts/MainLeftbar.vue";
import sp from "../boot/support";
export default {
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
      return sp.getRole(this.user.role_id);
    },
    reloadPage() {
      this.$router.go();
    },
    toHome() {
      this.$router.push("/");
    },
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
      },
    };
  },
  component: {
    MainLeftbar,
  },
};
</script>

<style></style>
