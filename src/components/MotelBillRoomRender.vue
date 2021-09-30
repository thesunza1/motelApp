<template>
  <div class="row items-center" style="width: 100%">
    <div v-if="allBillRoom" class="col-12 row items-center">
      <div
        v-for="(room_type, index) in allBillRoom"
        :key="index"
        class="col-12 row pd roomsbg"
      >
        <div class="col-12 text-h5">{{ room_type.name }}</div>
        <div
          class="col-4 col-md-2 text-h4"
          v-for="(room, index) in room_type.had_rooms"
          :key="index"
        >
          <q-card class="my-card">
            <q-card-section
              class="
                text-white text-center
                rooms
                row
                justify-center
                items-center
              "
              :class="{
                'bg-blue-6': room.tenant.bill_num == 0,
                'bg-red-7': room.tenant.no_bills > 0,
                'bg-deep-orange-7':
                  room.tenant.no_bills == 0 && room.tenant.bill_num > 0,
              }"
              @click="openDialog(room)"
            >
              <div class="col-12">{{ room.name }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12"><br /></div>
      </div>
    </div>

    <q-dialog v-model="isDetailBill">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          v-if="thisRoom"
          class="row pd full-width justify-center text-white bg-positive"
        >
          <div class="col-12 text-center text-h5">
            phòng: {{ thisRoom.name }}
          </div>
          <div class="col-12"><br /></div>
        </q-card-section>
        <div
          v-for="(bill, index) in thisBills"
          :key="index"
          class="full-width row items-center"
        >
          <div class="col-12"><br /></div>
          <q-card-section
            class="col-12 row justify-center"
            :class="{
              'bg-red-2': bill.status == 0,
              'bg-green-2': bill.status == 1,
            }"
          >
            <div class="col-6">từ: {{ toDate(bill.date_begin) }}</div>
            <div class="col-6">đến: {{ toDate(bill.date_end) }}</div>
            <div class="col-12"><br /></div>
            <div v-if="index ==0" class="col-md-4 col-12 row justify-center items-center">
              <div class="col-7 text-left">điện: {{ bill.elec_begin }} -</div>
              <q-input
                outlined
                standout="bg-teal text-white"
                bg-color="white"
                class="col-4"
                v-model="bill.elec_end"
                type="number"
              />
              <div class="col-1">kwh</div>
            </div>
            <div v-else class="col-md-4 col-12 row justify-center items-center">
              <div class=" text-left">điện: {{ bill.elec_begin }} - {{bill.elec_end}} kwh</div>
            </div>
            <div class="col-md-8 col-12 row items-center justify-center">
              <div>
                tổng: {{ bill.elec_end - bill.elec_begin }} *
                {{ bill.elec_cost }}
              </div>
              <div>
                = {{ (bill.elec_end - bill.elec_begin) * bill.elec_cost }}vnd
              </div>
            </div>
            <div class="col-12"><br></div>
            <div v-if="index==0" class="col-md-4 col-12 row justify-center items-center">
              <div class="col-7 text-left"> nước: {{ bill.water_begin }} -</div>
              <q-input
                outlined
                standout="bg-teal text-white"
                bg-color="white"
                class="col-4"
                v-model="bill.water_end"
                type="number"
              />
              <div class="col-1">m3</div>
            </div>
            <div v-else class="col-md-4 col-12 row justify-center items-center">
              <div class=" text-left"> nước: {{ bill.water_begin }} - {{bill.water_end}} kwh</div>
            </div>
            <div class="col-12 col-md-8 row items-center justify-center">
              <div>
                tổng: {{ bill.water_end - bill.water_begin }} *
                {{ bill.water_cost }}vnd
              </div>
              <div>
                = {{ (bill.water_end - bill.water_begin) * bill.water_cost }}
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row justify-end items-center">
              <div class="gt-sm col-6"></div>
              <div class="col-md-6 col-10">
                phí người: {{ bill.people_cost }}nvd
              </div>
              <div class="gt-sm col-6"></div>
              <div class="col-md-6 col-10">tiền trọ: {{ bill.cost }}nvd</div>
              <div class="col-12"><br /></div>
              <div class="gt-sm col-6"></div>
              <div class="col-md-6 col-10">
                tổng phải trả:
                {{
                  bill.cost +
                  bill.people_cost +
                  (bill.water_end - bill.water_begin) * bill.water_cost +
                  (bill.elec_end - bill.elec_begin) * bill.elec_cost
                }}vnd
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row justify-end">
              <q-btn
                v-if="bill.status == 0"
                color="positive"
                style="margin-right: 5px"
                label="đã trả"
                @click="checkBill(bill.id, index)"
              />
              <q-btn
                v-if="bill.status == 0 && index == 0"
                color="primary"
                style="margin-right: 5px"
                label="cập nhật"
                @click="updateBill(bill.id, bill.water_end, bill.elec_end)"
              />
              <q-btn
                color="orange"
                label="thông báo"
                @click="notiUser(bill.id)"
              />
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isRoomBill">
      <q-card>
        <q-card-section class="row items-center bg-primary text-white">
          <span class="q-ml-sm"> chọn phòng để tạo</span>
        </q-card-section>
        <q-card-section> *chọn phòng để tạo bill </q-card-section>
        <q-card-section>
          <div v-for="(roomType, index) in allBillRoom" :key="index">
            <div class="row full-width items-center">
              <div class="col-12">{{ roomType.name }}</div>
              <div class="col-12 row items-center">
                <div v-for="(room, index) in roomType.had_rooms" :key="index">
                  <q-checkbox
                    v-model="chooseRoom"
                    :val="room.id"
                    :label="room.name"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" thoát" v-close-popup />
          <q-btn flat label=" tạo bill " @click="createSomeBill" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-footer class="bg-grey-1 row items-center justify-center">
      <div class="">
        <q-btn
          color="primary"
          icon="add"
          label=" tạo cả trọ"
          @click="createAllBill"
        />
      </div>
      <div class="">
        <q-btn
          color="primary"
          icon="add"
          label=" tạo theo phòng"
          @click="isRoomBill = true"
          style="margin-left: 7px"
        />
      </div>
      <div class="col-12"><br /></div>
    </q-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 1000,
      });
    }
    return {
      showNoti,
    };
  },
  props: {
    motel_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      thisRoom: {},
      thisBills: null,
      userFind: null,
      allBillRoom: null,
      error: {},
      isDetailBill: false,
      isRoomBill: false,
      chooseRoom: [],
    };
  },
  computed: {
    ...mapGetters("RoomStatuses", ["roomStatuses"]),
  },
  methods: {
    roomStatus(room) {
      return room.room_status.name;
    },
    async createAllBill() {
      const allbill = await this.$api.post("createAllBill");
      var mes = " ";
      var col = "red";
      if (allbill.data.statusCode == 3) {
        this.error = allbill.data.room;
        mes = " phòng " + this.error.name + " chưa xác nhận điện nước";
        col = " red";
      } else if (allbill.data.statusCode == 2) {
        this.error = allbill.data.room;
        mes = " phòng " + this.error.name + " chưa đủ ngày để tạo thanh toán";
        col = " red";
      } else if (allbill.data.statusCode == 1) {
        mes = "khởi tạo thành công";
        col = "positive";
        this.getAllBill;
      } else if (allbill.data.statusCode == 0) {
        mes = " phòng " + this.error.name + "chưa xác nhận điện nước";
        col = " red";
      }
      this.showNoti(mes, col);
    },
    async getAllBill() {
      try {
        const bills = await this.$api.get("getBillAllRoom");
        if (bills.data.statusCode == 1) {
          this.allBillRoom = bills.data.allBillRoom;
        }
      } catch (error) {}
    },
    openDialog(room) {
      this.thisRoom = room;
      this.thisBills = room.tenant.bills;
      this.isDetailBill = true;
    },
    async createSomeBill() {
      const create = await this.$api.post("createSomeBill", {
        rooms: this.chooseRoom,
      });
      if (create.data.statusCode == 1) {
        this.showNoti("đã tạo thành công");
        this.getAllBill();
        this.isRoomBill = false;
      } else if(create.data.statusCode ==3) {
        this.showNoti(' lỗi : phòng '+ create.data.room.name+' chưa xác nhận số điện nước');
      }
    },
    toDate(date) {
      return date.slice(0, 10);
    },
    async updateBill(billId, waterEnd, elecEnd) {
      const update = await this.$api.post("updateBillNum", {
        bill_id: billId,
        water_end: waterEnd,
        elec_end: elecEnd,
      });
      if (update.data.statusCode == 1) {
        this.getAllBill();
        this.showNoti("cập nhật thành công");
      }
    },
    async checkBill(billId, index) {
      const update = await this.$api.post("updateBillStatus", {
        bill_id: billId,
      });
      if (update.data.statusCode == 1) {
        this.showNoti("thay đổi thành công");
        this.getAllBill();
        this.isDetailBill = false;
      }
    },
    async notiUser(billId) {
      const send = await this.$api.get("sendNotiBill/" + billId);
      if (send.data.statusCode == 1) {
        this.showNoti("đã gửi thành công");
      }
    },
  },
  async created() {
    try {
      const bills = await this.$api.get("getBillAllRoom");

      if (bills.data.statusCode == 1) {
        this.allBillRoom = bills.data.allBillRoom;
      }
    } catch (error) {}
  },
};
</script>

<style scoped lang='sass'>
$fontSize: 20px
.my-card
  // height: 130px
  margin: 10px 10px

.rooms
  height: 70px
.modalb
  min-width: 95vw
@media (min-width: 1026px)
  .rooms
    height: 150px
  .modalb
    min-width: 75vw
.pd
  padding: 10px 20px
.fs
  font-size: $fontSize
.br
  border-radius: 10px
.mr
  margin: 10px !important
.mob
  height: 10vh
</style>
