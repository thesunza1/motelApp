<template>
  <q-page padding>
    <div class="row justify-center">
      <q-dialog v-model="isError" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              class="q-mr-20"
            />
            <span class="q-ml-sm"> {{ errorMes }} </span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="oke" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-card class="my-card col-12 col-md-8 g-border">
        <q-form @reset="onReset" class="q-gutter-md" @submit="onsubmit">
          <q-card-section>
            <div class="text-center text-primary text-h3">Tạo nhà trọ</div>
          </q-card-section>
          <q-card class="my-card">
            <q-card-section class="row justify-center">
              <div
                class="col-12 row items-center border-card g-border shadow-2"
              >
                <q-input
                  class="col-7"
                  v-model="motel.names"
                  type="text"
                  label-color="primary"
                  label=" Tên trọ"
                  :rules="[
                    (val) => val.length > 0 || ' Tên trọ không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" class="text-primary" />
                  </template>
                </q-input>
                <div class="col-1"></div>
                <q-input
                  class="col-4"
                  v-model="motel.phone_number"
                  label-color="primary"
                  type="text"
                  label=" Số điện thoại"
                  :rules="[
                    (val) => val.length > 0 || ' Số điện không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" class="text-primary" />
                  </template>
                </q-input>
                <q-input
                  class="col-12"
                  v-model="motel.address"
                  type="text"
                  label=" Địa chỉ"
                  label-color="primary"
                  :rules="[
                    (val) => val.length > 0 || ' Địa chỉ không được để trống',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="room" class="text-primary" />
                  </template>
                </q-input>
                <div class="col-12 row items-center">
                  <!-- <q-btn
                    color="primary"
                    rounded
                    no-caps
                    icon="check"
                    label=" Lấy vị trí"
                    @click="getLocation()"
                  /> -->
                  <div class="col-12"><br /></div>
                  <div class="col-12" style="height: 700px">
                    <l-map v-model:zoom="zoom" :center="center">
                      <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      ></l-tile-layer>
                      <l-control-layers />
                      <l-control position="bottomleft">
                        <q-card-actions align="center">
                          <q-btn
                            color="black"
                            rounded
                            no-caps
                            icon="room"
                            label=" Lấy vị trí"
                            @click="getLocation()"
                          />
                        </q-card-actions>
                      </l-control>

                      <l-marker
                        v-model:lat-lng="center"
                        draggable
                        @mouseup="log"
                      >
                      </l-marker>
                    </l-map>
                  </div>
                </div>
                <div class="col-12 row items-center justify-start bd">
                  <q-checkbox
                    class="q-pl-md col-5"
                    right-label
                    v-model="isOpen"
                  >
                    <q-icon name="door_back" class="g-icon-h2 text-primary" />
                    Cổng
                  </q-checkbox>
                  <q-input
                    :disable="!isOpen"
                    outlined
                    v-model="motel.open"
                    label-color="primary"
                    class="q-ml-md"
                    type="number"
                    label=" Giờ mở"
                    suffix="h"
                  />
                  <q-input
                    :disable="!isOpen"
                    v-model="motel.closed"
                    outlined
                    label-color="primary"
                    type="number"
                    label=" Giờ đóng"
                    class="q-ml-md"
                    suffix="h"
                  />
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row items-center justify-start bd">
                  <q-checkbox
                    class="q-pl-md col-5"
                    right-label
                    v-model="motel.camera"
                  >
                    <q-icon name="camera" class="g-icon-h2 text-primary" />
                    Có camera
                  </q-checkbox>
                  <div class="col-4">
                    <q-input
                      v-model="motel.parking"
                      outlined
                      type="text"
                      label=" Chổ để xe"
                      label-color="primary"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div
                class="col-12 row items-center g-border shadow-2 border-card"
              >
                <div class="col-12 text-h5 text-center">Thiết lập giá</div>
                <div class="col-12 row items-center justify-around">
                  <q-input
                    v-model="motel.elec_cost"
                    type="number"
                    label=" Tiền điện"
                    label-color="primary"
                    suffix="VNĐ/kwh"
                  >
                    <template v-slot:prepend>
                      <q-icon name="bolt" class="text-primary" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="motel.water_cost"
                    type="number"
                    label=" Tiện nước"
                    label-color="primary"
                    suffix="VNĐ/m3"
                  >
                    <template v-slot:prepend>
                      <q-icon name="water_drop" class="text-primary" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="motel.deposit"
                    type="number"
                    label-color="primary"
                    label=" Đặt cọc"
                    suffix="VNĐ/phong"
                  >
                    <template v-slot:prepend>
                      <q-icon name="payments" class="text-primary" />
                    </template>
                  </q-input>
                  <div class="col-12"><br /></div>
                  <div class="col-12">
                    <Tax
                      class="bd"
                      v-model:cost="motel.people_cost"
                      :name="motel.people_name"
                    ></Tax>
                  </div>
                </div>
              </div>
              <div class="col-12"><br /></div>

              <div
                class="col-12 row items-center g-border shadow-2 border-card"
              >
                <div class="col-12 text-h5 text-center">
                  {{ motel_img.content }}
                </div>
                <div class="col-12 text-red" style="padding-left: 10px">
                  * Hình ảnh và nội dung sẽ được sử dụng khi đăng bài
                </div>
                <div class="col-12">
                  <mulity-img v-model:imgs="motel_img.imgs"></mulity-img>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <q-input
                    outlined
                    v-model="motel.content"
                    label-color="primary"
                    type="textarea"
                    label=" Giới thiệu về trọ"
                  />
                </div>
              </div>
              <div class="col-12 row content-start">
                <div class="col-6 row items-center">
                  <div
                    class="
                      col-11
                      row
                      items-center
                      justify-center
                      g-border
                      shadow-2
                      border-card
                    "
                  >
                    <div class="col-12 text-h5 text-center">
                      <q-icon
                        name="fire_extinguisher"
                        class="g-icon-h1 q-pb-sm"
                      />
                      {{ motel_equip.content }}
                    </div>
                    <div class="col-12"><br /></div>
                    <q-input
                      class="col-12"
                      v-model="motel_equip.place"
                      :rules="[
                        (val) => val.length >= 1 || 'Trường không bỏ trống  ',
                      ]"
                      type="text"
                      label-color="primary"
                      filled
                      label=" Nơi để"
                    >
                      <template v-slot:prepend>
                        <q-icon name="place" class="g-icon-h2 text-primary" />
                      </template>
                    </q-input>
                    <div class="col-12">
                      <br />
                      <mulity-img v-model:imgs="motel_equip.imgs"></mulity-img>
                    </div>
                  </div>
                </div>
                <div
                  class="
                    col-6
                    row
                    items-center
                    content-start
                    g-border
                    shadow-2
                    border-card
                  "
                >
                  <div class="col-12 text-h5 text-center">
                    <q-icon
                      name="home_repair_service"
                      class="g-icon-h1 q-pb-sm"
                    />
                    {{ motel_equips.content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <q-input
                    class="col-12"
                    v-model="motel_equips.place"
                    :rules="[
                      (val) => val.length >= 1 || ' Trường không bỏ trống ',
                    ]"
                    type="text"
                    label-color="primary"
                    filled
                    label=" Nơi để"
                  >
                    <template v-slot:prepend>
                      <q-icon name="place" class="g-icon-h2 text-primary" />
                    </template>
                  </q-input>
                  <div class="col-12">
                    <br />
                    <mulity-img v-model:imgs="motel_equips.imgs"></mulity-img>
                  </div>
                </div>
              </div>
              <div
                class="col-12 row items-center g-border shadow-up-1 border-card"
              >
                <div class="col-12 text-center text-h5 text-primary">
                  Cấu hình loại phòng
                </div>
                <div class="col-12 text-right">
                  <q-btn
                    color="black"
                    icon="add"
                    label=" Thêm loại "
                    rounded
                    no-caps
                    @click="addTypeRoom"
                  />
                </div>
                <div
                  class="
                    col-12
                    row
                    items-center
                    g-border
                    shadow-3
                    q-px-md q-py-md q-mt-sm
                  "
                  v-for="(room, index) in room_types"
                  :key="index"
                >
                  <div class="col-12"><br /></div>
                  <div class="col-12 row justify-between">
                    <div class="col-3">
                      <!-- <q-input
                        class="col-6"
                        v-model="room.names"
                        outlined
                        :rules="[
                          (val) => val.length >= 1 || ' Trường không bỏ trống ',
                        ]"
                        type="text"
                        label=" tên loại "
                        label-color="primary"
                      /> -->
                      <q-select
                        style="min-width: 90%"
                        v-model="room.names"
                        label-color="primary"
                        :options="roomTypesOt"
                        label="Tên loại phòng"
                        filled
                      />

                    </div>
                    <div class="row">
                      <q-input
                        class="q-mr-md"
                        outlined
                        v-model="room.const"
                        type="number"
                        label-color="primary"
                        label=" giá phòng "
                        :rules="[
                          (val) => val.length >= 1 || 'Trường không bỏ trống',
                        ]"
                        outline
                      />
                    </div>
                    <div>
                      <q-input
                        class="col-3"
                        outlined
                        :rules="[
                          (val) => val.length >= 1 || 'Trường không bỏ trống',
                        ]"
                        v-model="room.area"
                        type="number"
                        label-color="primary"
                        label=" Diện tích"
                        suffix="m2"
                      />
                    </div>
                    <div>
                      <q-input
                        class="col-3"
                        label-color="primary"
                        v-model="room.room_num"
                        outlined
                        type="number"
                        label=" Số phòng "
                      />
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row items-center justify-around">
                    <q-input
                      class="col-12"
                      outlined
                      v-model="room.content"
                      type="textarea"
                      label-color="primary"
                      label=" Đặt điểm"
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row items-center justify-around bd">
                    <q-checkbox
                      left-label
                      v-model="room.male"
                      label=" Cho nam"
                    />
                    <q-checkbox
                      left-label
                      v-model="room.female"
                      label=" Cho nữ "
                    />
                    <q-checkbox
                      left-label
                      v-model="room.everyone"
                      label=" Bất kì "
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12">
                    <br />
                    <mulity-img v-model:imgs="room.imgs"></mulity-img>
                  </div>
                  <div class="col-12 q-mt-md">
                    <q-card-actions align="right">
                      <q-btn
                        color="negative"
                        icon="delete"
                        no-caps
                        rounded
                        label=" Xóa loại phòng "
                        @click="delTypeRoom(index)"
                      />
                    </q-card-actions>
                  </div>
                  <div class="col-12"><br /></div>
                </div>
                <!-- <div class="col-12 row">
                  <div class="col-12 text-h6">
                    <q-checkbox
                      right-label
                      v-model="motel.auto_post"
                      label=" Tự động đăng bài khi có phòng trống "
                    />
                  </div>
                  <div class="col-12 text-red">
                    *Sử dụng các hình ảnh về loại phòng ,hình ảnh trọ, các thông
                    tin có sẳn để tạo bài đăng
                  </div>
                </div> -->
              </div>
            </q-card-section>
          </q-card>
          <q-card-actions align="center">
            <q-btn
              label=" Tạo trọ &nbsp;"
              type="submit"
              color="black"
              icon="check"
              no-caps
              rounded
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Tax from "../components/Tax.vue";
import MulityImg from "../components/MulityImg.vue";
import noti from "../boot/noti/noti";
export default {
  components: {
    Tax,
    MulityImg,
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  data() {
    return {
      zoom: 17,
      iconWidth: 25,
      center: { lat: 10.012245, lng: 105.76248 },
      iconHeight: 40,
      isError: false,
      isOpen: false,
      errorMes: "",
      motel: {
        names: "",
        address: "",
        phone_number: "",
        latitude: "",
        longitude: "",
        closed: 0,
        open: 0,
        camera: false,
        parking: "",
        deposit: 0,
        elec_cost: 0,
        water_cost: 0,
        people_cost: 0,
        people_name: " Phụ thu ",
        content: "",
        auto_post: true,
      },
      motel_img: {
        place: "",
        content: " Hình ảnh chung của trọ",
        img_type_id: 1,
        imgs: null,
      },

      motel_equip: {
        place: "",
        content: "Thiết bị chửa cháy ",
        img_type_id: 2,
        imgs: null,
      },
      motel_equips: {
        place: "",
        content: " Thiết bị sơ cứu",
        img_type_id: 2,
        imgs: null,
      },
      room_types: [
        {
          names: "Đơn",
          area: "",
          const: "",
          male: true,
          female: true,
          everyone: true,
          content: "",
          room_num: 1,
          imgs: "",
        },
      ],
      roomTypesOt: [
        {
          label: "Đơn",
          value: "Đơn",
        },
        {
          label: "Đôi",
          value: "Đôi",
        },
        {
          label: "Vip",
          value: "Vip",
        },
        {
          label: "Có gác",
          value: "Có gác",
        },
      ],
    };
  },
  methods: {
    addTypeRoom() {
      this.room_types.push({
        names: "",
        area: "",
        const: "",
        male: true,
        female: true,
        everyone: true,
        content: "",
        room_num: 1,
        imgs: "",
      });
    },
    delTypeRoom(num) {
      this.room_types.splice(num, 1);
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("khong ho tro");
      }
    },
    showPosition(position) {
      this.center = [position.coords.latitude, position.coords.longitude];
      this.motel.latitude = position.coords.latitude;
      this.motel.longitude = position.coords.longitude;
      console.log(this.center);
    },
    log(e) {
      this.motel.latitude = this.center.lat;
      this.motel.longitude = this.center.lng;
      console.log(this.motel.latitude + " " + this.motel.longitude);
    },
    async onsubmit() {
      let fd = new FormData();
      this.append(fd, this.motel_img.imgs, "motel_img");
      this.append(fd, this.motel_equip.imgs, "motel_equip");
      this.append(fd, this.motel_equips.imgs, "motel_equips");
      let a = this.room_types.length;
      fd.append("room_num", a);
      for (let i = 0; i < a; i++) {
        let type_name = "room" + i.toString();
        this.append(fd, this.room_types[i].imgs, type_name);
      }
      fd.append("motel", JSON.stringify(this.motel));
      fd.append("motel_img", JSON.stringify(this.motel_img));
      fd.append("motel_equip", JSON.stringify(this.motel_equip));
      fd.append("motel_equips", JSON.stringify(this.motel_equips));
      fd.append("room_types", JSON.stringify(this.room_types));
      const response = await this.$api.post("motelRegisterOne", fd, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      let errorCode = response.statusCode;
      if (errorCode == 0) {
        this.isError = true;
        this.errorMes = "email đã tồn tại ";
      } else {
        noti.showNoti(" Tạo Trọ thành công", "positive");
        this.$router.push({ name: "choseMotel" });
      }
    },
    append(fd, imgs, name) {
      const len = imgs.length;
      for (let i = 0; i < len; i++) {
        fd.append(name + i.toString(), imgs[i]);
      }
      fd.append(name + "_num", len);
    },
    onReset() {
      console.log("sdf");
    },
  },
};
</script>

<style scoped lang="sass">
.card-tro
  background-color: #F4F4F4
  margin-top: 20px
  border-radius: 2px
  padding: 0px 10px
  box-shadow: 0px 0px 6px gray
.border-card
  // background-color: #f4f4f4
  padding: 20px 7px
  // border-radius: 10px
  margin: 10px 0px
.bd
  padding: 10px 0px
  border-radius: 5px
  margin: 10px 0px
  box-shadow: 0px 0px 3px green
</style>
