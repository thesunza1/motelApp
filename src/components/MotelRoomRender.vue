<template>
  <div class="row items-center" style="width: 100%">
    <div
      class="col-3 col-md-3 text-h4"
      v-for="(room, index) in rooms"
      :key="index"
    >
      <q-card class="my-card">
        <q-card-section class=" text-white text-center" :class="{'bg-positive' : roomStatus(room) == 'none'}">
          {{ room.name}}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isRoomDetail: false ,
    }
  },
  methods: {
    roomStatus(room){
      return room.room_status.name
    }
  }
};
</script>

<style scoped lang='sass'>
.my-card
  // height: 130px
  margin: 10px 10px
</style>
