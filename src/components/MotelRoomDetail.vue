<template>
  <div class="full-width">
    <q-card v-if="roomTypeUser" class="my-card row g-border">
      <q-card-section class="text-primary col-12">
        <div class="text-h6 text-center full-width">Chi tiết trọ</div>
      </q-card-section>
      <q-card-section class="row items-center col-md-12 col-12">
        <div class="col-12 col-md-4">
          <q-icon name="apartment" class="g-icon-h2" />
          <b>Tên trọ</b>:
          <div class="g-header-up" style="display: inline">
            {{ roomTypeUser.motel.name }}
          </div>
        </div>
        <div class="col-12 col-md-8">
          <q-icon name="room" class="g-icon-h2" />
          <b> Địa chỉ</b>: {{ roomTypeUser.motel.address }}
        </div>
      </q-card-section>

      <br />

      <q-card-section class="row items-center col-md-12 col-12">
        <div class="col-12 col-md-4">
          <q-icon name="watch_later" class="g-icon-h2" />
          <b> Giờ đóng-mở</b>: {{ roomTypeUser.motel.open }}h-{{
            roomTypeUser.motel.closed
          }}h
        </div>
        <div v-if="roomTypeUser.motel.camera == 1" class="col-12 col-md-2">
          <q-icon name="camera" class="g-icon-h2" />
          <b> Camera:</b> Có
        </div>
        <div v-else class="col-12 col-md-4">
          <q-icon name="watch_later" class="g-icon-h2" />
          <b> Camera:</b> Không</div>
      </q-card-section>
      <br />
      <q-card-section class="row items-center col-md-12 col-12">
        <div class="col-12 col-md-4">
          <q-icon name="person" class="g-icon-h2" />
          <b> Tên chủ:</b>
          <div class="g-header-up" style="display: inline">
            {{ roomTypeUser.motel.user.name }}
          </div>
        </div>
        <div class="col-12 col-md-4">
          <q-icon name="email" class="g-icon-h2" />
          <b> Email:</b> {{ roomTypeUser.motel.user.email }}
        </div>
        <div class="col-12 col-md-4">
          <q-icon name="phone" class="g-icon-h2" />
          <b> Sdt:</b> {{ roomTypeUser.motel.phone_number }}
        </div>
      </q-card-section>

      <br />
      <q-card-section class="row items-center col-md-12 col-12">
        <div class="col-6 col-md-4">
          <q-icon name="bolt" class="g-icon-h2" />
          <b> Điện</b>: {{ toNum(roomTypeUser.motel.elec_cost) }} kwh
        </div>
        <div class="col-12 col-md-4">
          <q-icon name="water_drop" class="g-icon-h2" />
          <b> Nước</b>: {{ toNum(roomTypeUser.motel.water_cost) }} kwh
        </div>
        <div class="col-12 col-md-4">
          <q-icon name="paid" class="g-icon-h2" />
          <b> Phụ thu</b>: {{ toNum(roomTypeUser.motel.people_cost) }} VNĐ
        </div>
      </q-card-section>
    </q-card>
    <br />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sp from "../boot/support";
export default {
  setup() {},
  computed: {
    ...mapGetters("RoomTypeUser", ["roomTypeUser"]),
  },
  methods: {
    toNum(num) {
      return sp.toNum(num);
    },
  },
};
</script>

<style></style>
