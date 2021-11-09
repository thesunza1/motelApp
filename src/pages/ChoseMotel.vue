<template>
  <q-page padding>
    <div class="full-width text-h3 text-center text-primary">
     Danh sách trọ
   </div>
    <div class="row full-width justify-center" v-if="motels">
      <div
        v-for="(motel, index) in motels"
        :key="index"
        class="col-md-8 col-12 row justify-center items-center g-mx-md "
      >
        <div class="col-12"><br></div>
        <q-card class="my-card col-11 g-border">
          <q-card-section>
            <div class="text-h6 text-center text-primary g-header-up g-icon-h2">
              <q-icon name="apartment" />
              {{ motel.name }}
            </div>
            <div class="text-subtitle2">
              <b>Địa chỉ:</b> {{ motel.address }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row full-width">
              <div class="col-6"><b>Đặt cọc:</b> {{ toNum(motel.deposit)  }} Vnd</div>
              <div class="col-6">
                <b>Phụ thu:</b> {{ toNum(motel.people_cost) }} Vnd
              </div>
            </div>
            <div class="row full-width">
              <div class="col-6">
                <b>Giá Điện:</b> {{ toNum(motel.elec_cost) }} Vnd/Kwh
              </div>
              <div class="col-6">
                <b>Giá nước:</b> {{ toNum(motel.water_cost) }} Vnd/M3
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle2 text-primary">Danh sách loại Phòng</div>
            <div class="row items-center q-pt-sm">
              <div class="col-2 text-bold">Stt</div>
              <div class="col-5 text-bold">Tên loại</div>
              <div class="col-3 text-bold">Giá phòng</div>
              <div class="col-2 text-bold">Tổng số phòng</div>
              <div class="col-12"><hr /></div>
            </div>
            <div
              v-for="(roomType, index) in motel.room_types"
              :key="index"
              class="row items-center"
            >
              <div class="col-2">{{ ++index }}</div>
              <div class="col-5 g-header-up">{{ roomType.name }}</div>
              <div class="col-3 g-header-up">{{ toNum(roomType.cost)}} Vnd</div>
              <div class="text-right col-1">
                {{ countRoom(roomType.rooms) }}
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="negative"
              rounded
              no-caps
              icon="delete"
              label=" Xóa trọ"
              @click="deMotel(motel)"
            />
            <q-btn
              color="primary"
              rounded
              no-caps
              icon="arrow_forward"
              label=" Quản lý"
              @click="goMotel(motel.id)"
            />
          </q-card-actions>
        </q-card>
      </div>

      <q-dialog v-model="isDelete">
        <q-card v-if="thisMotel">
          <q-card-section class="row items-center">
            <q-avatar
              icon="delete"
              color="black"
              text-color="white"
            />
            <span class="q-ml-sm"
              > Bạn có muốn xóa vĩnh viễn trọ {{thisMotel.name}}</span
            >
          </q-card-section>
          <q-card-section>
            <div> Điều kiện xóa trọ: </div>
            <div> Tất cả các phòng đều không có người ở  </div>
            <div>khi xóa : tất cả dữ liệu từ trước đến nay đều sẽ bị xóa .</div>
            <div>Vui lòng gỏ vào ô xác nhận là: </div>
            <div class="text-negative text-center"> {{thisMotel.name  }} </div>
            <q-input v-model="checkMotelName" type="text" label=" Nhập vào chuỗi kí tự"/>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label=" Thoát" color="dark" v-close-popup />
            <q-btn flat label=" Xóa" color="negative" v-if="isBtnDelete" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="isCreate">
        <q-card style="min-width: 40%">
          <q-card-section>
            <div class="text-h6 text-primary text-center">
              Bạn có muốn tạo một trọ mới?
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat no-caps label=" Không" color="black" v-close-popup />
            <q-btn
              flat
              no-caps
              label=" Có"
              color="primary"
              v-close-popup
              @click="$router.push({ name: 'motelRegisterOne' })"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <q-footer bordered>
      <q-card-actions align="center" class="q-py-sm">
        <q-btn
          rounded
          class="bg-white text-black"
          no-caps
          icon="add"
          label=" Thêm trọ"
          @click="isCreate = true"
        />
      </q-card-actions>
    </q-footer>
  </q-page>
</template>

<script>
import motelApi from "../boot/callApi/motel";
import sp from "../boot/support";
export default {
  data() {
    return {
      motels: null,
      isDelete: false,
      thisMotel: null,
      isCreate: false,
      checkMotelName: '' ,
      isBtnDelete: false,
    };
  },
  watch: {
    checkMotelName(n_val , o_val) {
      console.log(n_val);
      console.log(this.thisMotel.name) ;
      if(n_val == this.thisMotel.name){
        this.isBtnDelete = true ;
      } else {
        this.isBtnDelete = false ;
      }
    }
  },
  async created() {
    const resMotels = await motelApi.getMotels();
    this.motels = resMotels.motels;
  },
  methods: {
    countRoom(roomType) {
      return sp.length(roomType);
    },
    goMotel(motelId) {
      this.$router.push({ name: "all", params: { motelId: motelId } });
    },
    deMotel(motel) {
      this.thisMotel = motel;
      this.isDelete = true;
    },
    toNum(num) {
      return sp.toNum(num) ;
    }
  },
};
</script>

<style></style>
