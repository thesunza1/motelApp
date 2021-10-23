<template>
  <q-page padding>
    <q-dialog v-model="isError" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="warning"
            color="negative"
            text-color="white"
            class="q-mr-20"
          />
          <span class="q-ml-sm"> {{ statusMes }} </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="oke" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-ajax-bar position="top" size="4px" color="red" />
    <div class="row justify-center">
      <q-form class="q-gutter-md col-12 row justify-center" @submit="login">
        <q-card class="my-card col-12 col-md-8">
          <q-card-section>
            <h3 class="text-center text-primary">
              <q-icon name="login" /> Đăng nhập
            </h3>
          </q-card-section>
          <q-card-section class="row justify-center">
            <div class="col-md-6 col-12 row justify-center items-center">
              <q-input
                class="col-11"
                v-model="email"
                type="text"
                label="email"
                :rules="[(val) => val.length > 0 || 'Trường không để trống']"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

            </div>
            <div class="col-12"></div>
            <div class="col-md-6 col-12 row justify-center items-center">
              <q-input
                class="col-11"
                v-model="password"
                type="password"
                label=" Mật khẩu"
                :rules="[(val) => val.length > 0 || ' Trường không để trống']"
              >
                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section> </q-card-section>
          <q-card-actions align="center">
            <q-btn icon="login" label=" đăng nhập" rounded color="primary" type="submit" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
    <div class="lt-md" style="height: 100vh"></div>
  </q-page>
</template>

<script>
import noti from "../boot/noti/noti";
export default {
  data() {
    return {
      email: "",
      password: "",
      isError: false,
      statusMes: "",
    };
  },
  methods: {
    async login() {
      let response = await this.$api.post("/login", {
        email: this.email,
        password: this.password,
      });
      const loginStatus = response.data.loginStatus;
      if (loginStatus == 1) {
        this.isError = true;
        this.statusMes = "email không tồn tại";
      } else if (loginStatus == 2) {
        this.isError = true;
        this.statusMes = "password không đúng";
      } else {
        localStorage.setItem("key", response.data.tokenUser);
        this.$store.dispatch("User/user", response.data.user);
        noti.showNoti(" đăng nhập thành công", "positive");
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped lang="sass">
a
  text-decoration: none
.my-card
  margin-top: 10vh
</style>
