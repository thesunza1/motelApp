<template>
  <q-card class="my-card g-border" style="min-width:70%">
    <q-form @submit="send()" class="q-gutter-md">
      <q-card-section v-if="postTypeId == 1" class="text-center text-h6 text-white bg-primary">
        Bạn có muốn vào trọ này?
      </q-card-section>
      <q-card-section v-if="postTypeId == 1" class="row items-center">
        <div class="col-12 text-center text-red">
          *Chọn phòng để xin vào (có thể nhiều phòng)
        </div>
        <div class="col-12"><br /></div>
        <div class="col-12 row items-center justify-center">
          <div
            v-for="(room, index) in rooms"
            :key="index"
            class="col-2 col-md-1 text-center"
          >
            <q-checkbox
              size="3rem"
              color="teal"
              v-model="Lrooms"
              :label="' ' + room.name"
              :val="room.id"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section v-else class="text-center text-primary text-h6" >
        <div class="col-12">Bạn muốn gửi thông báo cho người đăng</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label=" Gửi" class="g-header" type="submit" color="primary" />
        <q-btn color="red" class="g-header" label="Đóng" @click="$emit('closePU')" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
import noti from "../boot/noti/noti";
import notiApi from "../boot/callApi/noti";
export default {

  props: {
    postId: {
      type: Number,
    },
    postTypeId: {
      type: Number,
    },
    rooms: {
      type: Array,
    },
  },
  data() {
    return {
      Lrooms: [],
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    async send() {
      if (!this.user) {
        noti.showNoti(" Bạn chưa đăng nhập ", "negative");
        return;
      }
      if (this.postTypeId == 1) {
        const sendRes = await notiApi.sendIntoNoti(this.postId, this.Lrooms);
        if (sendRes.statusCode == 1) {
          noti.showNoti(" Thành công chờ liên lạc", "positive");
        } else {
          noti.showNoti(" Lỗi: không xác định", "negative");
        }
      } else {
        const sendRes = await notiApi.sendIntoNotiRoom(this.postId);
        if (sendRes.statusCode == 1) {
          noti.showNoti("Thành công chờ liên lạc", "positive");
        } else {
          noti.showNoti("Lỗi: không xác định", "negative");
        }
      }
    },
  },
};
</script>

<style>
</style>
