<template>
 <q-card class="my-card">
   <q-card-section class="row items-center justify-start " style="font-size:22px">
     <div class="col-5">
       <q-icon name="apartment" /> <p style="display: inline" class="g-header-up"> {{motel.name}}</p>
     </div>
     <div class="col-5">
       <q-icon name="room" /> <p style="display: inline"> {{motel.address}}</p>
     </div>
     <div class="col-12"><br></div>
     <div class="col-5">
       <b>Chủ trọ: </b><p style="display:inline" class="g-header-up"> {{motel.user.name}}</p>
     </div>
     <div class="col-5">
       <b>Email: </b> <p style="display:inline"> {{motel.user.email}}</p>
     </div>
     <div class="col-2">
       <b>Điện thoại: </b> <p style="display: inline"> {{motel.phone_number}}</p>
     </div>
     <div class="col-12"><br></div>
     <div class="col-12 row items-center">
       <div class="col-5">
         <b>Giá điện :</b> {{toPrice(motel.elec_cost) }} Vnd
       </div>
       <div class="col-5">
         <b>Giá nước :</b> {{toPrice(motel.water_cost) }} Vnd
       </div>
       <div class="col-2">
         <b>Đặt cọc :</b> {{toPrice(motel.deposit) }} Vnd
       </div>
     </div>
   </q-card-section>
 </q-card>
</template>

<script>
import sp  from "../boot/support" ;
export default {
  props: {
    motel: {
      type: Object,
      required: true,
    }
  },
  methods: {
    toPrice(val) {
     return sp.toNum(val) ;
    }
  }
}
</script>

<style>

</style>
