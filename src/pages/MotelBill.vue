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
      <q-btn color="orange" label="gửi thông báo toàn trọ" @click="isSended = true " />
    </div>
    <div class="col-12 row fscr">
      <motel-bill-room-render :motel_id="motel.id"></motel-bill-room-render>
      <div class="col-12"><br /></div>
    </div>
    <q-dialog v-model="isSended" >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"> bạn có muốn gửi thông báo cho toàn bộ trọ hay không</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" thoát" color="negetive" v-close-popup />
          <q-btn flat label="oke" color="primary" v-close-popup @click="sendAllNotiBill()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import MotelBillRoomRender from "components/MotelBillRoomRender.vue";
import {  useQuasar} from 'quasar'
export default {
  setup(){
    const $q = useQuasar() ;

    function showNoti(mess, col ) {
      $q.notify({
        color:col ,
        message:mess,
        position:'top',
      });
    }
    return {
      showNoti,
    }
  },
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
      const sended = await this.$api.get('sendAllNotiBill/'+this.motel.id);
      if(sended.data.statusCode == 1 ){
        this.showNoti('thành công','positive');
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
