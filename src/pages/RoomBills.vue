<template>
  <q-page padding class="row items-center justify-center">
    <div v-if="bills" class="col-12 col-md-10">
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
              từ: {{ toDate(bill.date_begin) }} đến: {{ toDate(bill.date_end) }}
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-6">từ: {{ toDate(bill.date_begin) }}</div>
            <div class="col-6">đến: {{ toDate(bill.date_end) }}</div>
            <div class="col-12"><br /></div>
            <div class="col-md-4 col-12 row justify-center items-center">
              <div class="text-left">
                điện: {{ bill.elec_begin }} - {{ bill.elec_end }} kwh
              </div>
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
            <div class="col-12"><br /></div>
            <div class="col-md-4 col-12 row justify-center items-center">
              <div class="text-left">
                nước: {{ bill.water_begin }} - {{ bill.water_end }} kwh
              </div>
            </div>
            <div class="col-12 col-md-8 row items-center justify-center">
              <div>
                tổng: {{ bill.water_end - bill.water_begin }} *
                {{ bill.water_cost }}vnd
              </div>
              <div class="text-subtitle2">
                = {{ (bill.water_end - bill.water_begin) * bill.water_cost }}
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row justify-end items-center">
              <div class="gt-sm col-6"></div>
              <div class="col-md-6 col-10 text-subtitle2">
                phí người: {{ bill.people_cost }}nvd
              </div>
              <div class="gt-sm col-6"></div>
              <div class="col-md-6 col-10 text-subtitle2">
                tiền trọ: {{ bill.cost }}nvd
              </div>
              <div class="col-12"><br /></div>
              <div class="gt-sm col-6"></div>
            </div>
          </q-card-section>
          <q-card-section class="row items-center justify-end">
            <div class="col-md-4 col-8 bg-accent text-white text-center text-subtitle2" style="padding:5px 0px;border-radius:3px">
              tổng phải trả:
              {{
                bill.cost +
                bill.people_cost +
                (bill.water_end - bill.water_begin) * bill.water_cost +
                (bill.elec_end - bill.elec_begin) * bill.elec_cost
              }}vnd
            </div>
          </q-card-section>
          <q-card-actions v-if="bill.status == 0" align="right">
            <q-btn color="negetive" flat label=" báo lỗi " @click="openIsError(bill)" />
            <q-btn color="positive" flat label=" báo đã trả" @click="openIsNoti(bill)"/>
          </q-card-actions>
        </q-card>
        <div class="col-12"><br></div>
      </div>

    </div>
    <q-dialog v-model="isError" >
      <q-card style="min-width:60%">
        <q-card-section class="row items-center text-white bg-red">
          <span > gửi báo lỗi </span>
        </q-card-section>
        <q-card-section class="full-width ">
          <div class="text-subtitle">nhập nội dung thông báo </div>
          <q-input style="width:70%" v-model="content" type="text" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" hủy" color="negetive" v-close-popup />
          <q-btn flat label=" gửi" @click="sendError" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isNoti" >
      <q-card style="min-width:60%">
        <q-card-section class="row items-center text-white bg-red">
          <span > thông báo đã trả  </span>
        </q-card-section>
        <q-card-section class="full-width ">
          <div class="text-subtitle">nhập nội dung thông báo </div>
          <q-input style="width:70%" v-model="content" type="text" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" hủy" color="negetive" v-close-popup />
          <q-btn flat label=" gửi" @click="sendNoti" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import {useQuasar} from "quasar"
export default {
  setup() {
    function toDate(date) {
      return date.slice(0, 10);
    }
    const $q = useQuasar() ;
    function showNoti(mess , col ) {
      $q.notify({
        position:"top" ,
        timeout:2000,
        message:mess,
        color:col,

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
      content: '' ,
      thisBill : null,
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
      const send = await this.$api.post('sendBillError', {
        content: this.content,
        bill: this.thisBill,
        room_id: this.tenant.room_id,
      }) ;
      if(send.data?.statusCode ==1) {
        this.showNoti('đã gửi thành công' , 'positive');
      } else {
        this.showNoti('gửi thất bại' , 'red');
      }
    },
    async sendNoti() {
      const send = await this.$api.post('sendBillYes', {
        content: this.content,
        bill: this.thisBill,
        room_id: this.tenant.room_id,
      }) ;
      if(send.data?.statusCode ==1) {
        this.showNoti('đã gửi thành công' , 'positive');
      } else {
        this.showNoti('gửi thất bại' , 'red');
      }

    },
    openIsError(bill) {
     this.chanceBill(bill) ;
     this.isError = true ;
    },
    openIsNoti(bill) {
     this.chanceBill(bill) ;
     this.isNoti = true ;
    },
    chanceBill(bill) {
      this.thisBill = bill ;
    }
  }
};
</script>

<style>
</style>
