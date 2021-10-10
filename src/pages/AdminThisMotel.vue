<template>
  <q-page padding class="row justify-center">
    <div class="col-10">
      <div class="full-width" v-if="motel">
        <q-card class="my-card">
          <q-card-section class="text-h6 text-center header-color">
            <div>
              <q-icon name="holiday_village" style="font-size: 30px" />
              Trọ
            </div>
          </q-card-section>
          <q-card-section
            class="row justify-center items-center contents-start size-word"
          >
            <div class="col-12">
              <div class="col-4">
                <q-icon name="home" class="text-positive size-icon" />:
                <b>id:</b> {{ motel.id }}
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <q-icon name="home" class="text-positive size-icon" />:
                {{ motel.name }}
              </div>
              <div>
                <q-icon name="room" class="text-positive size-icon" />:
                {{ motel.address }}
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <q-icon name="phone" class="text-positive size-icon" />:
                {{ motel.phone_number }}
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <q-icon name="camera" class="text-positive size-icon" />-
                {{ motel.camera == 1 ? "có camera" : "không camera" }}
              </div>
              <div class="col-4">
                <q-icon name="garage" class="text-positive size-icon" />-
                {{ motel.parking }}
              </div>
              <div class="col-4">
                <q-icon name="lock_clock" class="text-positive size-icon" />:
                {{ motel.open }}h - {{ motel.closed }}h
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <q-icon name="bolt" class="text-positive size-icon" /> điện-
                {{ motel.elec_cost }} vnd/kwh
              </div>
              <div class="col-4">
                <q-icon name="water_drop" class="text-positive size-icon" />
                nước- {{ motel.water_cost }} vnd/m3
              </div>
              <div class="col-4">
                <q-icon name="kitesurfing" class="text-positive size-icon" />
                thuế người- {{ motel.people_cost }} vnd/m3
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card">
          <q-card-section class="text-h6 text-center header-color">
            <div>
              <q-icon name="person" style="font-size: 30px" />
              Chủ
            </div>
          </q-card-section>
          <q-card-section
            class="row justify-center items-center contents-start size-word"
          >
            <div class="col-12">
              <div class="col-4">
                <q-icon name="face" class="text-positive size-icon" />:
                <b>id:</b> {{ motel.user.id }}
              </div>
              <div class="col-4">
                <q-icon name="email" class="text-positive size-icon" />:
                <b>email:</b> {{ motel.user.email }}
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <q-icon name="face" class="text-positive size-icon" />:
                {{ motel.user.name }}
              </div>
              <div>
                <q-icon name="room" class="text-positive size-icon" />:
                {{ motel.user.address }}
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <q-icon name="phone" class="text-positive size-icon" />:
                {{ motel.user.phone_number }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card">
          <q-card-section class="text-h6 header-color">
            <q-icon name="maps_home_work" style="font-size: 30px" />
            Loại phòng
          </q-card-section>
          <q-card-section>
            <admin-motel-room-type-detail
              :roomTypes="roomTypes"
              @openIsOutRoom="openIsOutRoom($event)"
            ></admin-motel-room-type-detail>
          </q-card-section>
        </q-card>

        <q-footer class="bg-white">
          <q-card-actions align="center">
            <q-btn
              color="positive"
              icon="arrow_back"
              label=" trở về"
              @click="$router.go(-1)"
            />

            <q-btn
              color="primary"
              icon="feedback"
              label=" thông báo"
              @click="isCreate = true"
            />
            <q-btn
              color="negative"
              icon="delete"
              label=" xóa trọ"
              @click="isDelete = true"
            />
          </q-card-actions>
        </q-footer>
      </div>

      <q-dialog v-model="isCreate">
        <admin-noti-create></admin-noti-create>
      </q-dialog>
      <q-dialog v-model="isDelete">
        <q-card>
          <q-card-section class="bg-negative text-white text-h6 text-center">
            bạn có muốn xóa trọ vĩnh viễn
          </q-card-section>
          <q-card-section class="text-center">
            xóa trọ , phòng , bài viết và đưa các user đang ở ra khỏi trọ , khi
            đồng ý sẽ không thể quay lại ?
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div>gõ YES để xác nhận :</div>
            <q-input style="width: 30%" v-model="textDeleteYes" type="text" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="red" v-close-popup />
            <q-btn
              v-if="isDeleteYes"
              flat
              label=" xác nhận"
              color="primary"
              v-close-popup
              @click="deleteMotel()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="isOutRoom" persistent>
        <q-card>
          <q-card-section class="text-center text-h6 bg-warning text-white">
            <q-icon name="warning" /> cảnh báo
          </q-card-section>
          <q-card-section v-if="thisUser">
            bạn có muốn đưa người dùng
            <b> {{ thisUser.id }} -{{ thisUser.name }} </b> ra khỏi trọ không
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label=" thoát" color="primary" v-close-popup />
            <q-btn
              flat
              label=" đồng ý "
              color="primary"
              v-close-popup
              @click="outRoom()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import adminMotel from "../boot/callApi/adminMotel";
import adminRoom from "../boot/callApi/adminRoom";
import { useQuasar } from "quasar";

import AdminMotelRoomTypeDetail from "../components/AdminMotelRoomTypeDetail.vue";
import AdminNotiCreate from "../components/AdminNotiCreate.vue";
export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 3000,
      });
    }
    function noti(statusCode) {
      if (statusCode == 1) {
        this.showNoti("thành công", "positive");
      } else if (statusCode == 2) {
        this.showNoti(" Không tìm thấy trọ", "dark");
      } else {
        this.showNoti(" thất bại", "negative");
      }
    }
    return {
      showNoti,
      noti,
    };
  },
  async created() {
    const res = await adminMotel.getMotel(this.motelId);

    if (res?.statusCode) {
      this.publicImgs = res.publicImgs;
      this.motel = res.motel;
      this.roomTypes = res.roomTypes;
      this.roomTypeImgs = res.roomTypeImgs;
    }
    console.table(this.publicImgs);
    console.table(this.motel);
    console.table(this.roomTypes);
    console.table(this.roomTypeImgs);
  },
  data() {
    return {
      motelId: this.$route.params.motelId,
      motel: null,
      publicImgs: null,
      roomTypeImgs: null,
      roomTypes: null,
      isCreate: false,
      isDelete: false,
      isOutRoom: false,
      thisUser: null,
      isDeleteYes: false,
      textDeleteYes: "",
    };
  },
  components: {
    AdminMotelRoomTypeDetail,
    AdminNotiCreate,
  },
  watch: {
    textDeleteYes(newVal) {
      if (newVal == "YES") {
        this.isDeleteYes = true;
      }
    },
  },
  methods: {
    openIsOutRoom(data) {
      this.thisUser = data;
      this.isOutRoom = true;
    },
    async deleteMotel() {
      const res = await adminMotel.deleteMotel(this.motelId);
      this.noti(res.statusCode);
      if (res.statusCode == 1) {
        this.$router.go(-1);
      }
    },
    async outRoom() {
      const res = await adminRoom.outRoom(this.thisUser.id);
      this.noti(res.statusCode);
      this.reload() ;
    },
    async reload() {
      const res = await adminMotel.getMotel(this.motelId);

      if (res?.statusCode) {
        this.publicImgs = res.publicImgs;
        this.motel = res.motel;
        this.roomTypes = res.roomTypes;
        this.roomTypeImgs = res.roomTypeImgs;
      }
      return ;
    },
  },
};
</script>

<style lang="sass" scoped>
.mr-div
  margin: 10px 0px
.size-icon
  font-size: 25px
.size-word
  font-size: 20px
.header-color
  background-color: #00E676
  color: white
</style>
