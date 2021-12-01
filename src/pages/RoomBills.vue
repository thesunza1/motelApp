<template>
  <q-page padding class="row items-center justify-center content-start">
    <div v-if="bills" class="col-12 row items-center justify-center">
      <div class="col-md-10 col-12">
        <q-card class="g-border my-card">
          <q-card-section>
            <div class="text-h6 text-center text-primary">Danh sách hóa đơn phòng</div>
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle text-red">
              Chưa thanh toán: {{ numBill(0) }}
            </div>
            <div class="text-subtitle text-positive">
              Đã thanh toán: {{ numBill(1) }}
            </div>
          </q-card-section>
        </q-card>
        <br />
      </div>
      <q-card class="my-card col-10 g-border gt-sm">
        <q-card-section>
          <div class="container">
            <ul class="responsive-table">
              <li class="table-header text-white">
                <div class="col cola-1 text-right">STT</div>
                <div class="col cola-3 text-right">Từ ngày</div>
                <div class="col cola-3 text-right">Đến ngày</div>
                <div class="col cola-4 text-right">Số điện (Kwh)</div>
                <div class="col cola-4 text-right">Tổng điện (VNĐ)</div>
                <div class="col cola-4 text-right">
                  Số nước (M<sup>3</sup>)
                </div>
                <div class="col cola-4 text-right">Tổng nước (VNĐ)</div>
                <div class="col cola-4 text-right">Phụ thu (VNĐ)</div>
                <div class="col cola-4 text-right">Tiền trọ (VNĐ)</div>
                <div class="col cola-4 text-right">Tổng tiền (VNĐ)</div>
              </li>
              <li
                class="table-row shadow-up-2 text-bold"
                v-for="(bill, index) in bills"
                :key="index"
                :class="bill.status == 0 ? 'bg-red-1 text-red ' : ''"
                @click="openBill(bill)"
              >
                <div class="col cola-1 text-right" data-label="STT">
                  {{ ++index }}
                </div>
                <div class="col cola-3 text-right q-pr-sm" data-label="STT">
                  {{ toDate(bill.date_begin) }}
                </div>
                <div class="col cola-3 text-right q-pr-sm" data-label="STT">
                  {{ toDate(bill.date_end) }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{ bill.elec_begin }} - {{ bill.elec_end }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{ bill.elec_end - bill.elec_begin }} *
                  {{ bill.elec_cost }}
                  =
                  {{
                    toNum((bill.elec_end - bill.elec_begin) * bill.elec_cost)
                  }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{ bill.water_begin }} - {{ bill.water_end }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{ bill.water_end - bill.water_begin }} *
                  {{ bill.water_cost }}
                  =
                  {{
                    toNum((bill.water_end - bill.water_begin) * bill.water_cost)
                  }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{ toNum(bill.people_cost) }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{ toNum(bill.cost) }}
                </div>
                <div class="col cola-4 text-right q-pr-sm" data-label="STT">
                  {{
                    toNum(
                      bill.cost +
                        bill.people_cost +
                        (bill.water_end - bill.water_begin) * bill.water_cost +
                        (bill.elec_end - bill.elec_begin) * bill.elec_cost
                    )
                  }}
                </div>
              </li>
            </ul>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="bills"  class="lt-md col-12 col-md-10 row items-center">
      <div
        v-for="(bill, index) in bills"
        :key="index"
        class="col-12 items-center row"
      >
        <q-card class="my-card col-12">
          <q-card-section
            class="text-white"
            :class="bill.status == 1 ? 'bg-positive' : 'bg-negative'"
          >
            <div class="text-subtitle2">
              Từ: {{ toDate(bill.date_begin) }} Đến: {{ toDate(bill.date_end) }}
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-12"><br /></div>
            <div class="col-md-4 col-12 row justify-center items-center">
              <div class="text-left">
                <b>Số điện:</b> {{ bill.elec_begin }} - {{ bill.elec_end }} kwh
              </div>
            </div>
            <div class="col-md-8 col-12 row items-center justify-center">
              <div>
                <b>Tổng:</b> {{ bill.elec_end - bill.elec_begin }} *
                {{ bill.elec_cost }}
              </div>
              <div>
                =
                {{ toNum((bill.elec_end - bill.elec_begin) * bill.elec_cost) }}
                VNĐ
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-md-4 col-12 row justify-center items-center">
              <div class="text-left">
                <b>Số nước:</b> {{ bill.water_begin }} -
                {{ bill.water_end }} kwh
              </div>
            </div>
            <div class="col-12 col-md-8 row items-center justify-center">
              <div>
                <b>Tổng:</b> {{ bill.water_end - bill.water_begin }} *
                {{ toNum(bill.water_cost) }}
              </div>
              <div class="text-subtitle2">
                =
                {{
                  toNum((bill.water_end - bill.water_begin) * bill.water_cost)
                }}
                VNĐ
              </div>
            </div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row justify-end items-center">
              <div class="text-subtitle2">
                Phụ thu: {{ toNum(bill.people_cost) }} VNĐ
              </div>
              <div class="col-12"></div>
              <div class="text-subtitle2">
                Tiền trọ: {{ toNum(bill.cost) }} VNĐ
              </div>
              <div class="col-12"><br /></div>
              <div class="gt-sm col-6"></div>
            </div>
          </q-card-section>
          <q-card-section class="row items-center justify-end">
            <div
              class="
                col-md-4 col-8
                bg-accent
                text-white text-center text-subtitle2
              "
              style="padding: 5px 0px; border-radius: 3px"
            >
              Tổng phải trả:
              {{
                toNum(
                  bill.cost +
                    bill.people_cost +
                    (bill.water_end - bill.water_begin) * bill.water_cost +
                    (bill.elec_end - bill.elec_begin) * bill.elec_cost
                )
              }}
              VNĐ
            </div>
          </q-card-section>
          <q-card-actions v-if="bill.status == 0" align="right">
            <q-btn
              color="negetive"
              no-caps
              flat
              label=" Báo lỗi "
              @click="openIsError(bill)"
            />
            <q-btn
              color="positive"
              no-caps
              flat
              label=" Báo đã trả"
              @click="openIsNoti(bill)"
            />
          </q-card-actions>
          <q-card-actions v-else align="right">
            <div class="q-pb-md">Bạn đã thanh toán.</div>
          </q-card-actions>
        </q-card>
        <div class="col-12"><br /></div>
      </div>
    </div>
    <q-dialog v-model="isError">
      <q-card style="min-width: 60%">
        <q-card-section class="row items-center text-white bg-red">
          <span> Gửi báo lỗi </span>
        </q-card-section>
        <q-card-section class="full-width">
          <div class="text-subtitle">Nhập nội dung thông báo</div>
          <q-input style="width: 100%" v-model="content" type="text" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn no-caps flat label=" Hủy" color="negetive" v-close-popup />
          <q-btn
            no-caps
            flat
            label=" Gửi"
            @click="sendError"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isNoti">
      <q-card style="min-width: 60%">
        <q-card-section class="row items-center text-white bg-positive">
          <span> Thông báo đã trả </span>
        </q-card-section>
        <q-card-section class="full-width">
          <div class="text-subtitle">Nhập nội dung thông báo</div>
          <q-input style="width: 100%" v-model="content" type="text" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn no-caps flat label=" Hủy" color="negetive" v-close-popup />
          <q-btn
            no-caps
            flat
            label=" Gửi"
            @click="sendNoti"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isBill">
      <q-card class="g-border my-card" v-if="thisBill" style="min-width: 70%">
        <q-card-section
          class="text-white"
          :class="thisBill.status == 1 ? 'bg-positive' : 'bg-negative'"
        >
          <div class="text-subtitle2">
            Từ: {{ toDate(thisBill.date_begin) }} Đến:
            {{ toDate(thisBill.date_end) }}
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col-12"><br /></div>
          <div class="col-md-4 col-12 row justify-center items-center">
            <div class="text-left">
              <b>Số điện:</b> {{ thisBill.elec_begin }} -
              {{ thisBill.elec_end }} kwh
            </div>
          </div>
          <div class="col-md-8 col-12 row items-center justify-center">
            <div>
              <b>Tổng:</b> {{ thisBill.elec_end - thisBill.elec_begin }} *
              {{ thisBill.elec_cost }}
            </div>
            <div>
              =
              {{
                toNum(
                  (thisBill.elec_end - thisBill.elec_begin) * thisBill.elec_cost
                )
              }}
              VNĐ
            </div>
          </div>
          <div class="col-12"><br /></div>
          <div class="col-md-4 col-12 row justify-center items-center">
            <div class="text-left">
              <b>Số nước:</b> {{ thisBill.water_begin }} -
              {{ thisBill.water_end }} kwh
            </div>
          </div>
          <div class="col-12 col-md-8 row items-center justify-center">
            <div>
              <b>Tổng:</b> {{ thisBill.water_end - thisBill.water_begin }} *
              {{ toNum(thisBill.water_cost) }}
            </div>
            <div class="text-subtitle2">
              =
              {{
                toNum(
                  (thisBill.water_end - thisBill.water_begin) *
                    thisBill.water_cost
                )
              }}
              VNĐ
            </div>
          </div>
          <div class="col-12">
            <hr />
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 row justify-end items-center">
            <div class="text-subtitle2">
              Phụ thu: {{ toNum(thisBill.people_cost) }} VNĐ
            </div>
            <div class="col-12"></div>
            <div class="text-subtitle2">
              Tiền trọ: {{ toNum(thisBill.cost) }} VNĐ
            </div>
            <div class="col-12"><br /></div>
            <div class="gt-sm col-6"></div>
          </div>
        </q-card-section>
        <q-card-section class="row items-center justify-end">
          <div
            class="
              col-md-4 col-8
              bg-accent
              text-white text-center text-subtitle2
            "
            style="padding: 5px 0px; border-radius: 3px"
          >
            Tổng phải trả:
            {{
              toNum(
                thisBill.cost +
                  thisBill.people_cost +
                  (thisBill.water_end - thisBill.water_begin) *
                    thisBill.water_cost +
                  (thisBill.elec_end - thisBill.elec_begin) * thisBill.elec_cost
              )
            }}
            VNĐ
          </div>
        </q-card-section>
        <q-card-actions v-if="thisBill.status == 0" align="right">
          <q-btn color="black" no-caps flat label=" Đóng" v-close-popup />
          <q-btn
            color="negetive"
            no-caps
            flat
            label=" Báo lỗi "
            @click="openIsError(thisBill)"
          />
          <q-btn
            color="positive"
            no-caps
            flat
            label=" Báo đã trả"
            @click="openIsNoti(thisBill)"
          />
        </q-card-actions>
        <q-card-actions v-else align="right">
          <q-btn color="black" no-caps flat label=" Đóng" v-close-popup />
          <q-btn color="black" flat no-caps label=" Bạn đã thanh toán" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
