<template>
  <q-page class="row content-start" padding>
    <div class="col-12 row items-center fscr rtname">
      <q-tabs align="left">
        <q-route-tab to="motel/all" label="phòng" />
        <q-route-tab to="motel/bill" label=" tiền phòng " />
      </q-tabs>
    </div>
    <div class="col-12" ><br /></div>
    <div class="col-12" style="padding:2px">
      <q-card class="my-card row full-width justity-center items-center" style="min-height:70px">
        <q-card-section class="col-2 bg-blue-7 "  style="min-height:70px">
        </q-card-section>
        <q-card-section >
         phòng chưa có bill nào
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12" style="padding:2px">
      <q-card class="my-card row full-width justity-center items-center" style="min-height:70px">
        <q-card-section class="col-2 bg-red-7 "  style="min-height:70px">
        </q-card-section>
        <q-card-section >
         có bill và có bill chưa thanh toán
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12" style="padding:2px">
      <q-card class="my-card row full-width justity-center items-center" style="min-height:70px">
        <q-card-section class="col-2  bg-deep-orange-7 "  style="min-height:70px">
        </q-card-section>
        <q-card-section >
         có  bill và tất cả  bill đã trả thanh toán
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 row fscr">
      <motel-bill-room-render :motel_id="motel.id"></motel-bill-room-render>
      <div class="col-12"><br /></div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import MotelBillRoomRender from "components/MotelBillRoomRender.vue";
export default {
  components: {
    MotelBillRoomRender,
  },
  computed: {
    ...mapGetters("Motel", ["motel"]),
  },
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
