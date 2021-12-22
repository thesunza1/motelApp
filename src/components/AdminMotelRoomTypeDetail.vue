<template>
  <div class="full-width">
    <div
      v-for="(roomType, index) in roomTypes"
      :key="index"
      class="full-width row items-center"
    >
      <q-expansion-item
        expand-separator
        icon="home"
        :label="roomType.name"
        :caption="` Tổng số: ${lengthArr(roomType.rooms)} --- Trống: ${numRoom(
          roomType.rooms,
          1
        )} --- Không sử dụng: ${numRoom(
          roomType.rooms,
          3
        )} --- Có người: ${numRoom(roomType.rooms, 2)}  `"
        header-class="g-header-up bg-white q-py-md shadow-up-1 g-border text-primary text-bold"
        class="col-12 bg-green-1 g-border shadow-up-1 "
      >
        <br />
        <div class="col-12 row content-start">
          <div
            v-for="(room, index) in roomType.had_rooms"
            :key="index"
            class="col-4 row justify-center items-start content-start"
          >
            <admin-room-detail
              @openIsOutRoom="$emit('openIsOutRoom', $event)"
              class="q-mr-md full-width"
              :room="room"
            ></admin-room-detail>
            <br />
          </div>
        </div>
      </q-expansion-item>
      <div class="col-12"><br /></div>
    </div>
  </div>
</template>

<script>
import AdminRoomDetail from "./AdminRoomDetail.vue";
import sp from "../boot/support";
export default {
  props: {
    roomTypes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    lengthArr(arr) {
      return sp.length(arr);
    },
    numRoom( num, status) {
      return sp.numRoom(num,status);
    },


  },
  components: {
    AdminRoomDetail,
  },
};
</script>

<style lang="sass" scoped>
.size-icon
  font-size: 25px
.mr
  margin: 10px 0px
.box-background
  background-color: #BCBCBC
  color: white
  font-weight: 500
.header-color
  background-color: #8C8C8C
.header-opacity
  opacity: 0.89
</style>
