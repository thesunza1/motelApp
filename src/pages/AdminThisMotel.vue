<template>
  <q-page padding class="row justify-center">
    <q-drawer
      side="left"
      v-model="drawerLeft"
      bordered
      :width="300"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <br />
      <q-item clickable @click="goto('motelInfor')">
        <q-item-section top avatar>
          <q-avatar color="black" text-color="white" icon="holiday_village" />
        </q-item-section>
        <q-item-section>
          <div>Thông tin trọ</div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('userInfor')">
        <q-item-section top avatar>
          <q-avatar color="black" text-color="white" icon="person" />
        </q-item-section>
        <q-item-section>
          <div>Thông tin chủ</div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('locationInfor')">
        <q-item-section top avatar>
          <q-avatar color="black" text-color="white" icon="room" />
        </q-item-section>
        <q-item-section>
          <div>Vị trí trọ</div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('roomTypeInfor')">
        <q-item-section top avatar>
          <q-avatar color="black" text-color="white" icon="apartment" />
        </q-item-section>
        <q-item-section>
          <div>Danh sách loại phòng</div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('motelImgsInfor')">
        <q-item-section top avatar>
          <q-avatar color="black" text-color="white" icon="camera" />
        </q-item-section>
        <q-item-section>
          <div>Hình ảnh trọ</div>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('roomTypeImgsInfor')">
        <q-item-section top avatar>
          <q-avatar color="black" text-color="white" icon="camera" />
        </q-item-section>
        <q-item-section>
          <div>Hình ảnh phòng</div>
        </q-item-section>
      </q-item>
    </q-drawer>
    <div class="col-11">
      <q-card-actions align="left">
        <q-btn rounded icon="menu" @click="drawerLeft = !drawerLeft" />
      </q-card-actions>
      <div class="full-width" v-if="motel">
        <q-card class="my-card g-border" id="motelInfor">
          <q-card-section class="text-h6">
            <div>
              <q-icon name="holiday_village" style="font-size: 30px" />
              Thông tin trọ
            </div>
          </q-card-section>
          <q-card-section
            class="row justify-center items-center contents-start size-word"
          >
            <div class="col-8 row items-center mr">
              <div class="col-6">
                <q-icon name="home" class="text-positive size-icon" />
                {{ motel.name }}
              </div>
              <div class="col-6">
                <q-icon name="room" class="text-positive size-icon" />
                {{ motel.address }}
              </div>
            </div>
            <div class="col-4 row items-center mr">
              <div class="col-12">
                <q-icon name="phone" class="text-positive size-icon" />
                {{ motel.phone_number }}
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row items-center mr">
              <div class="col-4 text-bold">
                {{ motel.camera == 1 ? "Camera: có" : "Camera: không" }}
              </div>
              <div class="col-4"><b>Nơi để xe máy:</b> {{ motel.parking }}</div>
              <div class="col-4">
                <b>Giờ đóng mở cổng:</b>
                {{ motel.open }}h - {{ motel.closed }}h
              </div>
            </div>
            <div class="col-12 row items-center mr">
              <div class="col-4">
                <b>Giá điện:</b>
                {{ motel.elec_cost }} Vnd/kwh
              </div>
              <div class="col-4">
                <b>Giá Nước:</b> {{ motel.water_cost }} Vnd/m3
              </div>
              <div class="col-4">
                <b>Phụ thu theo người:</b> {{ motel.people_cost }} Vnd/m3
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card g-border" id="userInfor">
          <q-card-section class="text-h6">
            <div>
              <q-icon name="person" style="font-size: 30px" />
              Thông tin chủ trọ
            </div>
          </q-card-section>
          <q-card-section class="row items-center contents-start size-word">
            <div class="col-4">
              <div class="col-12">
                <q-icon name="email" class="text-positive size-icon" />
                {{ motel.user.email }}
              </div>
            </div>
            <div class="col-4 g-header-up">
              <q-icon name="face" class="text-positive size-icon" />
              {{ motel.user.name }}
            </div>
            <div class="col-12"></div>
            <div class="col-4 row items-center mr">
              <div>
                <q-icon name="room" class="text-positive size-icon" />
                {{ motel.user.address }}
              </div>
            </div>
            <div class="col-6 row items-center mr">
              <div class="col-4">
                <q-icon name="phone" class="text-positive size-icon" />
                {{ motel.user.phone_number }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card g-border" id="locationInfor">
          <q-card-section class="text-h6">
            <q-icon name="room" style="font-size: 30px" />
            Vị Trí trọ
          </q-card-section>
          <q-card-section>
            <motel-location></motel-location>
            <search-show-map :center="center"></search-show-map>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card g-border" id="roomTypeInfor">
          <q-card-section class="text-h6">
            <q-icon name="maps_home_work" style="font-size: 30px" />
            Danh sách loại phòng
          </q-card-section>
          <q-card-section>
            <admin-motel-room-type-detail
              :roomTypes="roomTypes"
              @openIsOutRoom="openIsOutRoom($event)"
            ></admin-motel-room-type-detail>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card g-border" id="motelImgsInfor">
          <q-card-section class="text-h6">
            <q-icon name="home" style="font-size: 30px" />
            Hình ảnh chung trọ
          </q-card-section>
          <q-card-section>
            <admin-public-infor :publicImgs="publicImgs"></admin-public-infor>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-card class="my-card g-border" id="roomTypeImgsInfor">
          <q-card-section class="text-h6">
            <q-icon name="camera" style="font-size: 30px" />
            Hình ảnh loại phòng
          </q-card-section>
          <q-card-section>
            <admin-room-type-infor
              :roomTypes="roomTypeImgs"
            ></admin-room-type-infor>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <q-footer class="bg-white">
          <q-card-actions align="center">
            <q-btn
              no-caps
              rounded
              color="positive"
              icon="arrow_back"
              label="Trở về "
              @click="$router.go(-1)"
            />
            <q-btn
              no-caps
              rounded
              color="primary"
              icon="feedback"
              label="Thông báo "
              @click="isCreate = true"
            />
            <q-btn
              no-caps
              rounded
              color="negative"
              icon="delete"
              label="Xóa trọ "
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
            Bạn có muốn xóa trọ vĩnh viễn
          </q-card-section>
          <q-card-section class="text-center">
            Xóa trọ , phòng , bài viết và đưa các user đang ở ra khỏi trọ , khi
            đồng ý sẽ không thể quay lại ?
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div>Gõ YES để xác nhận :</div>
            <q-input style="width: 30%" v-model="textDeleteYes" type="text" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="red" v-close-popup />
            <q-btn
              v-if="isDeleteYes"
              flat
              label=" Xác nhận"
              no-caps
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
            <q-icon name="warning" /> Cảnh báo
          </q-card-section>
          <q-card-section v-if="thisUser">
            Bạn có muốn đưa người dùng
            <b> {{ thisUser.name }} </b> Ra khỏi trọ không
          </q-card-section>
          <q-card-actions align="right">
            <q-btn no-caps flat label="Thoát" color="primary" v-close-popup />
            <q-btn
              flat
              no-caps
              label="Đồng ý "
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
import AdminRoomTypeInfor from "../components/AdminRoomTypeInfor.vue";
import AdminPublicInfor from "../components/AdminPublicInfor.vue";
import MotelLocation from "../components/motelLocation.vue";
import SearchShowMap from "../components/SearchShowMap.vue";
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
        this.showNoti("Thành công", "positive");
      } else if (statusCode == 2) {
        this.showNoti(" Không tìm thấy trọ", "dark");
      } else {
        this.showNoti(" Thất bại", "negative");
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
    this.center = {
      lat: res.motel.latitude,
      lng: res.motel.longitude,
    };
  },
  data() {
    return {
      drawerLeft: true,
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
      center: null,
    };
  },
  components: {
    AdminMotelRoomTypeDetail,
    AdminNotiCreate,
    AdminRoomTypeInfor,
    AdminPublicInfor,
    MotelLocation,
    SearchShowMap,
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
      this.reload();
    },
    async reload() {
      const res = await adminMotel.getMotel(this.motelId);

      if (res?.statusCode) {
        this.publicImgs = res.publicImgs;
        this.motel = res.motel;
        this.roomTypes = res.roomTypes;
        this.roomTypeImgs = res.roomTypeImgs;
      }
      return;
    },
    goto(refs1) {
      console.log(refs1);
      const eleId = document.getElementById(refs1);
      var top2 = eleId.offsetTop;
      window.scrollTo({ top: top2, behavior: "smooth" });
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
