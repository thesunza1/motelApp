<template>
  <div class="full-width ">
    <div class="bg-green-1" v-for="(roomType, index) in roomTypes" :key="index">
        <q-card-section class=" text-h6 text-positive">
          <div class="header-opacity">
            <q-icon name="store" style="font-size: 30px" />
             {{ roomType.name }}
          </div>
        </q-card-section>
        <div class="full-width">
          <q-card-section class="">
            <div
              class="full-width text-black"
              v-for="(room, index) in roomType.had_rooms"
              :key="index"
            >
              <admin-room-detail
                @openIsOutRoom="$emit('openIsOutRoom', $event)"
                class="mr"
                :room="room"
              ></admin-room-detail>
            </div>
          </q-card-section>
        </div>
      <div class="full-width"><br /></div>
    </div>
  </div>
</template>

<script>
import AdminRoomDetail from "./AdminRoomDetail.vue";
export default {
  props: {
    roomTypes: {
      type: Array,
      required: true,
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
