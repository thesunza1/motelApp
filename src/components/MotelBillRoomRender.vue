<template>
  <div class="row items-center" style="width: 100%">
    <div v-if="allBillRoom" class="col-12 row items-center">
      <div
        v-for="(room_type, index) in allBillRoom"
        :key="index"
        class="col-12 row pd roomsbg"
      >
        <div class="col-12 text-h5">{{ room_type.name }}</div>
        <div
          class="col-4 col-md-2 text-h4"
          v-for="(room, index) in room_type.had_rooms"
          :key="index"
        >
          <q-card class="my-card">
            <q-card-section
              class="
                text-white text-center
                rooms
                row
                justify-center
                items-center
              "
              :class="{
                'bg-blue-6': room.tenant.bill_num == 0,
                'bg-red-7': room.tenant.no_bills > 0,
                'bg-deep-orange-7':
                  room.tenant.no_bills == 0 &&
                  room.tenant.bill_num > 0,
              }"
              @click="openDialog(room)"
            >
              <div class="col-12">{{ room.name }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12"><br /></div>
      </div>
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
          >
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-footer class="bg-grey-1 row items-center justify-center">
      <div class="col-3">
        <q-btn
          color="primary"
          icon="add"
          label=" tạo bill toàn trọ"
          @click="createAllBill"
        />
      </div>
      <div class="col-3">
        <q-btn
          color="primary"
          icon="add"
          label=" tạo bill theo phòng"
          @click="onClick"
        />
      </div>
      <div class="col-12"><br /></div>
    </q-footer>
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
  props: {
    motel_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isRoomDetail: false,
      thisRoom: {},
      userFind: null,
      allBillRoom: null,
    };
  },
  computed: {
    ...mapGetters("RoomStatuses", ["roomStatuses"]),
  },
  methods: {
    roomStatus(room) {
      return room.room_status.name;
    },
    createAllBill()  {
      const allbill = this.$api.post('createAllBill');

    }
  },
  components: {},
  async created() {
    console.log(this.motel_id);
    const bills = await this.$api.get("getBillAllRoom");
    if (bills.data.statusCode == 1) {
      this.allBillRoom = bills.data.allBillRoom;
    }
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
