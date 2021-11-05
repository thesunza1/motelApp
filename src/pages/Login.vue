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
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-card-section class="row items-center content-center">
            <div class="col-12">
              <q-img
                style="max-width: 13%"
                src="/icons/favicon-96x96.png"
                :ratio="1"
                spinner-color="primary"
                class="q-mb-sm"
              />
            </div>
            <div class="col-12 text-h4 text-bold">Đăng nhập</div>
            <div class="col-12 text-subtitle">
              Để thấy nhiều hơn sự tiện lợi của chúng tôi!
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <q-form @submit="login" class="q-gutter-md">
                <q-card-section class="row items-center justify-center">
                  <div class="col-11">
                    <div class="text-h6">Email*</div>
                    <q-input
                      v-model="email"
                      rounded
                      outlined
                      type="text"
                      placeholder="mail@gmail.com"
                      :rules="[
                        (val) => val.length > 0 || ' Trường không để trống',
                      ]"
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-11">
                    <div class="text-h6">Mật khẩu*</div>
                    <q-input
                      v-model="password"
                      rounded
                      outlined
                      type="password"
                      placeholder=" Nhỏ nhất 8 ký tự"
                      :rules="[
                        (val) => val.length > 0 || ' Trường không để trống',
                      ]"
                    />
                  </div>
                </q-card-section>
                <q-card-section class="row items-center justify-center">
                  <q-btn
                    class="col-11 no-shadow q-py-sm"
                    no-caps
                    rounded
                    color="primary"
                    type="submit"
                    label="Đăng nhập"
                  />
                </q-card-section>
              </q-form>
              <div class="col-12">
                <div class="">
                  <div style="display: inline" class="text-bold">
                    Bạn quên mật khẩu?
                  </div>
                  <q-btn
                    no-caps
                    color="primary"
                    flat
                    label=" Quên mật khẩu"
                    @click="trong()"
                  />
                </div>
                <div style="display: inline" class="text-bold">
                  Bạn muốn tạo tài khoản?
                </div>
                <q-btn
                  style="display: inline"
                  color="primary"
                  no-caps
                  flat
                  label=" Tạo tài khoản"
                  @click="onClick"
                />
              </div>
            </div>
          </q-card-section>
          <q-img
            src="/images/loginMotel.jpg"
            class="col-6"
            spinner-color="primary"
            spinner-size="82px"
          />
        </q-card-section>
      </q-card>
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
