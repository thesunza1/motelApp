<template>
  <div>
    <q-card class="my-card g-border" style="">
      <q-form @submit="send()" class="q-gutter-md">
        <q-card-section class="text-center text-h6 text-primary">
          Gửi thông báo chấp nhận cho vào phòng trọ
          <p class="g-display-inline g-header-up">{{ motel.name }}</p>
        </q-card-section>
        <q-card-section class=" q-pl-lg row item-center">
          <div class="col-6">
            <q-icon name="person" class="text-primary g-icon-h2" /><b>
              Họ tên:
            </b>
            <p class="g-header-up g-display-inline">
              {{ thisNoti.sender_user.name }}
            </p>
            <br />
          </div>
          <div class="col-6">
            <q-icon name="email" class="text-primary g-icon-h2" /><b>
              Email:
            </b>
            {{ thisNoti.sender_user.email }}<br />
          </div>
          <div class="col-6">
            <q-icon name="remove" class="text-primary g-icon-h2" /><b>
              Nghề nghiệp:
            </b>
            <p class="g-first-up g-display-inline">
              {{ thisNoti.sender_user.job }}
            </p>
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col-12 text-center text-red">
            *Chọn phòng để người thuê chấp nhận
          </div>
          <div class="col-12 row items-center justify-center">
            <div
              v-for="(room, index) in rooms"
              :key="index"
              class="col-3 text-center"
            >
              <q-radio
                v-model="Lroom"
                :label="' phòng ' + room.name"
                :val="room.id"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="red" class="g-header" label="Đóng" v-close-popup />
          <q-btn
            label="Gửi"
            class="g-header"
            type="submit"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import notiSp from "../boot/noti/noti";
import notiApi from "../boot/callApi/noti";
export default {
  props: {
    rooms: {
      type: Array,
    },
    motel: {
      type: Object,
    },
    thisNoti: {
      type: Object,
    },
  },
  data() {
    return {
      Lroom: null,
    };
  },
  methods: {
    async send() {
      let userId = this.thisNoti.sender_user.id;
      let notiId = this.thisNoti.id ;
      let roomId = this.Lroom;

      const res = await notiApi.sendInvite(roomId, userId);
      if (res.statusCode == 1) {
        notiSp.showNoti("Đã gửi xong , đang chờ người dùng đồng ý!", "black");
      }
      const reschange = await notiApi.changeIntoStatus(notiId, 1);
      this.$emit('reloadNotis'); 
    },
  },
};
</script>

<style></style>
