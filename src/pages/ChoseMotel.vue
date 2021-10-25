<template>
 <q-page  padding>
   <!-- <div class="full-width text-h6 text-center text-primary">
     Danh sách trọ
   </div> -->
   <div class="row full-width justify-center" v-if="motels">
    <q-card v-for="(motel, index) in motels" :key="index" class="my-card col-md-6 col-12 g-border">
      <q-card-section>
        <div class="text-h6 text-center text-primary g-header-up">
          {{motel.name }}
        </div>
        <div class="text-subtitle2">
          <b>Địa chỉ:</b> {{motel.address  }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row full-width">
          <div class="col-6">
            <b>Đặt cọc:</b> {{motel.deposit  }} Vnd
          </div>
          <div class="col-6">
            <b>Phụ thu:</b> {{motel.deposit  }} Vnd
          </div>
        </div>
        <div class="row full-width">
          <div class="col-6">
            <b>Giá Điện:</b> {{motel.elec_cost  }} Vnd/Kwh
          </div>
          <div class="col-6">
            <b>Giá nước:</b> {{motel.deposit  }} Vnd/M3
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2 text-primary"> Danh sách loại Phòng</div>
        <div class="row items-center q-pt-sm">
          <div class="col-2 text-bold">Stt</div>
          <div class="col-7 text-bold"> Tên loại</div>
          <div class="text-bold"> tổng số phòng</div>
        </div>
        <div v-for="(roomType , index ) in motel.room_types" :key="index" class="row items-center">
          <div class="col-2"> {{ ++index}}</div>
          <div class="col-7 g-header-up"> {{ roomType.name}}</div>
          <div class="text-right col-1"> {{countRoom(roomType.rooms)  }} </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" rounded no-caps icon="arrow_forward" label=" Quản lý" @click="goMotel(motel.id)" />
      </q-card-actions>
    </q-card>

   </div>
  </q-page>
</template>

<script>
import motelApi from '../boot/callApi/motel' ;
import sp from '../boot/support' ;
export default {
  data() {
    return {
      motels : null,
    }
  },
  async created(){
    const resMotels = await motelApi.getMotels() ;
    this.motels=  resMotels.motels;
  },
  methods: {
    countRoom(roomType){
      return sp.length(roomType);
    },
    goMotel(motelId) {
      this.$router.push({name: 'all' , params: {motelId: motelId }});
    }
  }
}
</script>

<style>

</style>
