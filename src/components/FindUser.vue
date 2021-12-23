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
    <div class="lt-md col-12"><br /></div>
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
      class="full-width row items-center justify-center"
      v-if="userFind"
    >
      <!-- <table style="width: 70%">
        <tr>
          <td>Họ tên:</td>
          <td>{{ userFind.name }}</td>
        </tr>
        <tr>
          <td>Ngày sinh:</td>
          <td>{{ toDate(userFind.birth_date) }}</td>
        </tr>
        <tr>
          <td>Giới tính:</td>
          <td>{{ sex(userFind.sex) }}</td>
        </tr>
        <tr>
          <td>Sdt:</td>
          <td>{{ userFind.phone_number }}</td>
        </tr>
        <tr>
          <td>Công việc:</td>
          <td>{{ userFind.job }}</td>
        </tr>
      </table> -->
      <div class="col-12 col-md-9"><hr /></div>
      <div class="col-5 col-md-4">Họ tên:</div>
      <div class="col-7 col-md-4 g-header-up">{{ userFind.name }}</div>
      <div class="col-12 col-md-9"><hr /></div>
      <div class="col-5 col-md-4">Ngày sinh:</div>
      <div class="col-7 col-md-4">{{ toDate(userFind.birth_date) }}</div>
      <div class="col-12 col-md-9"><hr /></div>
      <div class="col-5 col-md-4">Giới tính:</div>
      <div class="col-7 col-md-4">{{ sex(userFind.sex) }}</div>
      <div class="col-12 col-md-9"><hr /></div>
      <div class="col-5 col-md-4">Sdt:</div>
      <div class="col-7 col-md-4">{{ userFind.phone_number }}</div>
      <div class="col-12 col-md-9"><hr /></div>
      <div class="col-5 col-md-4">Công việc:</div>
      <div class="col-7 col-md-4">{{ userFind.job }}</div>
      <div class="col-12 col-md-9"><hr /></div>
    </q-card-section>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import dates from "../boot/noti/date";
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
    roomId: {
      type: Number,
    },
  },
  methods: {
    async findUser() {
      const response = await this.$api.get("findUser/" + this.email);
      this.$emit("updateUserFind", response.data.user[0]);
      if (response.data.statusCode == 0) {
        this.showNoti("Email người dùng không tồn tại");
      }
    },
    sex(sex) {
      if (sex == 0) return "Nam";
      else if (sex == 1) return "Nữ";
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
          this.showNoti("Lỗi: người được gửi là chủ trọ", "negative");
        else if (statusCode == 2)
          this.showNoti("Lỗi: do người gửi là quản trị viên", "negative");
        else this.showNoti("Thành công: chờ người dùng xác nhận", "info");
      } else {
        this.showNoti("Bạn cần tìm người trọ trước", "negative");
      }
    },
    toDate(date) {
      return dates.toDate(date);
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
.left-cell
  width:50%
.right-cell
  width:70%
table, th, td
  border: 1px solid black
  border-collapse: collapse
</style>
