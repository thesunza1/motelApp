<template>
  <q-page padding>
    <div class="full-width">
      <motel-room-detail></motel-room-detail>
    </div>
    <div
      v-for="(roomType, index) in inforShareRoom"
      :key="index"
      class="full-width row items-center"
    >
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        :label="roomType.name"
        header-class="g-header-up bg-white q-py-md shadow-up-1 g-border"
        class="col-12 bg-white"
        default-opened
      >
        <br>
        <div class="col-12 row items-center">
          <div
            v-for="(room, index) in roomType.rooms"
            :key="index"
            class="col-4 col-md-3 row justify-center items-center"
          >
            <q-card
              class="my-card col-11"
              :class="
                room.room_status_id != 2 ? bgCard(room.room_status_id) : ''
              "
              style="min-height: 100px"
            >
              <q-card-section
                class="
                  text-white text-center
                  rooms
                  row
                  justify-center
                  items-center
                "
                :class="bgCard(room.room_status_id)"
                @click="openDialog(room)"
              >
                <div class="col-12">Phòng : {{ room.name }}</div>
              </q-card-section>
              <q-card-section v-if="room.room_status_id == 2">
                <div
                  v-for="(user, index) in room.tenant.infor_tenant_users"
                  :key="index"
                  class="g-header-up"
                >
                  Tên: {{ user.user?.name }}
                </div>
              </q-card-section>
            </q-card>
            <div class="col-12"  ><br /></div>
          </div>
        </div>
      </q-expansion-item>
      <div class="col-12 " ><br /></div>
    </div>
    <q-footer
      class="col-12 row justify-center items-center bg-blue-2 pd"
      v-model="footer"
    >
      <q-card-actions align="center">
        <q-btn
          no-caps
          color="negative"
          icon="person"
          label=" Báo cáo"
          @click="isReport = true"
        />
      </q-card-actions>
    </q-footer>

    <q-dialog v-if="thisRoom" v-model="isOpen">
      <q-card style="min-width: 60%" class="g-border">
        <q-card-section
          class="row items-center"
          :class="bgCard(thisRoom.room_status_id)"
        >
          <div class="col-12 text-center text-h6 text-white">
            Chi tiết phòng {{ thisRoom.name }}
          </div>
        </q-card-section>
        <q-card-section v-if="thisRoom.room_status_id == 1">
          Phòng trống
        </q-card-section>
        <q-card-section v-if="thisRoom.room_status_id == 2">
          <q-card
            v-for="(user, index) in thisRoom.tenant.infor_tenant_users"
            :key="index"
            class="my-card"
            style="margin-bottom: 10px"
          >
            <q-card-section class="row items-center">
              <div class="col-12 text-subtitle2">
                Tên: {{ user.user.name }}
              </div>
              <div class="col-12">Email: {{user.user.email}}</div>
              <div class="col-12">Sdt: {{ user.user.phone_number }}</div>
              <div class="col-12">Ngành nghề: {{ user.user.job }}</div>

            </q-card-section>
          </q-card>
          <div><br /></div>
        </q-card-section>
        <q-card-section v-if="thisRoom.room_status_id == 3">
          Phòng đang sửa chữa .
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isReport">
      <user-report
        style="min-width: 70%"
        :type="2"
        :motelId="roomTypeUser.motel.id"
      ></user-report>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
import MotelRoomDetail from "../components/MotelRoomDetail.vue";
import UserReport from "../components/UserReport.vue";
export default {
  components: {
    MotelRoomDetail,
    UserReport,
  },
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        color: col,
        message: mess,
        position: "top",
        timeout: 2000,
      });
    }
    function toDate(date) {
      return date.slice(0, 10);
    }
    function toSex(sex) {
      if (sex == 0) return "Nam";
      else return "Nữ";
    }
    function bgCard(status) {
      return status == 1
        ? "bg-green-5"
        : status == 2
        ? "bg-blue-5"
        : "bg-red-4";
    }
    return {
      showNoti,
      toDate,
      toSex,
      bgCard,
    };
  },
  computed: {
    ...mapGetters("InforShareRoom", ["inforShareRoom"]),
    ...mapGetters("RoomTypeUser", ["roomTypeUser"]),
  },
  data() {
    return {
      thisRoom: null,
      isOpen: false,
      isReport: false,
    };
  },
  methods: {
    openDialog(room) {
      this.thisRoom = room;
      this.isOpen = true;
    },
  },
};
</script>

<style></style>
