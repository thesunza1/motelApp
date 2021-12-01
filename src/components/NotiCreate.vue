<template>
  <q-card class="my-card full-width g-border" style="max-height: 80vh">
    <q-form @submit="sendNoti" @reset="onReset" >
      <q-card-section class="bg-primary text-white text-h6 text-center">
        Tạo thông báo mới
      </q-card-section>
      <q-card-section>
        <div class="row full-width items-center">
          <div class="">Tìm người nhận: &nbsp;</div>
          <q-input
            class="col-5 q-mr-md"
            v-model="noti.email"
            type="text"
            outlined
            label-color="primary"
            dense
            label="Nhập email"
          />
          <q-btn
            class="col-1"
            color="black"
            no-caps
            label="Tìm"
            @click="findUser"
          />
          <q-input
            class="col-12 q-my-sm"
            v-model="noti.title"
            type="text"
            label=" Tiêu đề"
            label-color="primary"
            outlined
          />

          <q-input
            class="col-12"
            v-model="noti.content"
            label-color="primary"
            type="textarea"
            label=" Nội dung"
            outlined
          />
        </div>
        <div v-if="userFind" class="row full-width items-center br">
          <div class="col-3 text-h6">Tên:</div>
          <div class="col-9 text-center g-header-up">
            {{ userFind.name }}
          </div>
        </div>
      </q-card-section>
      <q-card-actions horizontal align="right">
        <q-btn color="red" text-color="white"  class="g-header" label=" Hủy" v-close-popup />
        <q-btn color="black" text-color="white" type="submit" class="g-header" label=" Gửi" />
      </q-card-actions>
      <q-card-section class="lt-sm" style="min-height: 50vh"> </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
import noti from "../boot/noti/noti";
// import notiApi from "../boot/callApi/noti" ;
import userApi from "../boot/callApi/user" ;
export default {
  async created() {},
  components: {},
  computed: {
    ...mapGetters("User", ["user"]),
    ...mapGetters("NotiType", ["notiType"]),
  },
  data() {
    var noti = {
      title: "",
      email: "",
      content: "",
      noti_type_id: 1, //notication type ,
      room_id: "",
    };
    var userFind = null;
    return {
      noti,
      userFind,
    };
  },
  methods: {
    async findUser() {
      const user = await userApi.findUser(this.noti.email);
      this.userFind = user[0];
    },
    async sendNoti() {
      if(this.userFind == null) {
        noti.showNoti('Bạn nhập email và tìm kiếm mới có thể gửi thông báo', 'negative');
        return ;
      }
      const sended = await this.$api.post("sendNoti",{
        noti: this.noti ,
        receiver_id: this.userFind.id ,
      });
      let statusCode = sended.data.statusCode;
      if(statusCode ==1 ) noti.showNoti('Thành công','positive');
      else noti.showNoti('Thất bại','negative');

    }
  },
};
</script>

<style lang="sass" scoped>
.br
  padding: 3px 5px
  border-radius: 2px
  margin-top: 10px
  box-shadow: 0px 0px 5px $blue-3
</style>
