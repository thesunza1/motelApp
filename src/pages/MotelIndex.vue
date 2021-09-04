<template>
  <q-page class="row content-start" padding>
    <div class="col-12 row items-center fscr rtname"  >
      <q-btn class="col-5 col-md-3 mr" color="primary"  label="phòng"  />
      <q-btn
        class="col-5 col-md-4 mr"
        color="primary"
        label=" tiền phòng  "
      />
    </div>
    <div class="col-12"><br></div>
    <div class="col-12 row fscr">
      <div v-for="(room_type,index) in motel.room_types" :key="index" class="col-12 row pd roomsbg">
        <div class="col-12 text-h5" > {{ room_type.name }} </div>
        <motel-room-render :rooms="room_type.rooms"></motel-room-render>
        <div class="col-12"><br></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import MotelRoomRender from 'components/MotelRoomRender.vue'
export default {
  components: {
    MotelRoomRender,
  },
  computed: {
    ...mapGetters('Motel',['motel']),
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
