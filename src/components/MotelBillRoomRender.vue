<template>
  <div class="row items-center" style="width: 100%">
    <div v-if="allBillRoom" class="row items-center col-12">
      <div
        v-for="(room_type, index) in allBillRoom"
        :key="index"
        class="col-12 pd"
      >
        <q-expansion-item
          expand-separator
          icon="store"
          :label="` ${room_type.name}`"
          :caption="` Phòng có người: ${numRoom(room_type.had_rooms)} `"
          header-class="text-primary g-icon-h1 g-header-up "
          class="col-12 shadow-up-2 pd bg-white g-border"
        >
          <template v-slot:header>
            <q-item class="full-width">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="store" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="g-header-up text-h6">
                  {{ room_type.name }}
                </q-item-label>
                <q-item-label caption lines="2">
                  <div class="row text-black items-center q-gutter-md">
                    <div class="q-py-sm q-px-sm">
                      Phòng có người: {{ numRoom(room_type.had_rooms) }}
                    </div>
                    <div>
                      <div
                        class="g-display-inline bg-green q-py-sm q-px-sm"
                      ></div>
                      Tất cả hóa dơn đã thanh toán
                    </div>
                    <div class="q-py-sm q-px-sm">
                      <div
                        class="g-display-inline bg-red q-py-sm q-px-sm"
                      ></div>
                      Có hóa đơn chưa thanh toán
                    </div>
                    <div class="q-py-sm q-px-sm">
                      <div
                        class="g-display-inline bg-blue q-py-sm q-px-sm"
                      ></div>
                      Chưa có hóa đơn nào
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <div class="full-width row items-center">
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
                    'bg-blue-5': room.tenant.bill_num == 0,
                    'bg-red-4': room.tenant.no_bills > 0,
                    'bg-green-5':
                      room.tenant.no_bills == 0 && room.tenant.bill_num > 0,
                  }"
                  @click="openDialog(room)"
                >
                  <div class="col-12 g-header-up">{{ room.name }}</div>
                  <div
                    class="col-12 text-subtitle2"
                    v-if="room.tenant.no_bills > 0"
                  >
                    Chưa thanh toán: {{ room.tenant.no_bills }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-expansion-item>

        <div class="col-12"><br /></div>
      </div>
    </div>

    <q-dialog v-model="isDetailBill">
      <q-layout
        v-if="thisRoom"
        view="hHr LpR lFf"
        container
        class="g-background g-border g-card-width"
      >
        <q-header class="bg-white text-positive text-center">
          <div class="text-h5 q-py-md">
            <q-icon name="store" />
            Phòng: {{ thisRoom.name }}
          </div>
          <q-card-section class="full-width text-left">
            <div class="text-negative text-subtitle2">
              {{ `Hóa đơn chưa trả: ${numBill(thisBills, 0)}` }}
            </div>
            <div class="text-positive text-subtitle2">
              {{ `Hóa đơn đã trả: ${numBill(thisBills, 1)}` }}
            </div>
          </q-card-section>
        </q-header>
        <q-page-container>
          <q-page padding>
            <div
              v-for="(bill, index) in thisBills"
              :key="index"
              class="full-width row items-center"
            >
              <div class="col-12"><br /></div>
              <q-card class="my-card g-border">
                <q-card-section
                  class="col-12 text-white row justify-center"
                  :class="{
                    'bg-negative': bill.status == 0,
                    'bg-positive': bill.status == 1,
                  }"
                >
                  <div class="col-6">
                    <b> Từ:</b> {{ toDate(bill.date_begin) }}
                  </div>
                  <div class="col-6">
                    <b> Đến:</b> {{ toDate(bill.date_end) }}
                  </div>
                </q-card-section>
                <q-card-section class="col-12 row justify-center">
                  <div
                    v-if="index == 0 && bill.status == 0"
                    class="col-md-4 col-12 row items-center"
                  >
                    <div class="text-left col-5">
                      <b> Số điện: </b>{{ bill.elec_begin }} -
                    </div>
                    <q-input
                      outlined
                      class="q-px-md col-7"
                      v-model="bill.elec_end"
                      dense
                      suffix="Kwh"
                      type="number"
                    />
                  </div>
                  <div
                    v-else
                    class="col-md-4 col-12 row justify-center items-center"
                  >
                    <div class="text-left">
                      <b> Điện: </b> {{ bill.elec_begin }} -
                      {{ bill.elec_end }} kwh
                    </div>
                  </div>
                  <div class="col-md-8 col-12 row items-center justify-center">
                    <div>
                      <b> Tổng Điện: </b>{{ bill.elec_end - bill.elec_begin }} *
                      {{ toNum(bill.elec_cost) }}
                    </div>
                    <div>
                      =
                      {{
                        toNum(
                          (bill.elec_end - bill.elec_begin) * bill.elec_cost
                        )
                      }}
                      VNĐ
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div
                    v-if="index == 0 && bill.status == 0"
                    class="col-md-4 col-12 row items-center"
                  >
                    <div class="text-left col-5">
                      <b>Số nước: </b>{{ bill.water_begin }} -
                    </div>
                    <q-input
                      outlined
                      bg-color="white"
                      dense
                      suffix="M3"
                      class="q-px-md col-7"
                      v-model="bill.water_end"
                      type="number"
                    />
                  </div>
                  <div
                    v-else
                    class="col-md-4 col-12 row justify-center items-center"
                  >
                    <div class="text-left">
                      <b>Nước: </b> {{ bill.water_begin }} -
                      {{ bill.water_end }} kwh
                    </div>
                  </div>
                  <div class="col-12 col-md-8 row items-center justify-center">
                    <div>
                      <b>Tổng nước:</b>
                      {{ bill.water_end - bill.water_begin }} *
                      {{ toNum(bill.water_cost) }}
                    </div>
                    <div>
                      =
                      {{
                        toNum(
                          (bill.water_end - bill.water_begin) * bill.water_cost
                        )
                      }}
                      VNĐ
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12">
                    <hr />
                  </div>
                  <div class="col-12 row justify-center items-center">
                    <div class="col-12 text-right">
                      <b> Phụ thu:</b> {{ toNum(bill.people_cost) }} VNĐ
                    </div>
                    <div class="col-12"><br /></div>
                    <div class="col-12 text-right">
                      <b> Tiền trọ:</b> {{ toNum(bill.cost) }} VNĐ
                    </div>
                    <div class="col-12"><br /></div>
                    <div class="col-12 text-right">
                      <b> Tổng phải trả:</b>
                      {{
                        toNum(
                          bill.cost +
                            bill.people_cost +
                            (bill.water_end - bill.water_begin) *
                              bill.water_cost +
                            (bill.elec_end - bill.elec_begin) * bill.elec_cost
                        )
                      }}
                      VNĐ
                    </div>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-12 row justify-end">
                    <q-btn
                      v-if="bill.status == 0"
                      color="positive"
                      style="margin-right: 5px"
                      label=" Đã trả"
                      class="g-header"
                      outline
                      dense
                      @click="checkBill(bill.id, index)"
                    />
                    <q-btn
                      v-if="bill.status == 0 && index == 0"
                      dense
                      color="primary"
                      class="g-header"
                      style="margin-right: 5px"
                      label="Cập nhật"
                      outline
                      @click="
                        updateBill(bill.id, bill.water_end, bill.elec_end)
                      "
                    />
                    <q-btn
                      dense
                      color="orange"
                      label="Thông báo"
                      outline
                      class="g-header"
                      @click="notiUser(bill.id)"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-page>
        </q-page-container>
        <q-footer class="bg-white">
          <q-card-actions align="center">
            <q-btn
              rounded
              color="black"
              icon="close"
              no-caps
              label=" Đóng"
              v-close-popup
            />
          </q-card-actions>
        </q-footer>
      </q-layout>
    </q-dialog>
    <q-dialog v-model="isRoomBill">
      <q-card class="my-card g-border g-card-width">
        <q-card-section
          class="row items-center text-center text-primary bg-white text-h6"
        >
          <div class="col-12">Chọn phòng để tạo</div>
        </q-card-section>
        <q-card-section class="text-subtitle2">
          *Chọn phòng để tạo hóa đơn.
        </q-card-section>
        <q-card-section>
          <div v-for="(roomType, index) in allBillRoom" :key="index">
            <div class="row full-width justify-center items-center">
              <div class="col-12 g-text-roomType text-primary g-header-up">
                <q-icon name="store" class="g-icon-h2" /> {{ roomType.name }}
              </div>
              <div class="col-10 row items-center q-py-sm">
                <div v-for="(room, index) in roomType.had_rooms" :key="index">
                  <q-checkbox
                    v-model="chooseRoom"
                    :val="room.id"
                    :label="room.name"
                  />
                </div>
              </div>
              <div class="col-12"><br /></div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat no-caps color="negative" label="Thoát" v-close-popup />
          <q-btn
            flat
            no-caps
            color="positive"
            label="Tạo bill "
            @click="createSomeBill"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isCreateAllBill" persistent>
      <q-card class="g-border" style="min-width: 40%">
        <q-card-section class="row items-center">
          <div class="text-primary text-center text-h6">
            Bạn có muốn tạo hóa đơn cho cả trọ
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" Hủy" no-caps color="negative" v-close-popup />
          <q-btn
            flat
            label=" Tạo ngay"
            color="primary"
            no-caps
            v-close-popup
            @click="createAllBill"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-footer class="bg-grey-1 row items-center justify-center">
      <div class="">
        <q-btn
          color="primary"
          icon="add"
          rounded
          no-caps
          label=" Tạo cả trọ"
          @click="isCreateAllBill = !isCreateAllBill"
        />
      </div>
      <div class="">
        <q-btn
          color="primary"
          icon="add"
          rounded
          no-caps
          label=" Tạo theo phòng"
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
import noti from "../boot/noti/noti";
import sp from "../boot/support";
import motelApi from "../boot/callApi/motel";
export default {
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
      isCreateAllBill: false,
    };
  },
  computed: {
    ...mapGetters("RoomStatuses", ["roomStatuses"]),
  },
  methods: {
    numRoom(rooms) {
      return sp.length(rooms);
    },
    roomStatus(room) {
      return room.room_status.name;
    },
    async createAllBill() {
      const allbill = await this.$api.post("createAllBill/" + this.motel_id);
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
        this.getAllBill();
      } else if (allbill.data.statusCode == 0) {
        mes = " phòng " + this.error.name + "chưa xác nhận điện nước";
        col = " red";
      }
      noti.showNoti(mes, col);
    },
    async getAllBill() {
      try {
        // const bills = await this.$api.get("getBillAllRoom");
        const bills = await motelApi.getBillAllRoom(this.motel_id);
        if (bills.statusCode == 1) {
          this.allBillRoom = bills.allBillRoom;
        }
      } catch (error) {}
    },
    openDialog(room) {
      this.thisRoom = room;
      this.thisBills = room.tenant.bills;
      this.isDetailBill = true;
    },
    async createSomeBill() {
      if(this.chooseRoom.length == 0 ) {
        noti.showNoti('Bạn chưa chọn phòng nào' , 'black');
        return;
      }
      const create = await this.$api.post("createSomeBill", {
        rooms: this.chooseRoom,
        motelId: this.motel_id,
      });
      if (create.data.statusCode == 1) {
        noti.showNoti("đã tạo thành công");
        this.getAllBill();
        this.isRoomBill = false;
      } else if (create.data.statusCode == 3) {
        noti.showNoti(
          " lỗi : phòng " +
            create.data.room.name +
            " chưa xác nhận số điện nước"
        );
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
        noti.showNoti("cập nhật thành công");
      }
    },
    async checkBill(billId, index) {
      const update = await this.$api.post("updateBillStatus", {
        bill_id: billId,
      });
      if (update.data.statusCode == 1) {
        noti.showNoti("thay đổi thành công");
        this.getAllBill();
        this.isDetailBill = false;
      }
    },
    async notiUser(billId) {
      const send = await this.$api.get("sendNotiBill/" + billId);
      if (send.data.statusCode == 1) {
        noti.showNoti("đã gửi thành công");
      }
    },
    numBill(bills, status) {
      return sp.numBill(bills, status);
    },
    toNum(num) {
      return sp.toNum(num);
    },
  },
  async created() {
    try {
      const bills = await motelApi.getBillAllRoom(this.motel_id);
      if (bills.statusCode == 1) {
        this.allBillRoom = bills.allBillRoom;
      }
    } catch (error) {}
  },
};
</script>

<style scoped lang="sass">
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
