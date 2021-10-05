<template>
  <q-page padding>
    <div class="lt-sm text-h5">
      * mời bạn truy cập bằng các thiết bị như laptop và pc để trải nghiệm tốt
      hơn
    </div>
    <div v-if="motel" class="gt-xs full-width row justify-center items-center">
      <div class="col-10">
        <q-card class="my-card full-width">
          <q-form class="q-gutter-md">
            <q-card class="my-card">
              <q-card-section class="bg-accent">
                <div class="text-h6 text-white text-center">thông tin</div>
              </q-card-section>
              <q-card-section class="row items-center">
                <q-input
                  class="col-7"
                  v-model="motel.name"
                  type="text"
                  label=" tên trọ"
                  :rules="[
                    (val) => val.length > 0 || ' tên trọ không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="home"
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
                  label=" số điện thoại"
                  :rules="[
                    (val) => val.length > 0 || ' sdt không được để trống',
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
                  label=" địa chỉ"
                  :rules="[
                    (val) => val.length > 0 || ' địa chỉ không được để trống',
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
                <div class="col-12 row items-center justify-around bd">
                  <q-icon name="room_preferences" class="text-positive" style="font-size:30px;padding-right:10px" />
                  <q-input
                    v-model="motel.open"
                    type="number"
                    label=" giờ mở"
                    suffix="h"
                  />
                  <q-input
                    v-model="motel.closed"
                    type="number"
                    label=" giờ đóng"
                    suffix="h"
                  />
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row items-center bd">
                  <div class="col-1">
                    <q-icon name="camera_outdoor" class="text-positive" style="font-size:30px;padding-right:10px" />
                  </div>
                  <div class="col-4 row justify-center">
                    <q-radio
                      class="col-6"
                      v-model="motel.camera"
                      val="1"
                      label=" có cam"
                    />
                    <q-radio
                      class="col-6"
                      v-model="motel.camera"
                      val="0"
                      label=" không cam"
                    />
                  </div>
                  <q-input
                    class="col-7"
                    v-model="motel.parking"
                    type="text"
                    label=" chổ để xe"
                  >
                    <template v-slot:prepend>
                      <q-icon name="camera_roll" class="text-positive"/>
                    </template>
                  </q-input>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  label="cập nhật"
                  color="positive"
                  @click="updateMotelInfor"
                />
              </q-card-actions>
            </q-card>
            <q-card class="my-card">
              <br />
              <q-card-section class="bg-accent">
                <div class="text-h6 text-white text-center">thiết lập giá</div>
              </q-card-section>
              <br />
              <div class="col-12 row items-center justify-around">
                <q-input
                  v-model="motel.elec_cost"
                  type="number"
                  label=" tiền điện"
                  suffix="VND/kwh"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" style="font-size:30px" class="text-positive" />
                  </template>
                </q-input>
                <q-input
                  v-model="motel.water_cost"
                  type="number"
                  label=" tiện nước"
                  suffix="VND/m3"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" style="font-size:30px" class="text-positive" />
                  </template>
                </q-input>
                <q-input
                  v-model="motel.deposit"
                  type="number"
                  label=" đặt cọc"
                  suffix="VND/phong"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" style="font-size:30px" class="text-positive" />
                  </template>
                </q-input>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <Tax
                    class="bd"
                    v-model:cost="motel.people_cost"
                    :name="' phí người'"
                  ></Tax>
                </div>
                <div class="col-12">
                  <q-card-actions align="right">
                    <q-btn color="positive" label=" cập nhật" />
                  </q-card-actions>
                </div>
              </div>
            </q-card>
            <div v-for="(motelImg, index) in motelImgs" :key="index">
              <q-card class="my-card full-width">
                <q-card-section class="bg-accent">
                  <div class="text-h6 text-white text-center">
                    {{ motelImg.content }}
                  </div>
                </q-card-section>
                <q-card-section> </q-card-section>
                <q-card-section class="row items-center">
                  <div v-if="motelImg.img_type_id == 2" class="col-12 text-red">
                    *hình ảnh và nội dung sẽ được sử dụng khi đăng bài
                  </div>
                  <div
                    v-if="motelImg.img_type_id == 2"
                    class="col-12 row items-center"
                  >
                    <q-input
                      class="col-8"
                      v-model="motelImg.place"
                      outlined
                      label-color="blue"
                      bg-color="green-1"
                      type="text"
                    />
                    <div class="col-4 row justify-center items-center">
                      <q-btn
                        color="positive"
                        icon="update"
                        label=" cập nhật"
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
                          label=" cập nhật"
                          color="primary"
                          @click="uploadImgs(motelImg.id)"
                        />
                      </q-card-actions>
                    </div>
                    <div
                      class="col-12 row justify-center items-center pd bg-dark"
                    >
                      <motel-show-imgs
                        class="col-12"
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
                      type="textarea"
                      bg-color="green-1"
                      color="orange"
                      label-color="blue"
                    />
                    <div class="col-4 row justify-center items-center">
                      <q-btn
                        color="positive"
                        icon="update"
                        label=" cập nhật"
                        @click="updateMotelImg(motelImg.id, index)"
                      />
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                </q-card-section>
              </q-card>
              <div class="col-12"><br /></div>
            </div>
            <q-card class="my-card col-12">
              <q-card-section class="bg-positive">
                <div class="text-h6 text-center text-white">cấu hình phòng</div>
              </q-card-section>
              <q-card-actions align="right" class="bg-green-1">
                <q-btn
                  color="primary"
                  label=" thêm loại phòng"
                  icon="add"
                  @click="isCreate = true"
                />
              </q-card-actions>
              <q-card-section v-if="roomTypeImgs">
                <div
                  class="full-width"
                  v-for="(roomType, index) in roomTypeImgs"
                  :key="index"
                >
                  <q-card-section
                    class="row items-center justify-center bg-blue-1"
                  >
                    <div class="col-12 row items-center">
                      <q-input
                        class="col-8"
                        v-model="roomType.name"
                        type="text"
                        label=" tên loại"
                        outlined
                      />
                      <div class="col-4 row justify-center items-center">
                        <q-btn
                          color="negative"
                          icon="delete"
                          label=" xóa vĩnh viễn"
                          @click="deleteRoomType(roomType.id)"
                        />
                      </div>
                    </div>
                    <div class="col-12"><br /></div>
                    <div class="col-12 row justify-center items-center">
                      <div class="col-2">
                        <q-input
                          v-model="roomType.area"
                          style="padding-left: 10px"
                          type="number"
                          label=" diện tích"
                          outlined
                        />
                      </div>
                      <div class="col-8">
                        <q-input
                          style="padding-left: 10px"
                          v-model="roomType.content"
                          type="textarea"
                          label=" đặt điểm"
                          outlined
                        />
                      </div>
                      <div class="col-2 text-center">
                        số phòng {{ motel.room_types[index].rooms.length }}
                      </div>
                    </div>
                    <div class="col-12">
                      <q-checkbox
                        true-value="1"
                        false-value="0"
                        v-model="roomType.male"
                        label=" nam"
                        color="teal"
                      />
                      <q-checkbox
                        true-value="1"
                        false-value="0"
                        v-model="roomType.female"
                        label=" nữ"
                        color="teal"
                      />
                      <q-checkbox
                        true-value="1"
                        false-value="0"
                        v-model="roomType.everyone"
                        label=" bất kì "
                        color="teal"
                      />
                    </div>
                    <div class="col-12">
                      <q-card-actions align="right">
                        <q-btn
                          label="cập nhật thông tin"
                          icon="update"
                          @click="updateRoomTypeContent(index)"
                          color="positive"
                        />
                      </q-card-actions>
                    </div>
                    <div class="col-12"><br /></div>
                    <div class="col-12 row items-center justify-end">
                      <q-input
                        v-model="numRoom"
                        type="number"
                        label=" thêm phòng"
                      />
                      <q-btn
                        color="primary"
                        icon="add"
                        label=" thêm"
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
                          label=" cập nhật"
                          color="primary"
                          @click="uploadRoomImgs(roomType.id)"
                        />
                      </q-card-actions>
                    </div>
                  </q-card-section>

                  <div class="col-12"><br /></div>
                  <div class="col-12"><hr /></div>
                </div>
              </q-card-section>
            </q-card>
          </q-form>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="isCreate">
      <q-card style="min-width: 90%">
        <q-card-section class="row items-center bg-primary">
          <div class="col-12 text-center text-white">tạo loại phòng</div>
        </q-card-section>
        <q-card-section class="row items-center justify-center">
          <div class="col-12 row items-center">
            <q-input
              class="col-12"
              v-model="newRoomType.name"
              type="text"
              label=" tên loại"
              outlined
            />
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 row items-center">
            <q-input
              class="col-12"
              v-model="newRoomType.cost"
              type="number"
              label=" giá phòng"
              outlined
            />
          </div>

          <div class="col-12"><br /></div>
          <div class="col-12 row justify-center items-center">
            <div class="col-2">
              <q-input
                v-model="newRoomType.area"
                style="padding-left: 10px"
                type="number"
                label=" diện tích"
                outlined
              />
            </div>
            <div class="col-8">
              <q-input
                style="padding-left: 10px"
                v-model="newRoomType.content"
                type="textarea"
                label=" đặt điểm"
                outlined
              />
            </div>
            <div class="col-2 text-center">
              <q-input
                v-model="newRoomType.numRoom"
                type="number"
                label=" số phòng"
              />
            </div>
          </div>
          <div class="col-12">
            <q-checkbox
              true-value="1"
              false-value="0"
              v-model="newRoomType.male"
              label=" nam"
              color="teal"
            />
            <q-checkbox
              true-value="1"
              false-value="0"
              v-model="newRoomType.female"
              label=" nữ"
              color="teal"
            />
            <q-checkbox
              true-value="1"
              false-value="0"
              v-model="newRoomType.everyone"
              label=" bất kì "
              color="teal"
            />
          </div>
          <div class="col-12 row justify-center">
            <mulity-img v-model:imgs="newRoomType.imgs"> </mulity-img>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" hủy" color="primary" v-close-popup />
          <q-btn
            flat
            label=" tạo"
            color="primary"
            v-close-popup
            @click="createRoomType()"
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
import { ref } from "vue";
export default {
  setup() {
    const isCreate = ref(false);
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
      });
    }

    return {
      showNoti,
      isCreate,
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
        male: 0,
        female: 0,
        everyone: 0,
        name: null,
        cost: null,
        imgs: null,
        area: null,
      },
      numRoom: 0,
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
    // const roomTypeImgs = await this.$api.get("getRoomTypeImgs");
    const roomTypeImgs = await motel.getRoomTypeImgs();
    // const getMotelImgs = await this.$api.get("getMotelImgs");
    // const motels = await this.$api.get("getMotelRoomType");
    const motels = await motel.getMotelRoomType();
    const getMotelImgs = await motel.getMotelImgs();
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
        const res = await motel.getRoomTypeImgs();
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
      const getMotelImgs = await this.$api.get("getMotelImgs");
      this.motelImgs = getMotelImgs.data.motelImgs;
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
      });

      if (res.data?.statusCode) {
        this.showNoti("thành công ", "positive");
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
        this.showNoti("thành công", "primary");
      } else {
        this.showNoti("lỗi : không xác định", "negative");
      }
    },
    async addNumRoom(roomTypeId) {
      const res = await motel.addNumRoom(roomTypeId, this.numRoom);
      if (res?.statusCode) {
        this.showNoti("thành công", "positive");
      } else {
        this.showNoti("lỗi: thất bại", "negative");
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
      this.append(fd, this.newRoomType.imgs, "img");

      const res = await motel.createRoomType(fd);

      if (res?.statusCode) {
        this.showNoti("thành công", "positive");
        const res = await motel.getMotelImgs();
        if (res?.statusCode) {
          this.motelImgs = res.motelImgs;
        }
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.pd
  padding: 10px 0px
</style>
