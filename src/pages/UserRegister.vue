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
      <q-card class="my-card g-border shadow-up-3 col-12 col-md-8">
        <form method="post">
          <q-card-section>
            <div class="text-h4 text-center text-primary"> TẠO TÀI KHOẢN</div>
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div class="col-12 text-center text-subtitle2 q-mb-sm">
              Chọn loại tài khoản bạn muốn tạo.
            </div>
            <div class="col-12 items-center text-center">
              <q-btn-toggle
                no-caps
                v-model="isRole"
                toggle-color="black"
                rounded
                :options="roleOt"
              />
            </div>
          </q-card-section>
          <q-card-section class="row">
            <q-input
              class="col-11 col-md-6"
              label-color="primary"
              clearable
              v-model="email"
              outlined
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
              outlined
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
              outlined
              label=" Họ và tên "
            >
            </q-input>
            <div class="col-1"></div>
            <div class="col-12 col-md-5 q-py-md row items-center">
              <div class="" style="margin-left: 5px; font-size: 1.1em">
                <q-icon name="face" />
                &nbsp;Giới tính: &nbsp;
              </div>
              <!-- <div class="q-pr-md">
                <input type="radio" id="name" value="1" v-model="sex" />
                <label for="name"> Nam</label>
              </div>
              <div class="q-pr-md">
                <input type="radio" id="nu" value="0" v-model="sex" />
                <label for="nu">  </label>
              </div> -->
              <div class="q-gutter-sm">
                <q-radio
                  v-model="sex"
                  :val="1"
                  label="Nam"
                  keep-color
                  color="cyan"
                />
                <q-radio v-model="sex" :val="0" label="Nữ" />
              </div>
              <div class="col-1"></div>
            </div>
            <div class="col-12 row q-pb-md items-center">
              <q-input
                class="col-12 col-md-6"
                v-model="date"
                label-color="primary"
                outlined
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
              <div class="gt-sm col-1"></div>
              <div class="col-12 col-md">
                <q-input
                  class="col-12"
                  v-model="phone_number"
                  label-color="primary"
                  type="text"
                  outlined
                  label=" Số điện thoại"
                />
              </div>
            </div>
            <q-input
              class="col-12 col-md-6"
              v-model="address"
              type="text"
              label-color="primary"
              outlined
              label="Địa chỉ nhà "
            />
            <div class="gt-sm col-1"></div>
            <q-input
              class="col-12 col-md-5"
              v-model="job"
              label-color="primary"
              type="text"
              label="Công việc, nghề nghiệp "
              outlined
            />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              type="submit"
              color="black"
              no-caps
              rounded
              icon="login"
              label="Đăng Ký"
              @click.prevent="register()"
            />
          </q-card-actions>
          <br />
        </form>
        <q-card-section>
          <div class="text-bold" style="display: inline">
            Bạn đã có tài khoản? &nbsp;
          </div>
          <div class="text-primary" style="display: inline">Đăng nhập</div>
          <br />
          <div class="text-bold" style="display: inline">
            Bạn quên mật khẩu? &nbsp;
          </div>
          <div class="text-primary" style="display: inline">Quên mật khẩu</div>
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
      isRole: 1,
      roleOt: [
        {
          label: "Người Thuê",
          value: Number(1),
        },
        {
          label: "Chủ Trọ",
          value: Number(2),
        },
      ],
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
        roleId: this.isRole,
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
