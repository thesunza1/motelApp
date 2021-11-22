<template>
  <q-card class="my-card">
    <q-card-section
      class="row items-center justify-start"
      style="font-size: 22px"
    >
      <div class="col-5 text-primary">
        <q-icon name="apartment" class="text-h4" />
        <b> Tên trọ: </b>
        <p style="display: inline" class="g-header-up">{{ motel.name }}</p>
      </div>
      <div class="col-5 text-primary">
        <q-icon name="room" class="text-h4" />
        <!-- <b> Địa chỉ: </b> -->
        <p style="display: inline">{{ motel.address }}</p>
      </div>
      <div class="col-12"><br /></div>
      <div class="col-5">
        <q-icon name="person" class="text-h4" />
        <b> Chủ trọ: </b>
        <p style="display: inline" class="g-header-up">{{ motel.user.name }}</p>
      </div>
      <div class="col-4">
        <q-icon name="email" class="text-h4" />
        <!-- <b>Email: </b> -->
        <p style="display: inline">&nbsp; {{ motel.user.email }}</p>
      </div>
      <div class="col-3">
        <q-icon name="phone" class="text-h4" />
        <!-- <b>Điện thoại: </b> -->
        <p style="display: inline">&nbsp;{{ motel.phone_number }}</p>
      </div>
      <div class="col-12"><br /></div>
      <div class="col-12 row items-center">
        <div class="col-5">
          <q-icon name="bolt" class="text-h4" />
          <b> Giá điện :</b>
           {{ toPrice(motel.elec_cost) }} VNĐ
        </div>
        <div class="col-4">
          <q-icon name="water_drop" class="text-h4" />
          <b> Giá nước :</b> {{ toPrice(motel.water_cost) }} VNĐ
        </div>
        <div class="col-3">
          <q-icon name="paid" class="text-h4" />
          <b> Đặt cọc :</b> {{ toPrice(motel.deposit) }} VNĐ
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import sp from "../boot/support";
export default {
  props: {
    motel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toPrice(val) {
      return sp.toNum(val);
    },
  },
};
</script>

<style></style>
