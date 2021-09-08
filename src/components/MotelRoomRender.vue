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
            'bg-positive': roomStatus(room) == 'none',
            'bg-blue-7': roomStatus(room) == 'had',
            'bg-red': roomStatus(room) == 'disable',
          }"
          @click="openDialog(room)"
        >
          <div class="col-12">{{ room.name }}</div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="isNone">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          class="row pd full-width justify-center text-white bg-positive"
        >
          <div class="col-12 text-center text-h5">chi tiết phòng</div>
          <div class="col-12"><br /></div>
          <div class="col-11 align-left">phòng : {{ thisRoom.name }}</div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center">
          <q-select
            class="col-9 col-md-8"
            label="trạng thái phòng"
            filled
            v-model="thisStatus"
            :options="roomStatuses"
            option-value="id"
            option-label="name"
            emit-value
            map-options
          />
          <q-btn
            class="col-2"
            color="green-7"
            label="đổi"
            icon="check"
            @click="updateRoomStatus"
          />
          <div class="col-12"><br /></div>
          <div class="col-12">
            <find-user
              :userFind="userFind"
              @updateUserFind="updateUserFind"
            ></find-user>
          </div>
        </q-card-section>
        <q-card-section class="row full-width items-center pd justify-end">
          <q-btn
            color="orange-9"
            icon="add"
            label=" mời vào "
            @click="addUserToRoom()"
          />
        </q-card-section>
        <q-card-section>
          <div class="full-width mob"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isHad">
      <q-card class="modalb">
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDisable">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          class="row pd full-width justify-center text-white bg-red"
        >
          <div class="col-12 text-center text-h5">chi tiết phòng</div>
          <div class="col-12"><br /></div>
          <div class="col-11 align-left">phòng : {{ thisRoom.name }}</div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center">
          <q-select
            class="col-9 col-md-8"
            label="trạng thái phòng"
            filled
            v-model="thisStatus"
            :options="roomStatuses"
            option-value="id"
            option-label="name"
            emit-value
            map-options
          />
          <q-btn
            class="col-2"
            color="green-7"
            label="đổi"
            icon="check"
            @click="updateRoomStatus"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FindUser from "components/FindUser.vue";
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
    rooms: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isRoomDetail: false,
      isNone: false,
      isHad: false,
      isDisable: false,
      thisRoom: {},
      thisStatus: null,
      userFind: null,
    };
  },
  computed: {
    ...mapGetters("RoomStatuses", ["roomStatuses"]),
  },
  methods: {
    roomStatus(room) {
      return room.room_status.name;
    },
    openDialog(room) {
      let status_name = this.roomStatus(room);
      this.thisStatus = room.room_status.id;
      this.thisRoom = room;
      if (status_name == "none") {
        this.isNone = true;
      } else if (status_name == "had") this.isHad = true;
      else this.isDisable = true;
    },
    async updateRoomStatus() {
      // thisStatus
      const response = await this.$api.put(
        "updateRoomStatus/" + this.thisRoom.id,
        {
          roomStatusId: this.thisStatus,
        }
      );
      let statusCode = response.data.statusCode;
      if (statusCode == 0) {
        this.showNoti("khong thể đổi thành có người", "warning");
      } else if (statusCode == 1) {
        this.showNoti(" thành công", "info");
        const motel = await this.$api.get("getMotelRoomType");
        this.$store.dispatch("Motel/motel", motel.data.data);
        this.isNone = false;
        this.isHad = false;
        this.isDisable= false;
      }
    },
    updateUserFind(data) {
      this.userFind = data;
      console.log(data);
    },
    async addUserToRoom() {
      let roomId = this.thisRoom.id;
      if (this.userFind) {
        let userId = this.userFind.id;
        const response = await this.$api.post("sendInvite", {
          roomId: roomId,
          receiverId: userId,
        });
        let statusCode = response.data.statusCode;
        if (statusCode == 0)
          this.showNoti("lỗi: người được gửi là chủ trọ", "negative");
        else if (statusCode == 2)
          this.showNoti("lỗi: do người gửi là quản trị viên", "negative");
        else this.showNoti("thành công: chờ người dùng xác nhận", "info");
      } else {
        this.showNoti("bạn cần tìm người trọ trước", "negative");
      }
    },
  },
  components: {
    FindUser,
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
