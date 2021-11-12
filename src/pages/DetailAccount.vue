<template>
  <q-page padding class="row justify-center">
    <q-card v-if="user" class="my-card col-12 col-md-10 row justify-center br">
      <q-form class="col-12">
        <q-card-section class="full-width bg-accent">
          <div class="text-h6 full-width text-center text-white">
            Chi tiết thông tin
          </div>
        </q-card-section>
        <q-card-section class="row items-center text-center">
          <div class="col-7 col-md-5">
            <q-input
              v-model="user.name"
              type="text"
              label-color="blue"
              label=" Họ tên"
              class="q-mr-sm"
            />
          </div>
          <div class="col-10 col-md-7">
            <q-input
              v-model="user.address"
              class="q-mx-sm"
              type="text"
              label=" Địa chỉ "
              label-color="blue"
            />
          </div>
          <div class="col-12"><br /></div>
          <q-input
            class="col-4 col-md-3"
            v-model="user.phone_number"
            type="text"
            label=" số điện thoại"
            label-color="blue"
          />
          <div class="col-8 col-md-9 row items-center justify-center">
            <div class="col-3 col-md-2">Giới tính</div>
            <q-radio v-model="user.sex" val="0" label="Nam" />
            <q-radio v-model="user.sex" val="1" label=" Nữ" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="bg-primary text-white g-header"
            rounded
            label="Thay đổi thông tin"
            @click="updateAccount"
          />
        </q-card-actions>
        <q-card-section class="bg-primary text-white text-center">
          <div class="full-width text-subtitle2">Tài khoản</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-input
            class="col-7"
            v-model="user.email"
            type="text"
            label=" Tên đăng nhập"
          />
          <div class="col-12"><br /></div>
          <q-input
            class="q-mx-lg"
            v-model="password"
            :rules="[(val) => val?.length > 0 || 'Không được để trống']"
            type="text"
            label="Mật khẩu cũ"
          />
          <q-input
            class="q-mx-lg"
            v-model="newpass"
            :rules="[(val) => val?.length > 8 || 'Không đủ chiều dài']"
            type="text"
            label=" Mật khẫu mới"
          />
          <q-input
            class="q-mx-lg"
            v-model="reNewpass"
            :rules="[(val) => val == newpass || 'Không khớp']"
            type="text"
            label=" Mật khẫu mới"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="bg-primary text-white g-header"
            rounded
            label=" Thay đổi tài khoản"
            @click="updateUP"
          />
        </q-card-actions>
        <q-card-section>
          <hr />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            color="negative"
            rounded
            label=" đăng xuất tất cả thiết bị"
            @click="logoutAllDevice()"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  setup() {
    const isDelete = ref(false);
    const isRemoveToken = ref(false);
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        color: col,
        message: mess,
        position: "top",
        timeout: 3000,
      });
    }
    return {
      isDelete,
      isRemoveToken,
      showNoti,
    };
  },
  data() {
    return {
      user: null,
      password: "",
      newpass: null,
      reNewpass: null,
    };
  },
  async created() {
    const user = await this.$api.get("getUser");

    if (user.data?.statusCode == 1) {
      this.user = user.data.user;
    }
  },
  methods: {
    async updateAccount() {
      const update = await this.$api.post("updateAccount", {
        name: this.user.name,
        address: this.user.address,
        sex: this.user.sex,
        phone_number: this.user.phone_number,
        job: this.user.job,
        birth_date: this.user.birth_date,
      });
      if (update.data?.statusCode == 1) {
        this.showNoti(" thành công", "positive");
      } else {
        this.showNoti(" thất bại", "negative");
      }
    },
    async updateUP() {
      const res = await this.$api.post("updateUP", {
        password: this.password,
        newpass: this.newpass,
      });
      if (res.data?.statusCode == 1) {
        this.showNoti("thành công", "positive");
      } else if (res.data?.statusCode == 0) {
        this.showNoti(" mật khẩu không đúng ", "negative");
      }
    },
    async logoutAllDevice() {
      const res = await this.$api.post("logoutAllDevice");
      if (res.data?.statusCode == 1) {
        this.showNoti(" thành công ");
        this.$store.dispatch("User.user", null);
        localStorage.removeItem("key");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.br
  border-radius: 10px
  overflow: hidden
</style>
