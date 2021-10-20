<template>
  <div class="row items-center">
    <q-input
      outlined
      class="col-md-4 col-12"
      v-model="email"
      type="text"
      label=" Nhập email người muốn thuê"
    />
    <div class="col-md-1"></div>
    <div class="lt-md col-12"><br></div>
    <q-btn
      class="col-md-2 col-5 g-header-up"
      outline
      rounded
      color="positive"
      icon="search"
      label="Tìm"
      @click="findUser"
    />
    <div class="col-1"></div>
    <q-btn
      outline
      rounded
      class="g-header-up col-md-2 col-6"
      color="orange-9"
      icon="add"
      label=" mời vào "
      @click="addUserToRoom()"
    />
    <q-card-section
      class="row full-width justify-center items-center br bd mr"
      v-if="userFind"
    >
      <div class="col-5 col-md-4">Họ tên:</div>
      <div class="col-7 col-md-8 g-header-up">{{ userFind.name }}</div>
      <div class="col-5 col-md-4">Ngày sinh:</div>
      <div class="col-7 col-md-8">{{ userFind.birth_date }}</div>
      <div class="col-5 col-md-4">Giới tính:</div>
      <div class="col-7 col-md-8">{{ sex(userFind.sex) }}</div>
      <div class="col-5 col-md-4">Sdt:</div>
      <div class="col-7 col-md-8">{{ userFind.phone_number }}</div>
      <div class="col-5 col-md-4">Công việc:</div>
      <div class="col-7 col-md-8">{{ userFind.job }}</div>
    </q-card-section>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    return {
      showNoti(mess) {
        $q.notify({
          message: mess,
          color: "purle",
          position: "top",
          timeout: 1000,
        });
      },
    };
  },
  props: {
    userFind: {
      type: Object,
    },
    roomId : {
      type: Number,
    }
  },
  methods: {
    async findUser() {
      const response = await this.$api.get("findUser/" + this.email);
      this.$emit("updateUserFind", response.data.user[0]);
      if (response.data.statusCode == 0) {
        this.showNoti("id người dùng không tồn tại");
      }
    },
    sex(sex) {
      if (sex == 1) return "nam";
      else if (sex == 0) return "nữ";
      return "";
    },
    async addUserToRoom() {
      let roomId = this.roomId;
      if (this.userFind) {
        let userId = this.userFind.id;
        const response = await this.$api.post("sendInvite", {
          roomId: roomId,
          receiverId: userId,
        });
        let statusCode = response.data.statusCode;
        if (statusCode == 0)
          this.showNoti("lỗi: người được gửi là chủ trọ", "negative");
        else if (statusCode == 2)
          this.showNoti("lỗi: do người gửi là quản trị viên", "negative");
        else this.showNoti("thành công: chờ người dùng xác nhận", "info");
      } else {
        this.showNoti("bạn cần tìm người trọ trước", "negative");
      }
    },
  },
  data() {
    return {
      email: "",
    };
  },
};
</script>

<style lang="sass" scoped>
$fontSize: 20px
.pd
  padding: 10px 20px
.fs
  font-size: $fontSize
.br
  border: solid 1px #f3f3f3
  border-radius: 3px
  box-shadow: 0px 2px 12px gray
.mr
  margin: 10px !important
</style>
