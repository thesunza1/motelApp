<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10">
      <div class="full-width">
        <motel-room-detail></motel-room-detail>
      </div>
      <!-- <div
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
        >
          <br />
          <div class="col-12 row items-start">
            <div
              v-for="(room, index) in roomType.rooms"
              :key="index"
              class="
                col-4 col-md-2
                row
                justify-center
                items-start
                content-start
              "
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
              <div class="col-12"><br /></div>
            </div>
          </div>
        </q-expansion-item>
        <div class="col-12"><br /></div>
      </div> -->
      <div class="col-12"><br /></div>
      <q-card class="col-12 g-border row">
        <q-card-section class="col-12">
          <div class="text-h5">Hình ảnh thiết bị trọ</div>
        </q-card-section>
        <div v-if="roomTypeUser" class="col-12 row items-center justify-around">
          <q-card class="my-card col-12 col-md-5">
            <q-card-section>
              <q-card-section class="col-9">
                <div class="">
                  <div class="text-h6" style="display: inline">
                    <q-icon name="fire_extinguisher" class="q-pb-sm g-icon-h1" />
                    Chữa cháy
                  </div>
                </div>
                <div class="">
                  <q-icon name="room" class="g-icon-h2" />
                  &nbsp; <b>Nơi Để:</b> {{ roomTypeUser.motel.motel_imgs[1].place }}
                </div>
              </q-card-section>
              <q-card-section class="row content-end justify-end">
                <q-img
                  style="height: 500px"
                  :src="
                    baseUrlImg + roomTypeUser.motel.motel_imgs[1].img_details[0]
                  "
                  @click="seeImg(roomTypeUser.motel.motel_imgs[1].img_details)"
                  spinner-color="primary"
                  spinner-size="82px"
                >
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ toLength(roomTypeUser.motel.motel_imgs[1].img_details) }}
                    ảnh
                  </div>
                </q-img>
              </q-card-section>
            </q-card-section>
          </q-card>
          <!-- <div class="col-2 gt-sm"></div> -->
          <div class="col-12 lt-md"><br /></div>
          <q-card class="my-card col-12 col-md-5">
            <q-card-section>
              <q-card-section class="col-9">
                <div class="">
                  <div class="text-h6" style="display: inline">
                    <q-icon name="home_repair_service" class="g-icon-h2" />
                    Sơ cứu
                  </div>
                </div>
                <div class="">
                  <q-icon name="room" class="g-icon-h2" />
                  &nbsp;<b>Nơi Để:</b> {{ roomTypeUser.motel.motel_imgs[2].place }}
                </div>
              </q-card-section>
              <q-card-section class="row content-end justify-end">
                <q-img
                  style="height: 500px"
                  :src="
                    baseUrlImg + roomTypeUser.motel.motel_imgs[2].img_details[0]
                  "
                  @click="seeImg(roomTypeUser.motel.motel_imgs[2].img_details)"
                  spinner-color="primary"
                  spinner-size="82px"
                >
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ toLength(roomTypeUser.motel.motel_imgs[2].img_details) }}
                    ảnh
                  </div>
                </q-img>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <q-card-section> </q-card-section>
      </q-card>
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
          rounded
          label="Báo cáo quản trị viên"
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
        <q-card-section
          class="row items-center justify-center content-start"
          v-if="thisRoom.room_status_id == 2"
        >
          <q-card
            v-for="(user, index) in thisRoom.tenant.infor_tenant_users"
            :key="index"
            class="my-card col-12 col-md-5"
            style="margin-bottom: 10px; margin-right: 10px"
          >
            <q-card-section class="row items-center">
              <div class="col-12 text-subtitle2">Tên: {{ user.user.name }}</div>
              <div class="col-12">Email: {{ user.user.email }}</div>
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
    <q-dialog v-model="seeImgs">
      <gobal-img-detail
        style="min-width: 90%"
        v-if="thisImg"
        :img_details="thisImg"
      ></gobal-img-detail>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
import MotelRoomDetail from "../components/MotelRoomDetail.vue";
import UserReport from "../components/UserReport.vue";
import GobalImgDetail from "../components/GobalImgDetail.vue";
import sp from "../boot/support";
export default {
  components: {
    MotelRoomDetail,
    UserReport,
    GobalImgDetail,
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
      seeImgs: false,
      baseUrlImg: this.$api.defaults.baseURL + "/image/",
      thisImg: null,
    };
  },
  methods: {
    openDialog(room) {
      this.thisRoom = room;
      this.isOpen = true;
    },
    seeImg(imgs) {
      this.seeImgs = true;
      this.thisImg = imgs;
      console.log(this.thisImg);
    },
    toLength(length) {
      return sp.length(length);
    },
  },
};
</script>

<style></style>
