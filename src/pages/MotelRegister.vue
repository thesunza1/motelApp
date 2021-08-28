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
        <form method="post">
          <q-card-section>
            <div class="text-h3 text-center">register as user</div>
          </q-card-section>
          <q-card-section class="row">
            <q-input
              class="col-11 col-md-6"
              clearable
              v-model="user.email"
              type="email"
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
              label="password"
            >
              <template v-slot:before>
                <q-icon name="password" />
              </template>
            </q-input>
            <q-input
              class="col-12"
              v-model="user.names"
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
              type="text"
              label=" địa chỉ nhà "
            />
            <q-input
              class="col-12"
              v-model="user.job"
              type="text"
              label="công việc, nghề nghiệp "
            />
          </q-card-section>
          <br />
          <q-card class="my-card">
            <q-card-section class="row justify-center">
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
                :rules="[(val) => val.length > 0 || ' sdt không được để trống']"
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
              <div class="col-12">map</div>
              <div class="col-12 row items-center justify-around">
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
              <div class="col-12 row items-center justify-around">
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
              <div class="col-12"><br /></div>
              <div class="text-h5">
                thiết lập giá
              </div>

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
                  label="Label"
                  suffix="VND/phong"
                />
              </div>
              <div class="col-12"><br /></div>
              <div class="text-h5">
                thiết lập thuế thiết bị
              </div>
              <div class="col-12">
                <Tax
                  v-model:cost="motel.water_more"
                  :name="motel.water_name"
                ></Tax>
                <Tax
                  v-model:cost="motel.elec_more"
                  :name="motel.elec_name"
                ></Tax>
                <Tax
                  v-model:cost="motel.people_cost"
                  :name="motel.people_name"
                ></Tax>
              </div>
            </q-card-section>
          </q-card>
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Tax from "../components/Tax.vue";
export default {
  components: {
    Tax,
  },
  data() {
    return {
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
        deposit: "00",
        elec_cost: 0,
        water_cost: 0,
        elec_more: 0,
        elec_name: " thuế điện ",
        water_more: 0,
        water_name: " thuế nước",
        people_cost: 0,
        people_name: " thuế người ",
        content: "",
        auto_post: 1,
      },
      motel_img: [
        {
          place: "hinh ảnh chung của trọ",
          content: "",
          img_type_id: 1,
          imgs: "",
        },
        {
          place: "",
          content: "",
          img_type_id: 2,
          imgs: "",
        },
      ],
      room_types: [
        {
          names: "",
          area: 0,
          const: 0,
          male: 0,
          female: 0,
          everyone: 0,
          content: " ",
          room_num: 0,
          imgs: "",
        },
      ],
    };
  },
};
</script>

<style>
</style>
