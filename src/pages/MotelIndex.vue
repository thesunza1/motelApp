<template>
  <q-page class="row content-start" padding>
    <div class="col-12 row items-center fscr rtname">
      <q-tabs align="left">
        <q-route-tab :to="{name:'all'}" class="g-header" icon="home" label="Danh sách loại phòng" />
        <q-route-tab :to="{name:'bill'}" class="g-header" icon="paid" label="Tiền phòng " />
      </q-tabs>
    </div>
    <div class="col-12"><br /></div>
    <div class="col-12 row fscr">
      <div
        v-for="(room_type, index) in motel.room_types"
        :key="index"
        class="col-12 row pd roomsbg shadow-up-3"
      >
        <q-expansion-item
          expand-separator
          icon="store"
          :label="` ${room_type.name}`"
          :caption="` Tổng số: ${lengthArr(room_type.rooms)} --- Trống: ${numRoom(room_type.rooms,1)} --- Không sử dụng: ${numRoom(room_type.rooms,3)} --- Có người: ${numRoom(room_type.rooms,2)}  `"
          header-class="text-primary g-icon-h1 g-header-up"
          class="full-width"
        >
          <motel-room-render :rooms="room_type.rooms"></motel-room-render>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import sp from "../boot/support";
import { mapGetters } from "vuex";
import MotelRoomRender from "components/MotelRoomRender.vue";
export default {
  components: {
    MotelRoomRender,
  },
  computed: {
    ...mapGetters("Motel", ["motel"]),
  },
  methods: {
    lengthArr(arr) {
      return sp.length(arr);
    },
    numRoom(rooms ,status) {
      return sp.numRoom(rooms,status);
    }
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
.roomsbg
  background-color: white
</style>
