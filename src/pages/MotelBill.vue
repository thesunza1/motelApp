<template>
  <q-page class="row content-start" padding>
    <div class="col-12 row items-center fscr rtname">
      <q-tabs align="left">
        <q-route-tab :to="{name:'all'}" class="g-header" icon="home" label="Danh sách loại phòng" />
        <q-route-tab :to="{name:'bill'}" class="g-header" icon="paid" label="Tiền phòng " />
      </q-tabs>
    </div>
    <div class="col-12"><br /></div>
    <div class="col-12">
      <q-btn class="g-header" outline color="primary" label="Gửi thông báo toàn trọ" @click="isSended = true " />
    </div>
    <div class="col-12"><br></div>
    <div class="col-12 row fscr">
      <motel-bill-room-render :motel_id="motel.id"></motel-bill-room-render>
      <div class="col-12"><br /></div>
    </div>
    <q-dialog v-model="isSended" >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-subtitle2"> Bạn có muốn gửi thông báo cho toàn bộ trọ hay không?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" Hủy"  class="g-header" color="negative" v-close-popup />
          <q-btn flat label=" Gửi" color="primary" class="g-header" v-close-popup @click="sendAllNotiBill()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import MotelBillRoomRender from "components/MotelBillRoomRender.vue";
import motelApi from "../boot/callApi/motel";
import noti from "../boot/noti/noti";
export default {
  components: {
    MotelBillRoomRender,
  },
  computed: {
    ...mapGetters("Motel", ["motel"]),
  },
  data() {
    return {
      isSended : false ,
    }
  },
  methods: {
    async sendAllNotiBill() {
      const sended = await motelApi.sendAllNotiBill(this.motel.id);
      if(sended.statusCode == 1 ){
        noti.showNoti('thành công','positive');
      }
    }
  }
};
</script>

<style scoped lang='sass'>
.mr
  margin: 0px 5px

.fscr
  width: 100%
.rtname
  height: 5%

.pd
  padding: 10px
  margin-bottom: 20px
  border-radius: 3px
  box-shadow: 0px 1px 2px gray
.roomsbg
  background-color: #CDD9E0
</style>
