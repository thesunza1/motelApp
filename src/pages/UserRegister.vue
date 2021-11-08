<template>
  <q-page padding class="row content-center items-center justify-center">
    <div class="row justify-center">
      <q-dialog v-model="isError" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              class="q-mr-md"
            />
            <span class="q-ml-sm"> {{ errorMes }} </span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="oke" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-card class="my-card g-border shadow-up-3  col-12 col-md-8">
        <form method="post">
          <q-card-section>
            <div class="text-h4 text-center">Tạo tài khoản người dùng</div>
          </q-card-section>
          <q-card-section class="row">
            <q-input
              class="col-11 col-md-6"
              label-color="primary"
              clearable
              v-model="email"
              type="email"
              :rules="[(val) => val.length >= 1 || ' Không bỏ trống ']"
              label="Email"
              suffix="@gmail.com"
            >
            </q-input>
            <div class="gt-sm col-md-1"></div>
            <q-input
              class="col-11 col-md-5"
              clearable
              v-model="password"
              type="password"
              label-color="primary"
              label=" Mật khẩu"
            >
            </q-input>
            <q-input
              class="col-12 col-md-6"
              v-model="names"
              type="text"
              label-color="primary"
              label=" Họ tên "
            >
            </q-input>
            <div class="col-1"></div>
            <div class="col-12 col-md-5 q-py-md row items-center">
              <div class="" style="margin-left: 5px; font-size: 1.1em">
                <q-icon name="face" />
                &nbsp;Giới tính: &nbsp;
              </div>
              <div class="">
                <input type="radio" id="name" value="1" v-model="sex" />
                <label for="name"> Nam</label>
              </div>
              <div class="">
                <input type="radio" id="nu" value="0" v-model="sex" />
                <label for="nu"> Nữ </label>
              </div>
              <div class="col-1"></div>
            </div>
            <div class="col-12 row q-py-sm items-center">
              <q-input
                class="col-12 col-md-6"
                v-model="date"
              label-color="primary"
                mask="date"
                label=" Ngày sinh"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale">
                      <q-date v-model="date" landscape minimal>
                        <div class="row items-center justify-center">
                          <q-btn
                            v-close-popup
                            color="primary"
                            label="close"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="col-1"></div>
              <q-input
                class="col"
                v-model="phone_number"
              label-color="primary"
                type="text"
                label=" Số điện thoại"
              />
            </div>
            <q-input
              class="col-6"
              v-model="address"
              type="text"
              label-color="primary"
              label="Địa chỉ nhà "
            />
            <div class="col-1"></div>
            <q-input
              class="col-5"
              v-model="job"
              label-color="primary"
              type="text"
              label="công việc, nghề nghiệp "
            />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              type="submit"
              color="black"
              no-caps
              rounded
              icon="login"
              label="Đăng ký "
              @click.prevent="register()"
            />
          </q-card-actions>
          <br />
        </form>
        <q-card-section>
          <div class="text-bold" style="display:inline">
            Bạn đã có tài khoản? &nbsp;
          </div>
          <div class="text-primary"  style="display:inline"> Đăng nhập </div>
          <br>
          <div class="text-bold" style="display:inline" >
            Bạn quên mật khẩu? &nbsp;
          </div>
          <div class="text-primary" style="display:inline"> Quên mật khẩu </div>
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
      names: "",
      email: "",
      password: "",
      address: "",
      sex: 0,
      date: "2019-02-23",
      phone_number: "",
      job: "",
      isError: false,
      errorMes: "",
    };
  },
  methods: {
    async register() {
      const reponse = await this.$api.post("userRegister", {
        names: this.names,
        email: this.email,
        password: this.password,
        sex: this.sex,
        date: this.date,
        phone_number: this.phone_number,
        job: this.job,
        address: this.address,
      });
      if (reponse.data.statusCode == 0) {
        this.errorMes = "email đã tồn tại ";
        this.isError = true;
      } else {
        noti.showNoti(" Tạo tài khoản thành công", "positive");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
