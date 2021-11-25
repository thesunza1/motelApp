<template>
  <q-page padding>
    <div class="lt-sm text-h5">
      * Mời bạn truy cập bằng các thiết bị như laptop và pc để trải nghiệm tốt
      hơn
    </div>
    <div v-if="motel" class="gt-xs full-width row justify-center items-center">
      <q-drawer
        side="left"
        v-model="drawerLeft"
        bordered
        :width="400"
        content-class="bg-white"
      >
        <br />
        <q-item clickable>
          <q-item-section top avatar>
            <q-avatar
              color="white"
              class="g-icon-h1"
              text-color="black"
              icon="store"
            />
          </q-item-section>
          <q-item-section @click="goto('publicInfor')">
            <q-item-label> Chỉnh sửa thông tin chung </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section top avatar>
            <q-avatar
              color="white"
              class="g-icon-h1"
              text-color="black"
              icon="paid"
            />
          </q-item-section>
          <q-item-section @click="goto('publicMoney')">
            <q-item-label> Thiết lập khoản thu </q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="apartment"
          v-model="isOp"
          header-class="g-icon-h2"
          label="Cấu hình nội dung trọ"
          caption=" Hình ảnh và nội dung "
          :content-inset-level="1"
        >
          <div v-for="(motelImg, index) in motelImgs" :key="index">
            <q-item clickable>
              <q-item-section @click="goto(`img${index}`)">
                <q-item-label> {{ motelImg.content }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="home"
          v-model="isop"
          header-class="g-icon-h2"
          label=" Cấu hình loại trọ"
          caption="Danh sách loại trọ"
          @click="goto('roomTypes')"
          :content-inset-level="1"
        >
          <div v-for="(rTImg, index) in roomTypeImgs" :key="index">
            <q-item clickable>
              <q-item-section @click="goto(`rts${index}`)">
                <q-item-label> {{ rTImg.name }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-expansion-item>
      </q-drawer>
      <div class="col-10">
        <!-- <q-card class="my-card full-width g-border"> -->
          <q-form class="q-gutter-md">
            <q-card class="my-card g-border" id="publicInfor">
              <q-card-section class="g-bg-primary-label">
                <div class="text-h6 text-white text-center">
                  Cấu hình thông tin trọ
                </div>
              </q-card-section>
              <q-card-section class="row items-center">
                <q-input
                  class="col-7"
                  v-model="motel.name"
                  label-color="positive"
                  type="text"
                  label=" Tên trọ"
                  :rules="[
                    (val) => val.length > 0 || ' Tên trọ không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="apartment"
                      style="font-size: 30px"
                      class="text-positive"
                    />
                  </template>
                </q-input>
                <div class="col-1"></div>
                <q-input
                  class="col-4"
                  v-model="motel.phone_number"
                  type="text"
                  label=" Số điện thoại"
                  label-color="positive"
                  :rules="[
                    (val) =>
                      val.length > 0 || ' Số điện thoại không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="settings_phone"
                      style="font-size: 30px"
                      class="text-positive"
                    />
                  </template>
                </q-input>
                <q-input
                  class="col-12"
                  v-model="motel.address"
                  type="text"
                  label-color="positive"
                  label=" Địa chỉ"
                  :rules="[
                    (val) => val.length > 0 || ' Địa chỉ không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="room"
                      style="font-size: 30px"
                      class="text-positive"
                    />
                  </template>
                </q-input>
                <div class="col-12 row items-center">
                  <!-- <q-btn
                    color="primary"
                    icon="check"
                    label=" định vị "
                    @click="getLocation"
                  /> -->
                  <div class="col-12"><br /></div>
                  <div class="col-12" style="height: 700px">
                    <l-map v-model:zoom="zoom" :center="center">
                      <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      ></l-tile-layer>
                      <l-control-layers />

                      <l-marker
                        v-model:lat-lng="center"
                        draggable
                        @mouseup="log"
                      >
                      </l-marker>
                    </l-map>
                  </div>
                </div>
                <div class="col-12 row items-center">
                  <div class="col-6 row items-center">
                    <div>
                      <q-icon
                        name="room_preferences"
                        class="text-positive"
                        style="font-size: 30px; padding-right: 10px"
                      />
                      Cổng trọ: &ensp;
                    </div>
                    <div class="q-px-md">
                      <q-input
                        v-model="motel.open"
                        type="number"
                        label=" Giờ mở"
                        label-color="positive"
                        suffix="h"
                      />
                    </div>
                    <div>
                      <q-input
                        v-model="motel.closed"
                        type="number"
                        label-color="positive"
                        label=" Giờ đóng"
                        suffix="h"
                      />
                    </div>
                  </div>
                  <div class="col-6 row items-center">
                    <div class="q-px-md">
                      <q-icon
                        name="camera_outdoor"
                        class="text-positive"
                        style="font-size: 30px; padding-right: 10px"
                      />
                      camera:
                    </div>
                    <div class="col-4 text-subtitle2 row">
                      <div>
                        <input
                          type="radio"
                          id="haveCam"
                          v-model="motel.camera"
                          value="1"
                        />
                        <label for="haveCam"> Có</label>
                      </div>
                      <div class="q-px-md">
                        <input
                          type="radio"
                          id="nonCam"
                          v-model="motel.camera"
                          value="0"
                        />
                        <label for="nonCam"> Không</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row items-center bd"></div>
                  <q-input
                    class="col-6"
                    v-model="motel.parking"
                    type="text"
                    label=" Chổ để xe"
                    label-color="positive"
                  >
                    <template v-slot:prepend>
                      <q-icon name="camera_roll" class="text-positive" />
                    </template>
                  </q-input>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  label="Cập nhật thông tin"
                  rounded
                  color="black"
                  @click="updateMotelInfor"
                  class="g-header"
                />
              </q-card-actions>
            </q-card>
            <br>
            <q-card class="my-card g-border" id="publicMoney">
              <q-card-section class="g-bg-primary-label">
                <div class="text-h6 text-white text-center">Thiết lập giá</div>
              </q-card-section>
              <br />
              <div class="col-12 row items-center">
                <div>
                  <q-input
                    class="q-ml-md"
                    v-model="motel.elec_cost"
                    type="number"
                    label="Tiền điện"
                    suffix="VNĐ/kwh"
                    label-color="positive"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="paid"
                        style="font-size: 30px"
                        class="text-positive"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="q-px-md">
                  <q-input
                    v-model="motel.water_cost"
                    type="number"
                    label="Tiện nước"
                    label-color="positive"
                    suffix="VNĐ/m3"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="paid"
                        style="font-size: 30px"
                        class="text-positive"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="q-px-md">
                  <q-input
                    v-model="motel.deposit"
                    type="number"
                    label=" Đặt cọc"
                    suffix="VNĐ/phòng"
                    label-color="positive"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="paid"
                        style="font-size: 30px"
                        class="text-positive"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-3">
                  <Tax
                    v-model:cost="motel.people_cost"
                    :name="' Phụ thu'"
                  ></Tax>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <q-card-actions align="right">
                    <q-btn
                      color="black"
                      rounded
                      label="Cập nhật phí trọ"
                      class="g-header"
                    />
                  </q-card-actions>
                </div>
              </div>
            </q-card>
            <br>
            <div v-for="(motelImg, index) in motelImgs" :key="index">
              <q-card class="my-card g-border full-width" :id="`img${index}`">
                <q-card-section class="g-bg-primary-label">
                  <div class="text-h6 text-white text-center g-header-up">
                    {{ motelImg.content }}
                  </div>
                </q-card-section>
                <q-card-section> </q-card-section>
                <q-card-section class="row items-center">
                  <div v-if="motelImg.img_type_id == 2" class="col-12 text-red">
                    *Hình ảnh và nội dung sẽ được sử dụng khi đăng bài
                  </div>
                  <div
                    v-if="motelImg.img_type_id == 2"
                    class="col-12 row items-center"
                  >
                    <q-input
                      class="col-8"
                      v-model="motelImg.place"
                      outlined
                      label="Nơi để"
                      label-color="blue"
                      bg-color="green-1"
                      type="text"
                    />
                    <div class="col-4 row justify-center items-center">
                      <q-btn
                        color="black"
                        icon="update"
                        class="g-header"
                        label=" Cập nhật"
                        rounded
                        @click="updateMotelImg(motelImg.id, index)"
                      />
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row items-center">
                    <div class="col-12"></div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row justify-center">
                    <!-- <mulity-img v-model:imgs="motelImgs[index].imgs"></mulity-img> -->
                    <div class="col-12 row justify-center">
                      <mulity-img v-model:imgs="imgs"> </mulity-img>
                    </div>
                    <div class="col-12">
                      <q-card-actions align="right">
                        <q-btn
                          v-if="countImg > 0"
                          label=" Cập nhật"
                          color="black"
                          class="g-header"
                          rounded
                          @click="uploadImgs(motelImg.id)"
                        />
                      </q-card-actions>
                    </div>
                    <div
                      class="col-12 row justify-center items-center pd bg-dark"
                    >
                      <motel-show-imgs
                        class="col-12"
                        style="height: 200px"
                        :img_details="motelImg.img_details"
                      ></motel-show-imgs>
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div
                    v-if="motelImg.img_type_id == 1"
                    class="col-12 row items-center"
                  >
                    <q-input
                      class="col-8"
                      v-model="motel.content"
                      label="Đặc điểm trọ"
                      type="textarea"
                      bg-color="green-1"
                      color="orange"
                      label-color="blue"
                    />
                    <div class="col-4 row justify-center items-center">
                      <q-btn
                        color="black"
                        icon="update"
                        rounded
                        label=" Cập nhật"
                        class="g-header"
                        @click="updateMotelImg(motelImg.id, index)"
                      />
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                </q-card-section>
              </q-card>
              <div class="col-12"><br /></div>
            </div>
            <q-card class="my-card g-border col-12" :id="'roomTypes'">
              <q-card-section class="g-bg-primary-label">
                <div class="text-h6 text-center text-white">
                  Cấu hình loại phòng
                </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-green-1">
                <q-btn
                  color="black"
                  label=" Thêm loại phòng"
                  icon="add"
                  rounded
                  class="g-header"
                  @click="isCreate = true"
                />
              </q-card-actions>
              <q-card-section v-if="roomTypeImgs">
                <q-card
                  class="full-width g-border"
                  v-for="(roomType, index) in roomTypeImgs"
                  :key="index"
                  :id="`rts${index}`"
                >
                  <q-card-section class="text-h6 text-primary g-header-up">
                    Loại: {{ roomType.name }}
                  </q-card-section>
                  <q-card-section class="row items-center justify-center">
                    <div class="col-12 row items-center">
                      <q-input
                        class="col-4"
                        v-model="roomType.name"
                        type="text"
                        label-color="orange"
                        label=" Tên loại"
                        outlined
                      />
                      <div class="col-4">
                        <q-input
                          v-model="roomType.area"
                          style="padding-left: 10px"
                          label-color="orange"
                          type="number"
                          label=" Diện tích"
                          suffix="m2"
                          outlined
                        />
                      </div>
                      <div class="col-4 text-center">
                        <b class="text-orange">Tổng số phòng:</b>
                        {{ motel.room_types[index].rooms.length }}
                      </div>
                      <!-- <div class="col-3 row justify-center items-center">
                        <q-btn
                          rounded
                          color="negative"
                          icon="delete"
                          label=" Xóa vĩnh viễn"
                          class="g-header-up"
                          @click="deleteRoomTypeDialog(roomType, index)"
                        />
                      </div> -->
                    </div>
                    <div class="col-12"><br /></div>
                    <div class="col-12 row justify-center items-center">
                      <div class="col-12">
                        <q-input
                          style="padding-left: 10px"
                          v-model="roomType.content"
                          type="textarea"
                          label="Đặt điểm"
                          label-color="orange"
                          outlined
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <q-checkbox
                        :true-value="1"
                        :false-value="0"
                        v-model="roomType.male"
                        label=" Nam"
                        color="teal"
                      />
                      <q-checkbox
                        :true-value="1"
                        :false-value="0"
                        v-model="roomType.female"
                        label="Nữ"
                        color="teal"
                      />
                      <q-checkbox
                        :true-value="1"
                        :false-value="0"
                        v-model="roomType.everyone"
                        label=" Bất kì "
                        color="teal"
                      />
                    </div>
                    <div class="col-12">
                      <q-card-actions align="right">
                        <q-btn
                          label="Cập nhật thông tin"
                          rounded
                          icon="update"
                          @click="updateRoomTypeContent(index)"
                          color="black"
                          class="g-header"
                        />
                      </q-card-actions>
                    </div>
                    <div class="col-12"><br /></div>
                    <div class="col-12 row items-center justify-end">
                      <q-input
                        v-model="numRoom"
                        type="number"
                        label=" Thêm phòng"
                        label-color="orange"
                      />
                      <q-btn
                        color="black"
                        icon="add"
                        label=" Thêm phòng trọ"
                        rounded
                        class="g-header"
                        @click="addNumRoom(roomType.id)"
                      />
                    </div>
                    <div
                      class="col-12 row justify-center items-center pd bg-dark"
                    >
                      <motel-show-imgs
                        class="col-12"
                        :img_details="roomType.img_details"
                      ></motel-show-imgs>
                    </div>
                    <div class="col-12 row justify-center">
                      <mulity-img v-model:imgs="imgs"> </mulity-img>
                    </div>
                    <div class="col-12">
                      <q-card-actions align="right">
                        <q-btn
                          v-if="countImg > 0"
                          label=" Cập nhật"
                          rounded
                          color="black"
                          class="g-header"
                          @click="uploadRoomImgs(roomType.id)"
                        />
                      </q-card-actions>
                    </div>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-form>
        <!-- </q-card> -->
      </div>
    </div>
    <q-dialog v-model="isCreate">
      <q-card class="g-border" style="min-width: 90%">
        <q-card-section class="row items-center bg-primary">
          <div class="col-12 text-h6 text-center text-white">Tạo loại phòng</div>
        </q-card-section>
        <q-card-section class="row items-center justify-center">
          <div class="col-12 row items-center">
            <div class="col-3">
              <q-input
                v-model="newRoomType.name"
                type="text"
                label=" Tên loại phòng"
                label-color="primary"
                outlined
                class="q-pr-md"
              />
            </div>
            <div class="col-3">
              <q-input
                class="col-12 q-px-md"
                v-model="newRoomType.cost"
                type="number"
                label=" Giá phòng"
                label-color="primary"
                outlined
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="newRoomType.area"
                style="padding-left: 10px"
                type="number"
                label-color="primary"
                label=" Diện tích"
                outlined
                class="q-px-md"
              />
            </div>
            <div class="col-3 text-center">
              <q-input
                v-model="newRoomType.numRoom"
                type="number"
                label-color="primary"
                label=" Số phòng"
                outlined
              />
            </div>
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 row items-center"></div>
          <div class="col-12"><br /></div>
          <div class="col-12 row justify-center items-center">
            <div class="col-12">
              <q-input
                style="padding-left: 10px"
                v-model="newRoomType.content"
                type="textarea"
                label-color="primary"
                label="Đặt điểm"
                outlined
              />
            </div>
          </div>
          <div class="col-12">
            <div>Giới tính cho phép ở: &ensp;</div>
            <q-checkbox
              :true-value="1"
              :false-value="0"
              v-model="newRoomType.male"
              label=" Nam"
              color="teal"
            />
            <q-checkbox
              :true-value="1"
              :false-value="0"
              v-model="newRoomType.female"
              label=" Nữ"
              color="teal"
            />
            <q-checkbox
              :true-value="1"
              :false-value="0"
              v-model="newRoomType.everyone"
              label=" Bất kì "
              color="teal"
            />
          </div>
          <div class="col-12 row justify-center">
            <mulity-img v-model:imgs="newRoomType.imgs"> </mulity-img>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn rounded label=" Hủy" color="black" v-close-popup />
          <q-btn
            rounded
            label=" Tạo"
            color="black"
            v-close-popup
            @click="createRoomType()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDeRoomType" persistent>
      <q-card style="min-width: 50%" v-if="thisRoomType">
        <q-card-section class="row text-primary items-center justify-center">
          <q-avatar icon="delete" color="black" text-color="white" />
          <span class="q-ml-sm text-h6">
            Bạn có muốn xóa loại phòng : {{ thisRoomType.name }} không?</span
          >
        </q-card-section>
        <q-card-section class="text-center">
          <div>Điều kiện xóa : tất cả các phòng đều không có người.</div>
          <div>
            Các dữ liệu về hình ảnh , và hóa đơn các phòng sẽ điều bị xóa .
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            rounded
            label=" Thoát"
            no-caps
            color="negative"
            v-close-popup
          />
          <q-btn
            rounded
            label=" Xóa"
            no-caps
            color="primary"
            v-close-popup
            @click="deleteRoomType()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Tax from "../components/Tax.vue";
import MotelShowImgs from "../components/MotelShowImgs.vue";
import MulityImg from "../components/MulityImg.vue";
import { useQuasar } from "quasar";
import motel from "../boot/callApi/motel";
import roomType from "../boot/callApi/roomType";
import { ref } from "vue";
export default {
  setup() {
    const isCreate = ref(false);
    const drawerLeft = ref(true);
    const isOp = ref(true);
    const isop = ref(false);
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
      });
    }

    return {
      isOp,
      isop,
      showNoti,
      isCreate,
      drawerLeft,
    };
  },
  data() {
    return {
      roomTypeImgs: null,
      motelImgs: null,
      zoom: 17,
      center: { lat: 0.01, lng: 105.77 },
      lat: null,
      lng: null,
      motel: null,
      base: this.$api.defaults.baseURL + "/image/",
      baseUpload: this.$api.defaults.baseURL + "/uploadImg/",
      imgs: null,
      countImg: 0,
      newRoomType: {
        motelId: null,
        content: null,
        numRoom: null,
        male: 1,
        female: 1,
        everyone: 1,
        name: null,
        cost: null,
        imgs: null,
        area: null,
      },
      numRoom: 0,
      motelId: this.$route.params.motelId,
      thisRoomType: null,
      thisRoomTypeIndex: null,
      isDeRoomType: false,
    };
  },
  watch: {
    center(newval, oldval) {
      this.lat = newval.lat;
      this.lng = newval.lng;
    },
    imgs(newval) {
      if (this.imgs == null) {
        this.countImg = 0;
      } else {
        this.countImg = newval.length;
      }
    },
  },
  async created() {
    const roomTypeImgs = await motel.getRoomTypeImgs(this.motelId);
    const motels = await motel.getMotelRoomType(this.motelId);
    const getMotelImgs = await motel.getMotelImgs(this.motelId);
    this.roomTypeImgs = roomTypeImgs.roomTypeImg;
    this.motelImgs = getMotelImgs.motelImgs;
    this.motel = motels?.data;
    this.center = { lat: this.motel?.latitude, lng: this.motel?.longitude };
  },
  components: {
    Tax,
    MotelShowImgs,
    MulityImg,
  },
  methods: {
    goto(refs1) {
      console.log(refs1);
      const eleId = document.getElementById(refs1);
      var top2 = eleId.offsetTop;
      console.log(eleId);
      console.log(top2);
      window.scrollTo({ top: top2, behavior: "smooth" });
    },
    async uploadImgs(motelImg) {
      let fd = new FormData();
      fd.append("count", motelImg);
      this.append(fd, this.imgs, "img");
      const res = await this.$api.post("uploadImg", fd, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      if (res.data.statusCode == 1) {
        this.imgs = null;
        this.showNoti("thành công", "positive");
        this.updateImg();
      }
    },
    async uploadRoomImgs(id) {
      let fd = new FormData();
      fd.append("roomTypeId", id);
      this.append(fd, this.imgs, "img");
      const res = await motel.uploadRoomImgs(fd);
      if (res?.statusCode) {
        this.imgs = null;
        this.showNoti("thành công", "positive");
        const res = await motel.getRoomTypeImgs(this.motelId);
        this.roomTypeImgs = res.roomTypeImg;
      }
    },
    append(fd, imgs, name) {
      const len = imgs.length;
      for (let i = 0; i < len; i++) {
        fd.append(name + i.toString(), imgs[i]);
      }
      fd.append(name + "_num", len);
    },
    async updateImg() {
      const getMotelImgs = await this.$api.get("getMotelImgs/" + this.motelId);
      this.motelImgs = getMotelImgs.data.motelImgs;
      return;
    },
    async updateRoomTypeImg() {
      const getMotelImgs = await motel.getMotelImgs(this.motelId);
      this.roomTypeImgs = getMotelImgs.roomTypeImg;
      return;
    },
    async updateMotelInfor() {
      const res = await this.$api.post("updateMotelInfor", {
        names: this.motel.name,
        address: this.motel.address,
        camera: this.motel.camera,
        phone_number: this.motel.phone_number,
        lat: this.lat,
        lng: this.lng,
        open: this.motel.open,
        closed: this.motel.closed,
        parking: this.motel.parking,
        motelId: this.motelId,
      });

      if (res.data?.statusCode) {
        this.showNoti("Thành công ", "positive");
      }
    },
    async updateMotelImg(id, index) {
      const res = await motel.updateMotelImg(
        id,
        this.motelImgs[index].content,
        this.motelImgs[index].place,
        this.motel.content
      );
      console.log(this.motelImgs[index].content);
      if (res?.statusCode) {
        this.showNoti("Thành công", "primary");
      } else {
        this.showNoti("Lỗi : không xác định", "negative");
      }
    },
    async addNumRoom(roomTypeId) {
      const res = await motel.addNumRoom(roomTypeId, this.numRoom);
      if (res?.statusCode) {
        this.showNoti("Thành công", "positive");
      } else {
        this.showNoti("Lỗi: thất bại", "negative");
      }
    },
    async updateRoomTypeContent(index) {
      const res = await motel.updateRoomTypeContent(this.roomTypeImgs[index]);

      if (res?.statusCode) {
        this.showNoti(" thành công", "positive");
      }
    },
    async createRoomType() {
      let fd = new FormData();
      fd.append("content", this.newRoomType.content);
      fd.append("numRoom", this.newRoomType.numRoom);
      fd.append("area", this.newRoomType.area);
      fd.append("male", this.newRoomType.male);
      fd.append("female", this.newRoomType.female);
      fd.append("everyone", this.newRoomType.everyone);
      fd.append("cost", this.newRoomType.cost);
      fd.append("name", this.newRoomType.name);
      fd.append("motelId", this.motelId);
      this.append(fd, this.newRoomType.imgs, "img");

      const res = await motel.createRoomType(fd);

      if (res?.statusCode) {
        this.showNoti("Thành công", "positive");
        const res = await motel.getMotelImgs(this.motelId);
        if (res?.statusCode) {
          this.motelImgs = res.motelImgs;
        }
      }
    },
    async deleteRoomTypeDialog(roomType, index) {
      this.thisRoomType = roomType;
      this.thisRoomTypeIndex = index;
      this.isDeRoomType = true;
    },
    async deleteRoomType() {
      const res = await roomType.deleteRoomType(this.thisRoomType.id);

      if (res.statusCode == 1) {
        this.showNoti("Thành công", "positive");
        this.roomTypeImgs.splice(this.thisRoomTypeIndex, 1);
        console.log(this.thisRoomTypeIndex);
      } else {
        this.showNoti(" Thất bại do còn phòng còn người ", "negative");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.pd
  padding: 10px 0px
</style>
