<template>
  <div class="row items-center" style="width: 100%">
    <div
      class="col-4 col-md-2 text-h4"
      v-for="(room, index) in rooms"
      :key="index"
    >
      <q-card class="my-card">
        <q-card-section
          class="text-white text-center rooms row justify-center items-center"
          :class="{
            'bg-green-6': roomStatus(room) == 'none',
            'bg-blue-5': roomStatus(room) == 'had',
            'bg-red-4': roomStatus(room) == 'disable',
          }"
          @click="gotoRoom(room)"
        >
          <div class="col-12">{{ room.name }}</div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="isDetailUser">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          class="row pd full-width justify-center text-white bg-positive"
        >
          <div class="col-12 text-center text-h5">chi tiết</div>
          <div class="col-12"><br /></div>
        </q-card-section>
        <q-card-section v-if="userFind" class="col-12 row justify-center">
          <div class="col-4 text-bold">Giới tính :</div>
          <div class="col-8">  {{ sex(userFind.sex) }}</div>
          <div class="col-4 text-bold">Tên :   </div>
          <div class="col-8 g-header-up">  {{ userFind.name }}</div>
          <div class="col-4 text-bold">Nghề nghiệp :  </div>
          <div class="col-8">  {{ userFind.job }}</div>
          <div class="col-4 text-bold"> Email:    </div>
          <div class="col-8"> {{ userFind.email }}</div>
          <div class="col-4 text-bold"> Điện thoại:    </div>
          <div class="col-8">    {{ userFind.phone_number }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 1000,
      });
    }
    return {
      showNoti,
    };
  },
  async created() {
    const roomStatus = await this.$api.get('roomStatuses');
    this.roomStatuses = roomStatus.data.data ;
  },
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      roomStatuses: {},
      isRoomDetail: false,
      isNone: false,
      isHad: false,
      isDisable: false,
      thisRoom: {},
      thisTenant: null,
      thisStatus: null,
      userFind: null,
      isDetailUser: false,
    };
  },
  computed: {
    ...mapGetters("RoomStatuses", ["roomStatuses"]),
  },
  methods: {
    roomStatus(room) {
      return room.room_status.name;
    },
    //new
    gotoRoom(room) {
      this.$router.push({name: 'motelRoomDetail' , params: {roomId : room.id }});
    },
    //old



  },
  components: {
  },
};
</script>

<style scoped lang='sass'>
$fontSize: 20px
.my-card
  // height: 130px
  margin: 10px 10px

.rooms
  height: 70px
.modalb
  min-width: 95vw
@media (min-width: 1026px)
  .rooms
    height: 150px
  .modalb
    min-width: 75vw
.pd
  padding: 10px 20px
.fs
  font-size: $fontSize
.br
  border-radius: 10px
.mr
  margin: 10px !important
.mob
  height: 10vh
</style>
