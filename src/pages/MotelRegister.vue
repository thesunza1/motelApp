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
        <q-form @reset="onReset" class="q-gutter-md" @submit="onsubmit">
          <q-card-section>
            <div class="text-h3 text-center"> Tạo tài khoản trọ</div>
          </q-card-section>
          <!-- <q-card-section class="row">
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
          </q-card-section> -->
          <q-card-section class="row">
            <q-input
              class="col-11 col-md-6"
              label-color="primary"
              clearable
              v-model="user.email"
              type="email"
              :rules="[(val) => val.length >= 1 || ' Không bỏ trống ']"
              label="Email"
              suffix="@gmail.com"
            >
            </q-input>
            <div class="gt-sm col-md-1"></div>
            <q-input
              class="col-11 col-md-5"
              clearable
              v-model="user.password"
              type="password"
              label-color="primary"
              label=" Mật khẩu"
            >
            </q-input>
            <q-input
              class="col-12 col-md-6"
              v-model="user.names"
              type="text"
              label-color="primary"
              label=" Họ tên "
            >
            </q-input>
            <div class="col-1"></div>
            <div class="col-12 col-md-5 q-py-md row items-center">
              <div class="" style="margin-left: 5px; font-size: 1.1em">
                <q-icon name="face" />
                &nbsp;Giới tính: &nbsp;
              </div>
              <div class="">
                <input type="radio" id="name" value="0" v-model="user.sex" />
                <label for="name"> Nam</label>
              </div>
              <div class="">
                <input type="radio" id="nu" value="1" v-model="user.sex" />
                <label for="nu"> Nữ </label>
              </div>
              <div class="col-1"></div>
            </div>
            <div class="col-12 row q-py-sm items-center">
              <q-input
                class="col-12 col-md-6"
                v-model="user.date"
                label-color="primary"
                mask="date"
                label=" Ngày sinh"
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
              <div class="col-1"></div>
              <q-input
                class="col"
                v-model="user.phone_number"
                label-color="primary"
                type="text"
                label=" Số điện thoại"
              />
            </div>
            <q-input
              class="col-6"
              v-model="user.address"
              type="text"
              label-color="primary"
              label="Địa chỉ nhà "
            />
            <div class="col-1"></div>
            <q-input
              class="col-5"
              v-model="user.job"
              label-color="primary"
              type="text"
              label="Công việc, nghề nghiệp "
            />
          </q-card-section>
          <hr />
          <q-card class="my-card">
            <q-card-section class="row justify-center">
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-center text-h3">Cấu hình trọ</div>
                <q-input
                  class="col-7"
                  v-model="motel.names"
                  type="text"
                  label=" Tên trọ"
                  label-color="primary"
                  :rules="[
                    (val) => val.length > 0 || 'Tên trọ không được để trống',
                  ]"
                />
                <div class="col-1"></div>
                <q-input
                  class="col-4"
                  v-model="motel.phone_number"
                  type="text"
                  label="Số điện thoại"
                  :rules="[(val) => val.length > 0 || 'Không được để trống']"
                />
                <q-input
                  class="col-12"
                  v-model="motel.address"
                  type="text"
                  label=" Địa chỉ"
                  :rules="[
                    (val) => val.length > 0 || ' Địa chỉ không được để trống',
                  ]"
                />
                <div class="col-12 row items-center">
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
                <div class="col-12 row items-center justify-around bd">
                  <q-checkbox
                    left-label
                    v-model="isOpen"
                    label=" Đóng mở cổng "
                  />
                  <q-input
                    :disable="!isOpen"
                    v-model="motel.open"
                    type="number"
                    label=" Giờ mở"
                    suffix="h"
                  />
                  <q-input
                    :disable="!isOpen"
                    v-model="motel.closed"
                    type="number"
                    label=" Giờ đóng"
                    suffix="h"
                  />
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row items-center justify-around bd">
                  <q-checkbox
                    class="col-5"
                    right-label
                    v-model="motel.camera"
                    label=" Có camera "
                  />
                  <q-input
                    v-model="motel.parking"
                    type="text"
                    label=" Chổ để xe"
                  />
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">Thiết lập giá</div>
                <div class="col-12 row items-center justify-around">
                  <q-input
                    v-model="motel.elec_cost"
                    type="number"
                    label=" Tiền điện"
                    suffix="VNĐ/kwh"
                  />
                  <q-input
                    v-model="motel.water_cost"
                    type="number"
                    label=" Tiện nước"
                    suffix="VNĐ/m3"
                  />
                  <q-input
                    v-model="motel.deposit"
                    type="number"
                    label=" Đặt cọc"
                    suffix="VNĐ/phòng"
                  />
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
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">
                  {{ motel_img.content }}
                </div>
                <div class="col-12 text-red" style="padding-left: 10px">
                  *Hình ảnh và nội dung sẽ được sử dụng khi đăng bài
                </div>
                <div class="col-12">
                  <mulity-img v-model:imgs="motel_img.imgs"></mulity-img>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <q-input
                    outlined
                    v-model="motel.content"
                    type="textarea"
                    label="Giới thiệu về trọ"
                  />
                </div>
              </div>
              <div class="col-12 row items-center border-card">
                <div class="col-12 text-h5 text-center">
                  {{ motel_equip.content }}
                </div>
                <q-input
                  class="col-12"
                  v-model="motel_equip.place"
                  :rules="[(val) => val.length >= 1 || ' Không bỏ trống ']"
                  type="text"
                  filled
                  label=" Nơi để"
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
                  :rules="[(val) => val.length >= 1 || ' Không bỏ trống']"
                  type="text"
                  filled
                  label=" Nơi để"
                />
                <div class="col-12">
                  <br />
                  <mulity-img v-model:imgs="motel_equips.imgs"></mulity-img>
                </div>
              </div>
              <div class="col-12 row items-center">
                <div class="col-12 text-center text-h5">
                  Cấu hình loại phòng
                </div>
                <div class="col-12 text-right">
                  <q-btn
                    color="primary"
                    icon="add"
                    label="Thêm loại "
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
                      :rules="[(val) => val.length >= 1 || 'Không bỏ trống ']"
                      type="text"
                      label=" Tên loại "
                    />
                    <q-card-actions class="col-3" align="right">
                      <q-btn
                        color="negative"
                        icon="delete"
                        no-caps
                        label=" Xóa "
                        @click="delTypeRoom(index)"
                      />
                    </q-card-actions>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row">
                    <q-input
                      class="col-3"
                      v-model="room.const"
                      type="number"
                      label=" Giá phòng "
                      :rules="[(val) => val.length >= 1 || 'Không bỏ trống ']"
                      standout="bg-teal text-white"
                      outline
                    />
                  </div>
                  <div class="col-12 row items-center justify-around">
                    <q-input
                      standout="bg-teal text-white"
                      class="col-3"
                      :rules="[(val) => val.length >= 1 || 'Không bỏ trống ']"
                      v-model="room.area"
                      type="number"
                      label=" Diện tích"
                      suffix="m2"
                    />
                    <q-input
                      standout="bg-teal text-white"
                      class="col-4"
                      v-model="room.content"
                      type="textarea"
                      label=" Đặt điểm"
                    />
                    <q-input
                      standout="bg-teal text-white"
                      class="col-3"
                      v-model="room.room_num"
                      type="number"
                      label=" Số phòng "
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

                  <div class="col-12"><br /></div>
                </div>
                <div class="col-12 row">
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
                </div>
              </div>
            </q-card-section>
          </q-card>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
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
      user: {
        names: "",
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
        people_cost: 0,
        people_name: " Phụ thu",
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
          names: "",
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
        console.log(" Thiết bị không hỗ trợ");
        // alert('khong ho tro');
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
      if (errorCode == 0) {
        this.isError = true;
        this.errorMes = "Email đã tồn tại ";
      } else {
        noti.showNoti("Tạo tài khoản thành công", "positive");
        this.$router.push("/");
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
