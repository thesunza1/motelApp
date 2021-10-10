<template>
  <div class="full-width">
    <div v-for="(roomType, index) in roomTypes" :key="index">
      <q-card class="my-card">
        <q-card-section class="text-center text-h6 text-white header-color">
          <div class="header-opacity">
            <q-icon name="store" style="font-size: 30px" />
            - {{ roomType.name }}
          </div>
        </q-card-section>
        <div class="full-width box-background">
          <q-card-section class="row items-center">
            <div class="q-ml-md col-4">
              <q-icon name="paid" class="size-icon" />-
              {{ roomType.cost }} vnd/p
            </div>
          </q-card-section>
          <q-card-section class="">
            <div class="q-ml-lg">
              <q-icon name="person" class="size-icon" /> đang ở:
            </div>
          </q-card-section>
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
      </q-card>
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
