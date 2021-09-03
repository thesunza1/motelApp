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
      <q-card class="my-card col-12 col-md-8">
        <q-form @reset="onReset" class="q-gutter-md"
         @submit="onsubmit"
        >
          <q-card-section>
            <div class="text-h3 text-center">register as motel</div>
          </q-card-section>
          <q-card-section class="row">
            <q-input
              class="col-11 col-md-6"
              clearable
              v-model="user.email"
              type="text"
              :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
              label="email"
              suffix="@gmail.com"
            >
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
            <div class="gt-sm col-md-1"></div>
            <q-input
              class="col-11 col-md-5"
              clearable
              v-model="user.password"
              type="password"
              :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
              label="password"
            >
              <template v-slot:before>
                <q-icon name="password" />
              </template>
            </q-input>
            <q-input
              class="col-12"
              v-model="user.names"
              :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
              type="text"
              label=" họ tên "
            >
              <template v-slot:before>
                <q-icon name="portrait" />
              </template>
            </q-input>
            <div
              class="col-12"
              style="margin-top: 30px; font-size: 1.3em; color: gray"
            >
              <div class="row items-center">
                <div class="col-2" style="margin-left: 5px; font-size: 1.1em">
                  <q-icon name="face" />
                  giới tính:
                </div>
                <div class="col-1">
                  <input type="radio" id="name" value="1" v-model="user.sex" />
                  <label for="name"> nam</label>
                </div>
                <div class="col-1">
                  <input type="radio" id="nu" value="0" v-model="user.sex" />
                  <label for="nu"> nữ </label>
                </div>
                <div class="col-1"></div>
                <q-input
                  class="col"
                  v-model="user.phone_number"
                  :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
                  type="text"
                  label="phone number"
                />
              </div>
            </div>
            <q-input
              class="col-12 col-md-12"
              v-model="user.date"
              mask="date"
              label="birth date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale">
                    <q-date v-model="user.date" landscape minimal>
                      <div class="row items-center justify-center">
                        <q-btn
                          v-close-popup
                          color="primary"
                          label="close"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              class="col-12"
              v-model="user.address"
              :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
              type="text"
              label=" địa chỉ nhà "
            />
            <q-input
              class="col-12"
              v-model="user.job"
              type="text"
              :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
              label="công việc, nghề nghiệp "
            />
          </q-card-section>
          <hr />
          <q-card class="my-card">
            <q-card-section class="row justify-center">
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-center text-h3">cấu hình trọ</div>
                <q-input
                  class="col-7"
                  v-model="motel.names"
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
                  <q-btn
                    color="primary"
                    icon="check"
                    label=" định vị "
                    @click="getLocation()"
                  />
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
                  <q-checkbox
                    left-label
                    v-model="isOpen"
                    label=" đống mở cổng "
                  />
                  <q-input
                    :disable="!isOpen"
                    v-model="motel.open"
                    type="number"
                    label=" giờ mở"
                    suffix="h"
                  />
                  <q-input
                    :disable="!isOpen"
                    v-model="motel.closed"
                    type="number"
                    label=" giờ đóng"
                    suffix="h"
                  />
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row items-center justify-around bd">
                  <q-checkbox
                    class="col-5"
                    right-label
                    v-model="motel.camera"
                    label=" có camera "
                  />
                  <q-input
                    v-model="motel.parking"
                    type="text"
                    label=" chổ để xe"
                  />
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12 row items-center border-card">
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
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">
                  thiết lập thuế thiết bị
                </div>
                <div class="col-12 text-red" style="padding-left: 10px">
                  *sử dụng các thiết bị tiêu hao nhiều điện,nước sẽ tính thêm
                  tiền
                </div>
                <div class="col-12">
                  <Tax
                    class="bd"
                    v-model:cost="motel.water_more"
                    :name="motel.water_name"
                  ></Tax>
                  <Tax
                    class="bd"
                    v-model:cost="motel.elec_more"
                    :name="motel.elec_name"
                  ></Tax>
                  <Tax
                    class="bd"
                    v-model:cost="motel.people_cost"
                    :name="motel.people_name"
                  ></Tax>
                </div>
              </div>

              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">
                  {{ motel_img.content }}
                </div>
                <div class="col-12 text-red" style="padding-left: 10px">
                  * hình ảnh và nội dung sẽ được sử dụng khi đăng bài
                </div>
                <div class="col-12">
                  <mulity-img v-model:imgs="motel_img.imgs"></mulity-img>
                </div>
                <div class="col-12"><br></div>
                <div class="col-12">
                  <q-input outlined v-model="motel.content" type="textarea" label=" giới thiệu về trọ" />
                </div>
              </div>
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">
                  {{ motel_equip.content }}
                </div>
                <q-input
                  class="col-12"
                  v-model="motel_equip.place"
                  :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
                  type="text"
                  filled
                  label=" nơi để"
                />
                <div class="col-12">
                  <br />
                  <mulity-img v-model:imgs="motel_equip.imgs"></mulity-img>
                </div>
              </div>
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">
                  {{ motel_equips.content }}
                </div>
                <q-input
                  class="col-12"
                  v-model="motel_equips.place"
                  :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
                  type="text"
                  filled
                  label=" nơi để"
                />
                <div class="col-12">
                  <br />
                  <mulity-img v-model:imgs="motel_equips.imgs"></mulity-img>
                </div>
              </div>
              <div class="col-12 row items-center">
                <div class="col-12 text-center text-h5">
                  cấu hình loại phòng
                </div>
                <div class="col-12 text-right">
                  <q-btn
                    color="primary"
                    icon="add"
                    label=" thêm loại "
                    @click="addTypeRoom"
                  />
                </div>
                <div
                  class="col-12 row items-center card-tro"
                  v-for="(room, index) in room_types"
                  :key="index"
                >
                  <div class="col-12"><br /></div>
                  <div class="col-12 row justify-between">
                    <q-input
                      class="col-6"
                      v-model="room.names"
                      :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
                      type="text"
                      label=" tên loại "
                    />
                    <q-btn
                      class="col-3"
                      color="negative"
                      icon="delete"
                      label=" xóa "
                      @click="delTypeRoom(index)"
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row">
                    <q-input
                      class="col-3"
                      v-model="room.const"
                      type="number"
                      label=" giá phòng "
                      :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
                      standout="bg-teal text-white"
                      outline
                    />
                  </div>
                  <div class="col-12 row items-center justify-around">
                    <q-input
                      standout="bg-teal text-white"
                      class="col-3"
                      :rules="[(val) => val.length >= 1 || 'dung bo trong ']"
                      v-model="room.area"
                      type="number"
                      label=" diện tích"
                      suffix="m2"
                    />
                    <q-input
                      standout="bg-teal text-white"
                      class="col-4"
                      v-model="room.content"
                      type="textarea"
                      label=" đặt điểm"
                    />
                    <q-input
                      standout="bg-teal text-white"
                      class="col-3"
                      v-model="room.room_num"
                      type="number"
                      label=" số phòng "
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row items-center justify-around bd">
                    <q-checkbox
                      left-label
                      v-model="room.male"
                      label=" cho nam"
                    />
                    <q-checkbox
                      left-label
                      v-model="room.female"
                      label=" cho nữ "
                    />
                    <q-checkbox
                      left-label
                      v-model="room.everyone"
                      label=" bất kì "
                    />
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12">
                    <br />
                    <mulity-img v-model:imgs="room.imgs"></mulity-img>
                  </div>

                  <div class="col-12"><br /></div>
                </div>
                <div class="col-12 row">
                  <div class="col-12 text-h6">
                    <q-checkbox
                      right-label
                      v-model="motel.auto_post"
                      label=" tự động đăng bài khi có phòng trống "
                    />
                  </div>
                  <div class="col-12 text-red">
                    *sử dụng các hình ảnh về loại phòng ,hình ảnh trọ, các thông
                    tin có sẳn để tạo bài đăng
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <div>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Tax from "../components/Tax.vue";
import MulityImg from "../components/MulityImg.vue";
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
      user: {
        names: "sdfs",
        email: "",
        password: "",
        address: "",
        sex: 0,
        date: "2019-02-23",
        phone_number: "",
        job: "",
      },
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
        elec_more: 0,
        elec_name: " thuế điện ",
        water_more: 0,
        water_name: " thuế nước",
        people_cost: 0,
        people_name: " thuế người ",
        content: "",
        auto_post: true,
      },
      motel_img: {
        place: "",
        content: "hinh ảnh chung của trọ",
        img_type_id: 1,
        imgs: null,
      },

      motel_equip: {
        place: "",
        content: " thiết bị chửa cháy :",
        img_type_id: 2,
        imgs: null,
      },
      motel_equips: {
        place: "",
        content: " thiết bị sơ cứu",
        img_type_id: 2,
        imgs: null,
      },
      room_types: [
        {
          names: "",
          area: '',
          const: '',
          male: true,
          female: true,
          everyone: true,
          content: '',
          room_num: 1,
          imgs: "",
        },
      ],
    };
  },
  methods: {
    addTypeRoom() {
      this.room_types.push({
        names: "",
        area: '' ,
        const: '',
        male: true,
        female: true,
        everyone: true,
        content: '',
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
      }
    },
    showPosition(position) {
      this.center = [position.coords.latitude, position.coords.longitude];
      this.motel.latitude = position.coords.latitude;
      this.motel.longitude = position.coords.latitude;
      // console.log(this.center);
    },
    log(e) {
      this.motel.latitude = this.center.lat;
      this.motel.longitude = this.center.lng;
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
      fd.append("users", JSON.stringify(this.user));
      fd.append("motel", JSON.stringify(this.motel));
      fd.append("motel_img", JSON.stringify(this.motel_img));
      fd.append("motel_equip", JSON.stringify(this.motel_equip));
      fd.append("motel_equips", JSON.stringify(this.motel_equips));
      fd.append("room_types", JSON.stringify(this.room_types));
      const response = await this.$api.post("motelRegister", fd, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      let errorCode = response.statusCode;
      if(errorCode == 0 ) {
        this.isError =true ;
        this.errorMes = 'email đã tồn tại ' ;
      } else  {
        this.$router.push('/login');
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
  background-color: #f4f4f4
  padding: 20px 7px
  border-radius: 20px
  margin: 10px 0px
  box-shadow: 0px 0px 6px gray
.bd
  padding: 10px 0px
  border-radius: 5px
  margin: 10px 0px
  box-shadow: 0px 0px 3px green

</style>
