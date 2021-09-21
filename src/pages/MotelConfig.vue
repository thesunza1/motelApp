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
              <q-card-section class="row items-center">
                <q-input
                  class="col-7"
                  v-model="motel.name"
                  type="text"
                  label=" tên trọ"
                  :rules="[
                    (val) => val.length > 0 || ' tên trọ không được để trống',
                  ]"
                />
                <div class="col-1"></div>
                <q-input
                  class="col-4"
                  v-model="motel.phone_number"
                  type="text"
                  label=" số điện thoại"
                  :rules="[
                    (val) => val.length > 0 || ' sdt không được để trống',
                  ]"
                />
                <q-input
                  class="col-12"
                  v-model="motel.address"
                  type="text"
                  label=" địa chỉ"
                  :rules="[
                    (val) => val.length > 0 || ' địa chỉ không được để trống',
                  ]"
                />
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
                  <div class="col-3"></div>
                  <q-checkbox
                    class="col-2"
                    right-label
                    v-model="motel.camera"
                    val="1"
                    label=" có camera "
                  />
                  <q-input
                    class="col-7"
                    v-model="motel.parking"
                    type="text"
                    label=" chổ để xe"
                  />
                </div>
              </q-card-section>
            </q-card>
            <q-card class="my-card">
              <div class="col-12 text-h5 text-center">thiết lập giá</div>
              <div class="col-12 row items-center justify-around">
                <q-input
                  v-model="motel.elec_cost"
                  type="number"
                  label=" tiền điện"
                  suffix="VND/kwh"
                />
                <q-input
                  v-model="motel.water_cost"
                  type="number"
                  label=" tiện nước"
                  suffix="VND/m3"
                />
                <q-input
                  v-model="motel.deposit"
                  type="number"
                  label=" đặt cọc"
                  suffix="VND/phong"
                />
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <Tax
                    class="bd"
                    v-model:cost="motel.people_cost"
                    :name="' phí người'"
                  ></Tax>
                </div>
              </div>
            </q-card>
            <div v-for="(motelImg, index) in motelImgs" :key="index">
              <q-card class="my-card full-width">
                <q-card-section>
                  <div class="text-subtitle2 text-center">
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
                      class="col-12"
                      v-model="motelImg.place"
                      outlined
                      label-color="blue"
                      bg-color="green-1"
                      type="text"
                      label="nơi để"
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row items-center">
                    <div class="col-12"></div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row justify-center">
                    <!-- <mulity-img v-model:imgs="motelImgs[index].imgs"></mulity-img> -->
                    <q-uploader
                      color="teal"
                      flat
                      bordered
                      class="col-12"
                      label='chọn ảnh'
                    />
                    <motel-show-imgs
                      :img_details="motelImg.img_details"
                    ></motel-show-imgs>
                  </div>
                  <div class="col-12"><br /></div>
                  <div
                    v-if="motelImg.img_type_id == 1"
                    class="col-12 row items-center"
                  >
                    <q-input
                      class="col-12"
                      v-model="motel.content"
                      type="textarea"
                      bg-color="green-1"
                      color="orange"
                      label-color="blue"
                      label=" giới thiệu về trọ"
                    />
                  </div>
                  <div class="col-12"><br /></div>
                </q-card-section>
              </q-card>
            </div>

          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import { mapGetters } from "vuex";
import Tax from "../components/Tax.vue";
import MotelShowImgs from "../components/MotelShowImgs.vue";
// import MulityImg from "../components/MulityImg.vue";
export default {
  data() {
    return {
      roomTypeImgs: null,
      MotelImgs: null,
      zoom: 17,
      center: { lat: 0.01, lng: 105.77 },
      motel: null,
      base: this.$api.defaults.baseURL + "/image/",
    };
  },
  async created() {
    const roomTypeImgs = await this.$api.get("getRoomTypeImgs");
    const getMotelImgs = await this.$api.get("getMotelImgs");
    const motels = await this.$api.get("getMotelRoomType");
    // if (roomTypeImgs.data.statusCode == 1) {
      this.roomTypeImgs = roomTypeImgs.data.roomTypeImg;
    // }
    // if (getMotelImgs.data?.statusCode == 1) {
      this.motelImgs = getMotelImgs.data.motelImgs;
    // }
    // if (motels.data?.statusCode == 1) {
    this.motel = motels.data?.data;
    // }
    this.center = { lat: this.motel?.latitude, lng: this.motel?.longitude };
  },
  components: {
    Tax,
    MotelShowImgs,
    // MulityImg,
  },
};
</script>

<style>
</style>
