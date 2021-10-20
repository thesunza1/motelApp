<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="text-white text-h6 bg-negative text-center">
        Báo cáo quản trị viên
      </q-card-section>
      <q-card-section >
        <div>Nhập nội dung bạn muốn báo cáo</div>
        <q-input v-model="content" type="text" label=" Nội dung " />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Gửi" color="red" class="g-header" @click="sendReport()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import noti from "../boot/callApi/noti";
import { mapGetters } from "vuex";
export default {

  props: {
    type: {
      type: Number,
    },
    //type 1 ,2 ,3  : postid - motelid - roomTypeid ;
    postId: {
      type: Number,
    },
    motelId: {
      type: Number,
    },
    roomTypeId: {
      type: Number,
    },

  },
  data() {
    return {
      content: null,
    };
  },
  methods: {
    async sendReport() {
      if (this.user?.id) {
        const res = await noti.sendReport(
          this.type,
          this.postId,
          this.motelId,
          this.roomTypeId,
          this.user.id ,
          this.content,
        );
        if (res.statusCode == 1) {
          noti.showNoti("thành công:", "positive");
        }
      } else {
        noti.showNoti(" bạn cần phải đăng nhập", "negative");
      }
    },
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
};
</script>

<style>
</style>
