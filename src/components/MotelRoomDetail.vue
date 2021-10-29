<template>
  <div class="full-width">
    <q-card v-if="roomTypeUser" class="my-card row">
      <q-card-section class="text-primary col-12">
        <div class="text-h6 text-center full-width">Chi tiết trọ</div>
      </q-card-section>
      <q-card-section class="row items-center col-md-6 col-12 ">
        <div class="col-12 col-md-5"><b>Tên trọ</b>: {{roomTypeUser.motel.name}}</div>
        <div class="col-12 col-md-7"><b> Địa chỉ</b>: {{roomTypeUser.motel.address}}</div>
      </q-card-section>
      <br>
      <q-card-section class="row items-center  col-md-6 col-12  ">
        <div class="col-12 col-md-5"> <b> Giờ đóng-mở</b>: {{roomTypeUser.motel.open}}h-{{roomTypeUser.motel.closed}}h</div>
        <div v-if="roomTypeUser.motel.camera ==1" class="col-12 col-md-2"> <b>Camera:</b> Có </div>
        <div v-else class="col-12 col-md-2">  <b>Camera:</b> Không </div>
      </q-card-section>
      <br>
      <q-card-section class="row items-center  col-md-6 col-12  ">
        <div class="col-6 col-md-3"> <b> Điện</b>: {{ toNum(roomTypeUser.motel.elec_cost)}} kwh</div>
        <div class="col-12 col-md-3"> <b>Nước</b>: {{ toNum(roomTypeUser.motel.water_cost)}} kwh</div>
        <div class="col-12 col-md-6"> <b> Phụ thu</b>: {{ toNum(roomTypeUser.motel.people_cost)}} Vnd</div>
      </q-card-section>
      <br>
      <q-card-section class="row items-center   col-md-6 col-12 ">
        <div class="col-12 col-md-4"> <b>Tên chủ:</b> {{roomTypeUser.motel.user.name}}</div>
        <div class="col-12 col-md-4"> <b>Email:</b> {{roomTypeUser.motel.user.email}}</div>
        <div class="col-12 col-md-4"> <b>Sdt:</b> {{roomTypeUser.motel.phone_number}}</div>
      </q-card-section>
    </q-card>
    <br>
  </div>
</template>

<script>
import {mapGetters} from  'vuex'
import sp from '../boot/support';
export default {
  setup() {

  },
  computed : {
    ...mapGetters('RoomTypeUser', ['roomTypeUser'])  ,

  },
  methods:{
    toNum(num){
      return sp.toNum(num);
    }
  }

}
</script>

<style>

</style>
