<template>
  <q-page padding>
    <div class="row justify-center">
      <q-dialog v-model="isError" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              class="q-mr-20"
            />
            <span class="q-ml-sm"> {{ errorMes }} </span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="oke" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-card class="my-card col-12 col-md-8">
        <form method="post">
          <q-card-section>
            <div class="text-h3 text-center">register as user</div>
          </q-card-section>
          <q-card-section class="row">
            <q-input
              class="col-11 col-md-6"
              clearable
              v-model="email"
              type="email"
              :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
              label="email"
              suffix="@gmail.com"
            >
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
            <div class="gt-sm col-md-1"></div>
            <q-input
              class="col-11 col-md-5"
              clearable
              v-model="password"
              type="password"
              label="password"
            >
              <template v-slot:before>
                <q-icon name="password" />
              </template>
            </q-input>
            <q-input
              class="col-12"
              v-model="names"
              type="text"
              label=" họ tên "
            >
              <template v-slot:before>
                <q-icon name="portrait" />
              </template>
            </q-input>
            <div
              class="col-12"
              style="margin-top: 30px; font-size: 1.3em; color: gray"
            >
              <div class="row items-center">
                <div class="col-2" style="margin-left: 5px; font-size: 1.1em">
                  <q-icon name="face" />
                  giới tính:
                </div>
                <div class="col-1">
                  <input type="radio" id="name" value="1" v-model="sex" />
                  <label for="name"> nam</label>
                </div>
                <div class="col-1">
                  <input type="radio" id="nu" value="0" v-model="sex" />
                  <label for="nu"> nữ </label>
                </div>
                <div class="col-1"></div>
                <q-input
                  class="col"
                  v-model="phone_number"
                  type="text"
                  label="phone number"
                />
              </div>
            </div>
            <q-input
              class="col-12 col-md-12"
              v-model="date"
              mask="date"
              label="birth date"
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
            <q-input
              class="col-12"
              v-model="address"
              type="text"
              label=" địa chỉ nhà "
            />

            <q-input
              class="col-12"
              v-model="job"
              type="text"
              label="công việc, nghề nghiệp "
            />
          </q-card-section>
          <div class="row justify-center items-center">
            <q-btn
              type="submit"
              color="primary"
              icon="login"
              label=" đăng ký "
              @click.prevent="register()"
            />
          </div>
          <br />
        </form>
      </q-card>
    </div>
    <div class="lt-md" style="height: 100vh"></div>
  </q-page>
</template>

<script>
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
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
</style>
