<template>
  <div class="full-width">
    <q-card v-if="roomTypeUser" class="my-card">
      <q-card-section class="bg-accent">
        <div class="text-subtitle2 text-center full-width ">chi tiết trọ</div>
      </q-card-section>
      <q-card-section class="row justity-center items-center text-center">
        <div class="col-12 col-md-5"><b>tên trọ</b>: {{roomTypeUser.motel.name}}</div>
        <div class="col-12 col-md-7"><b> địa chỉ</b>: {{roomTypeUser.motel.address}}</div>
      </q-card-section>
      <hr>
      <q-card-section class="row justity-center items-center text-center ">
        <div class="col-12 col-md-5"> <b> giờ đóng-mở</b>: {{roomTypeUser.motel.open}}h-{{roomTypeUser.motel.closed}}h</div>
        <div v-if="roomTypeUser.motel.camera ==1" class="col-12 col-md-2"> có camera</div>
        <div v-else class="col-12 col-md-2">  không camera</div>
      </q-card-section>
      <hr>
      <q-card-section class="row justity-center items-center text-center ">
        <div class="col-6 col-md-3"> <b>điện</b>: {{roomTypeUser.motel.elec_cost}}kwh</div>
        <div class="col-6 col-md-3"> <b>nước</b>: {{roomTypeUser.motel.water_cost}}kwh</div>
        <div class="col-12 col-md-6"> <b>người</b>: {{roomTypeUser.motel.people_cost}}</div>
      </q-card-section>
      <hr>
      <q-card-section class="row justity-center items-center text-center ">
        <div class="col-12 text-subtitle2"> chủ trọ </div>
        <div class="col-12 col-md-5">id: {{roomTypeUser.motel.user_id}}</div>
        <div class="col-12 col-md-7">sdt: {{roomTypeUser.motel.phone_number}}</div>
      </q-card-section>
    </q-card>
    <br>
  </div>
</template>

<script>
import {mapGetters} from  'vuex'
export default {
  setup() {

  },
  computed : {
    ...mapGetters('RoomTypeUser', ['roomTypeUser'])  ,

  },

}
</script>

<style>

</style>
