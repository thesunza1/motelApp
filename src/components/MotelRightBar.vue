<template>
  <div class="row">
    <!-- <q-btn color="primary" icon="check" label="OK" @click="get()" /> -->
    <div class="col-12 row justify-center">
      <q-chip
        class="col-10 g-header-up"
        color="teal"
        text-color="white"
        icon="account_circle"
        :label="`${user.name} `"
        @click="detailAccount"
        clickable
      />
      <q-chip
        class="col-10"
        color="orange"
        text-color="white"
        icon="done"
        label="Bạn là chủ trọ"
      />
    </div>
    <div class="col-12 row items-center justify-center">
      <div class="col-12"><br /></div>
      <q-card v-if="user.role_id == 2" class="my-card col-10 items-center pad">
        <div class="row items-center">
          <b class="col-6">Tên trọ</b>
          <div class="col-6">{{ motel.name }}</div>
          <div class="col-12"><br /></div>

          <b class="col-6"> Đóng-mở</b>
          <div class="col-6">{{ motel.open }}h-{{ motel.closed }}h</div>
          <div class="col-12"><br /></div>

          <b class="col-12"> Loại phòng </b>
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

    <q-footer class="bg-white q-py-md">
      <div class="full-width row justify-center pad">
        <q-btn
          color="black"
          class="g-header col-10"
          icon="refresh"
          label="Tải lại"
          rounded
          @click="$router.go()"
        />
      </div>
      <div class="row justify-center full-width pad">
        <q-btn
          color="black"
          icon="login"
          class="g-header col-10"
          label=" Đăng xuất "
          rounded
          @click="logout()"
        />
      </div>
      <div class="row justify-center full-width pad">
        <q-btn
          color="black"
          icon="home"
          class="g-header col-10"
          label=" Trang chủ"
          rounded
          @click="$router.push('/')"
        />
      </div>
    </q-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    detailAccount() {
      const role_id = this.user.role_id;
      if (role_id == 1) {
        this.$router.push( {name:'roomDetailAccount'});
      } else if(role_id ==2 ){
        this.$router.push({name: 'detailAccount'});
      } else {
        this.$router.push({name: 'adminDetailAccount'});
      }
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

<style scoped lang="sass">
.pad
  padding: 10px 0px 0px 10px
</style>
