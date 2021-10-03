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
                  <div class="col-1"></div>
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
                  />
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn label="cập nhật" color="positive" />
              </q-card-actions>
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
                    />
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
                      class="col-12"
                      v-model="motel.content"
                      type="textarea"
                      bg-color="green-1"
                      color="orange"
                      label-color="blue"
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
import Tax from "../components/Tax.vue";
import MotelShowImgs from "../components/MotelShowImgs.vue";
import MulityImg from "../components/MulityImg.vue";
export default {
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
      count: null,
    };
  },
  watch: {
    center(newval, oldval) {
      this.lat = newval.lat;
      this.lng = newval.lng;
    },
  },
  async created() {
    const roomTypeImgs = await this.$api.get("getRoomTypeImgs");
    const getMotelImgs = await this.$api.get("getMotelImgs");
    const motels = await this.$api.get("getMotelRoomType");
    this.roomTypeImgs = roomTypeImgs.data.roomTypeImg;
    this.motelImgs = getMotelImgs.data.motelImgs;
    this.motel = motels.data?.data;
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
      const len = this.imgs.length;
      for (let i = 0; i < len; i++) {
        fd.append('img' + i.toString(), this.imgs[i]);
      }
      fd.append("img_num", len);
      fd.append("count" , motelImg);
      const res = await this.$api.post("uploadImg" , fd, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (res.data?.statusCode) {
        console.log("thanh cong ");
      }
    },
    append(fd, imgs, name) {
      const len = imgs.length;
      for (let i = 0; i < len; i++) {
        fd.append(name + i.toString(), imgs[i]);
      }
      fd.append(name + "_num", len);
    },
  },
};
</script>

<style lang="sass" scoped>
.pd
  padding: 10px 0px
</style>
