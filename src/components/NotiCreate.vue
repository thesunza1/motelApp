<template>
  <q-card class="my-card full-width" style="max-height: 80vh">
    <q-form @submit="sendNoti" @reset="onReset" >
      <q-card-section class="bg-primary text-white text-h6 text-center">
        tạo thông báo
      </q-card-section>
      <q-card-section>
        <div class="row full-width items-center">
          <div class="col-md-5">tìm người nhận:</div>
          <div class="col-1"></div>
          <q-input
            class="col-5"
            v-model="noti.receiver_id"
            type="number"
            label="nhập id"
          />
          <q-btn
            class="col-1"
            color="primary"
            icon="search"
            @click="findUser"
          />
          <q-input
            class="col-12"
            v-model="noti.title"
            type="text"
            label=" tiêu đề"
            outlined
          />
          <q-input
            class="col-12"
            v-model="noti.content"
            type="textarea"
            label=" nội dung"
            outlined
          />
        </div>
        <div v-if="userFind" class="row full-width items-center br">
          <div class="col-3 text-h6">tên:</div>
          <div class="col-9 text-center">
            {{ userFind.name }}
          </div>
        </div>
      </q-card-section>
      <q-card-actions horizontal align="right">
        <q-btn color="secondary" text-color="white" type="submit" label=" gửi" />
      </q-card-actions>
      <q-card-section class="lt-sm" style="min-height: 50vh"> </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
import {useQuasar} from 'quasar'
export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mes,color){
      $q.notify({
        message: mes,
        color: color,
        position: 'top',
        timeout:1000,
      });
    }
    return {
      showNoti,
    }
  },
  async created() {},
  components: {},
  computed: {
    ...mapGetters("User", ["user"]),
    ...mapGetters("NotiType", ["notiType"]),
  },
  data() {
    var noti = {
      title: "",
      receiver_id: "",
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
      const user = await this.$api.get("findUser/" + this.noti.receiver_id);
      this.userFind = user.data.user;
    },
    async sendNoti() {
      const sended = await this.$api.post("sendNoti",{
        noti: this.noti ,
      });
      let statusCode = sended.data.statusCode;
      if(statusCode ==1 ) this.showNoti('thành công','info');
      else this.showNoti('thất bại','warning');

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
