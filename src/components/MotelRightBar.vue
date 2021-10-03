<template>
  <div class="row">
    <!-- <q-btn color="primary" icon="check" label="OK" @click="get()" /> -->
    <div class="col-12 row justify-center">
      <q-chip
        class="col-10"
        color="teal"
        text-color="white"
        icon="account_circle"
        :label="user.name"
      />
      <q-chip
        class="col-10"
        color="orange"
        text-color="white"
        icon="done"
        label="bạn là chủ trọ"
      />
      <q-btn color="primary" label=" tài khoảng" @click="detailAccount" />
    </div>
    <div class="col-12 row items-center justify-center">
      <div class="col-12"><br /></div>
      <q-card class="my-card col-10 items-center pad">
        <div class="row items-center">
          <b class="col-6">tên trọ</b>
          <div class="col-6">{{ motel.name }}</div>
          <div class="col-12"><br /></div>

          <b class="col-6"> đóng-mở</b>
          <div class="col-6">{{ motel.open }}h-{{ motel.closed }}h</div>
          <div class="col-12"><br /></div>

          <b class="col-12"> loại phòng </b>
          <div class="col-12"><br /></div>
          <div
            v-for="(room_type, index) in motel.room_types"
            :key="index"
            style="padding-left: 20px"
            class="col-12 row items-center"
          >
            <b class="col-6"> {{ ++index }}</b>
            <div class="col-6">{{ room_type.name }}</div>
            <div class="col-12"><br /></div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="full-width row justify-center items-end" style="height: 50vh">
      <q-btn
        color="primary"
        icon="refresh"
        label="tải lại"
        @click="$router.go()"
      />
    </div>
    <div class="row justify-center full-width pad">
      <q-btn
        color="orange"
        icon="login"
        label=" đăng xuất "
        @click="logout()"
      />
    </div>
    <div class="row justify-center full-width pad">
      <q-btn
        color="positive"
        icon="home"
        label=" trang chủ"
        @click="$router.push('/')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    detailAccount() {
      this.$router.push("motel/detailAccount");
    },
    logout() {
      localStorage.removeItem("key");
      this.$store.dispatch("User/user", null);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters("User", ["user"]),
    ...mapGetters("Motel", ["motel"]),
  },
};
</script>

<style scoped lang='sass'>
.pad
  padding: 10px 0px 0px 10px
</style>