import sp from "../boot/support";
export default {
  setup() {
    function toDate(date) {
      return date.slice(0, 10);
    }
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        position: "top",
        timeout: 2000,
        message: mess,
        color: col,
      });
    }
    return {
      toDate,
      showNoti,
    };
  },
  data() {
    return {
      bills: null,
      isError: false,
      isNoti: false,
      content: "",
      thisBill: null,
      isBill: false,
    };
  },
  computed: {
    // ...mapGetters("RoomTypeUser", ["roomTypeUser"]),
    ...mapGetters("Tenant", ["tenant"]),
  },
  async created() {
    const bill = await this.$api.get("getBillOwnRoom");
    if (bill.data?.statusCode == 1) {
      this.bills = bill.data.bills;
    }
  },
  methods: {
    async sendError() {
      const send = await this.$api.post("sendBillError", {
        content: this.content,
        bill: this.thisBill,
        room_id: this.tenant.room_id,
      });
      if (send.data?.statusCode == 1) {
        this.showNoti(" Đã gửi thành công", "positive");
      } else {
        this.showNoti("Gửi thất bại", "red");
      }
    },
    async sendNoti() {
      const send = await this.$api.post("sendBillYes", {
        content: this.content,
        bill: this.thisBill,
        room_id: this.tenant.room_id,
      });
      if (send.data?.statusCode == 1) {
        this.showNoti("Đã gửi thành công", "positive");
      } else {
        this.showNoti("Gửi thất bại", "red");
      }
    },
    openBill(bill) {
      this.chanceBill(bill);
      this.isBill = true;
    },
    openIsError(bill) {
      this.chanceBill(bill);
      this.isError = true;
    },
    openIsNoti(bill) {
      this.chanceBill(bill);
      this.isNoti = true;
    },
    chanceBill(bill) {
      this.thisBill = bill;
    },
    numBill(status) {
      return sp.numBill(this.bills, status);
    },
    toNum(num) {
      return sp.toNum(num);
    },
  },
};
</script>

<style lang="sass" scoped>
body
  font-family: 'lato', sans-serif
.container
  max-width: 100%
h2
  font-size: 26px
  margin: 20px 0
  text-align: center
  small
    font-size: 0.5em
.responsive-table
  li
    border-radius: 10px
    padding: 25px 30px
    display: flex
    justify-content: space-between
    margin-bottom: 25px
    align-items: flex-end

  .table-header
    background-color: black
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 0.03em
  .table-row
    background-color: #ffffff
    // box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1)
    // box-shadow: 0px 0px 9px 0px $grey-6
  .cola-1
    flex-basis: 10%
  .cola-2
    flex-basis: 40%
  .cola-3
    flex-basis: 25%
  .cola-4
    flex-basis: 25%
  @media all and (max-width: 767px)
    .table-header
      display: none
    li
      display: block
    .col
      flex-basis: 100%
    .col
      display: flex
      padding: 10px 0
      &:before
        color: #6C7A89
        padding-right: 10px
        content: attr(data-label)
        flex-basis: 50%
        text-align: right
ul
  padding-inline-start:5px
</style>
