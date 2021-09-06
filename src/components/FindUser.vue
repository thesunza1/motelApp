<template>
  <div class="row items-center">
    <div class="col-12">tìm người vào trọ( sử dụng id )</div>
    <q-input
      outlined
      class="col-8"
      v-model="userId"
      type="number"
      label=" nhập id "
    />
    <div class="col-1"></div>
    <q-btn class="col-2" color="primary" icon="search" @click="findUser" />
    <q-card-section
      class="row full-width justify-center items-center br bd mr"
      v-if="userFind"
    >
      <div class="col-5 col-md-4">Họ tên:</div>
      <div class="col-7 col-md-8"> {{ userFind.name }}</div>
      <div class="col-5 col-md-4">ngày sinh:</div>
      <div class="col-7 col-md-8"> {{ userFind.birth_date }}</div>
      <div class="col-5 col-md-4">giới tính:</div>
      <div class="col-7 col-md-8"> {{ sex(userFind.sex) }}</div>
      <div class="col-5 col-md-4">sdt:</div>
      <div class="col-7 col-md-8"> {{ userFind.phone_number }}</div>
      <div class="col-5 col-md-4">công việc:</div>
      <div class="col-7 col-md-8"> {{ userFind.job }}</div>
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
          message: mess ,
          color: "purle",
          position: 'top',
          timeout:1000
        })
      },
    };
  },
  props: {
    userFind: {
      type: Object,
    },
  },
  methods: {
    async findUser() {
      const response = await this.$api.get("findUser/" + this.userId);
      this.$emit("updateUserFind", response.data.user);
      if (response.data.statusCode == 0) {
        this.showNoti("id người dùng không tồn tại");
      }
    },
    sex(sex) {
      if (sex == 1) return "nam";
      else if(sex == 0) return "nữ";
      return '' ;
    },
  },
  data() {
    return {
      userId: "",
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
